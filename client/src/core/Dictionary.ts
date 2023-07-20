/**
 * Module contains full description of global app
 * vocabulary which is used to create different types of
 * review and in particular, reviews for WaniKani.
 */
import { watchRemove } from "@/core/Utilities";
import { Authentication } from "@/core/Authentication";
import { Application } from "@/core/Application";
import { WaniKaniClient } from "@/core/WaniKaniClient";
import { useStorage } from "@vueuse/core";
import type { Ref } from "vue";

export class Word {
  id = 0;
  japanese = "";
  meanings: string[] = [];
  readings: string[] = [];
  speechParts: string[] = [];
  level = 0;

  static primaryMeaning(word: Word): string {
    return word.meanings[0];
  }
  static primaryReading(word: Word): string {
    return word.readings[0];
  }
}

enum DictionaryState {
  READY,
  EMPTY,
}

class DictionaryData {
  static requiredVersion = 0;
  version = 0;
  words: Word[] = [];
  empty = true;
}

type PageRequest = Promise<Word[]>;

export class Dictionary {
  static state = DictionaryState.EMPTY;
  static vocabulary = new Map<number, Word>();
  static wanikaniLevels = new Map<number, number[]>();
  static meanings = new Map<string, number[]>();

  private static get data(): Ref<DictionaryData> {
    return useStorage<DictionaryData>("dictionary", new DictionaryData);
  }

  // Load dictionary from WaniKani
  static load() {
    if (this.state == DictionaryState.READY) {
      return;
    }

    const dataIsMissing = this.data.value.empty;
    const dataIsOutdated =
      this.data.value?.version !== DictionaryData.requiredVersion;

    if (dataIsMissing || dataIsOutdated) {
      this.requestData().then((data) => this.loadFromData(data));
    } else {
      this.loadFromData(this.data.value!);
    }

    watchRemove(this.data, () => (this.state = DictionaryState.EMPTY));
  }

  private static loadFromData(data: DictionaryData) {
    // Save vocabulary
    this.data.value = data;
    this.data.value.empty = false;

    // Load everything in memory
    data.words.forEach((word) => {
      // Add word to main vocabulary
      this.vocabulary.set(word.id, word as Word);

      // Store list of words for any WaniKani level
      const level = word.level;
      if (!this.wanikaniLevels.get(level)) {
        this.wanikaniLevels.set(level, []);
      }
      this.wanikaniLevels.get(level)!.push(word.id);

      // Store list of words for every possible meaning
      word.meanings.forEach((meaning) => {
        if (!this.meanings.get(meaning)) {
          this.meanings.set(meaning, []);
        }
        this.meanings.get(meaning)!.push(word.id);
      });
    });

    this.state = DictionaryState.READY;
    console.log("Dictionary: loaded " + this.vocabulary.size + " words");
  }

  private static requestData(): Promise<DictionaryData> {
    const request = new Promise<DictionaryData>((resolver) => {
      const pageRequests: PageRequest[] = [];

      // Request the next page
      const requestNextPage = (request?: PageRequest) => {
        if (request) {
          pageRequests.push(request);
          return;
        }

        // If there are no more pages, we need to take all pages
        // that we have and combine them into one collection of words
        Promise.all(pageRequests)
          .then((responses) => {
            const data = new DictionaryData();
            data.words = responses.reduce((l, r) => l.concat(r));
            resolver(data);
          })
          .catch(() => {
            Application.status.errorSet(
              "wksync-error",
              "Failed to connect to WaniKani"
            );
          });
      };

      const firstPageRequest = this.requestPage("0", (request) =>
        requestNextPage(request)
      );
      pageRequests.push(firstPageRequest);
    });

    Application.status.processSubmit("wksync", "Loading vocabulary", request);
    return request;
  }

  private static requestPage(
    pageId: string,
    nextPageHandler: (p: PageRequest | undefined) => void
  ): PageRequest {
    const wanikaniSubscription = Authentication.user.value?.paid === true;
    const query = {
      types: "vocabulary",
      levels: wanikaniSubscription ? undefined : "1,2,3",
      page_after_id: pageId,
    };

    return WaniKaniClient.request("subjects", query).then((response) => {
      const nextPageUrl: string = response.pages.next_url;
      if (nextPageUrl) {
        const nextPageId = nextPageUrl
          .split("?")[1]
          .split("&")[0]
          .split("=")[1];
        nextPageHandler(this.requestPage(nextPageId, nextPageHandler));
      } else {
        nextPageHandler(undefined);
      }

      const words = (response.data as any[]).map((word) =>
        this.parseWordData(word)
      );
      return words;
    });
  }

  private static parseWordData(wordData: any): Word {
    const id = wordData.id;
    const data = wordData.data;
    const word = new Word();
    word.id = id;
    word.japanese = data.characters;
    word.level = data.level;

    let primary = "";
    for (const reading of data.readings) {
      if (!reading.primary) {
        word.readings.push(reading.reading);
      } else {
        primary = reading.reading;
      }
    }
    word.readings = [primary].concat(word.readings);

    for (const part of data.parts_of_speech) {
      word.speechParts.push(part);
    }

    primary = "";
    for (const meaning of data.meanings) {
      if (!meaning.primary) {
        word.meanings.push(meaning.meaning);
      } else {
        primary = meaning.meaning;
      }
    }
    word.meanings = [primary].concat(word.meanings);
    return word;
  }
}

Authentication.onLogin(() => Dictionary.load());
