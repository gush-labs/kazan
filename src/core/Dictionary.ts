import { watchRemove, watchUpdate } from "@/core/Utils";
import { User } from "@/core/Authentication";
import type { Review } from "@/core/Review";
import AppStatus from "@/core/AppStatus";
import { Storage } from "@/core/Storage";
import WaniKani from "@/core/WaniKani";
import ReviewCreator from "@/core/ReviewCreator";

// TODO: Rename to Word
export class Word2 {
  id = 0;
  japanese = "";
  meanings: string[] = [];
  readings: string[] = [];
  speechParts: string[] = [];
  level = 0;

  static primaryMeaning(word: Word2): string {
    return word.meanings[0];
  }
  static primaryReading(word: Word2): string {
    return word.readings[0];
  }
}

enum DictionaryState {
  READY,
  EMPTY,
}

class Vocabulary {
  version = 0;
  words: Word2[] = [];

  static requiredVersion = 0;
  static get ref() {
    return Storage.get<Vocabulary>("vocabulary");
  }
}

type PageRequest = Promise<Word2[]>;

export class Dictionary {
  static state = DictionaryState.EMPTY;

  static vocabulary = new Map<number, Word2>();
  static wanikaniLevels = new Map<number, number[]>();
  static meanings = new Map<string, number[]>();

  static load(user: User) {
    // Do not update vocabulary which is already filled with data
    if (this.state == DictionaryState.READY) {
      return;
    }

    const vocabRef = Vocabulary.ref;
    if (
      !vocabRef.value ||
      vocabRef.value.version != Vocabulary.requiredVersion
    ) {
      // If there is no vocabulary or it's outdated
      // we should request it
      this.requestVocabulary(user).then((vocabulary) => {
        vocabRef.value = vocabulary;
        this.loadFromVocabularyData(vocabulary);
      });
    } else {
      this.loadFromVocabularyData(vocabRef.value);
    }

    watchRemove(vocabRef, () => {
      this.state = DictionaryState.EMPTY;
    });
  }

  private static loadFromVocabularyData(vocabularyData: Vocabulary) {
    vocabularyData.words.forEach((word) => {
      // Add word to main vocabulary
      this.vocabulary.set(word.id, word as Word2);

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

  private static requestVocabulary(user: User): Promise<Vocabulary> {
    AppStatus.processStart("wksync", "Syncing vocabulary with WaniKani...");

    // WaniKani unable to return all database
    // so we need to request vocabulary page by page
    return new Promise((resolver) => {
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
            let words: Word2[] = [];
            responses.forEach((response) => (words = words.concat(response)));

            const vocabulary = new Vocabulary();
            vocabulary.words = words;
            AppStatus.processComplete("wksync");
            resolver(vocabulary);
          })
          .catch(() => {
            AppStatus.processComplete("wksync");
            AppStatus.errorSet(
              "wksync-error",
              "Failed to connect to WaniKani. Try to refresh the page."
            );
          });
      };

      // Request the first page
      pageRequests.push(
        this.requestPage(user, "0", (request) => requestNextPage(request))
      );
    });
  }

  private static requestPage(
    user: User,
    pageId: string,
    nextPageHandler: (p: PageRequest | undefined) => void
  ): PageRequest {
    const query = {
      types: "vocabulary",
      levels: user.paid ? undefined : "1,2,3",
      page_after_id: pageId,
    };

    return WaniKani.request("subjects", query).then((response) => {
      const nextUrl: string = response.pages.next_url;
      if (nextUrl) {
        const pageId = nextUrl.split("?")[1].split("&")[0].split("=")[1];
        nextPageHandler(this.requestPage(user, pageId, nextPageHandler));
      } else {
        nextPageHandler(undefined);
      }

      const vocabulary: Word2[] = [];
      (response.data as any[])
        .map((word) => this.parseWordData(word))
        .forEach((word) => vocabulary.push(word));
      return vocabulary;
    });
  }

  private static parseWordData(wordData: any): Word2 {
    const id = wordData.id;
    const data = wordData.data;
    const word = new Word2();
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

// Verify storage on startup
Storage.verify();

// If user will logged in, we should load a dictionary
watchUpdate(User.ref, (user) => Dictionary.load(user));
