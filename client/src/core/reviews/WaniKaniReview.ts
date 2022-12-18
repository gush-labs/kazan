import { Review, RandomPicker, ReviewCard } from "@/core/Review";
import { Dictionary, Word } from "@/core/Dictionary";
import type { Creator, CreatorParams, CreatorStatus } from "./Creator";
import { Authentication } from "@/core/Authentication";

type WaniKaniQuery = {
  level: number;
  reading: boolean;
  meaning: boolean;
  translation: boolean;
};

class WaniKaniReview implements Creator {
  id = "wanikani";
  name = "WaniKani";
  enabledParameters = {};

  static parseWaniKaniParams(
    creatorParams: CreatorParams,
    rawParams: string[]
  ): WaniKaniQuery | undefined {
    try {
      if (creatorParams.level == undefined) {
        return undefined;
      }

      const params: WaniKaniQuery = {
        level: creatorParams.level!,
        reading: creatorParams.reading ?? false,
        meaning: creatorParams.meaning ?? false,
        translation: creatorParams.translation ?? false,
      };
      return params;
    } catch (e) {
      console.error("Failed to parse dictionary query", e);
      return undefined;
    }
  }

  create(
    creatorParams: CreatorParams,
    rawParams: string[]
  ): Review | undefined {
    // If user is not logged in, we can't get WaniKani vocabulary
    const user = Authentication.user.value;
    if (user == undefined) {
      return undefined;
    }

    const params = WaniKaniReview.parseWaniKaniParams(creatorParams, rawParams);
    if (params == undefined) {
      return undefined;
    }
    // If user doesn't have WaniKani subscription, we can't show him
    // vocabulary from levels higher than 3
    params.level = (user.paid ? params.level : Math.min(params.level, 2)) + 1;

    const result: ReviewCard[] = [];
    const translation: string[] = [];
    const vocabulary = Dictionary.vocabulary;
    const wanikaniLevels = Dictionary.wanikaniLevels;
    const meanings = Dictionary.meanings;

    const wordIds = wanikaniLevels.get(params.level);
    if (!wordIds) {
      return undefined;
    }

    wordIds.forEach((wordId) => {
      const word = vocabulary.get(wordId);
      if (!word) {
        return;
      }

      if (params.reading) {
        result.push(
          new ReviewCard({
            type: "reading",
            question: word.japanese,
            answers: word.readings.concat(word.japanese),
            shownAnswers: word.readings,
            input: "hiragana",
          })
        );
      }

      if (params.meaning) {
        result.push(
          new ReviewCard({
            type: "meaning",
            question: word.japanese,
            answers: word.meanings,
          })
        );
      }

      if (params.translation) {
        translation.push(Word.primaryMeaning(word));
      }
    });

    translation.forEach((meaning) => {
      const wordIds = meanings.get(meaning);
      if (!wordIds) {
        return;
      }
      const words: Word[] = [];

      wordIds.forEach((wordId) => {
        const word = vocabulary.get(wordId);
        if (word) {
          words.push(word);
        }
      });

      const japaneseWords = words.map((w) => w.japanese);
      const allReadings = words
        .map((w) => w.readings)
        .reduce((l, r) => l.concat(r))
        .concat(japaneseWords);

      result.push(
        new ReviewCard({
          type: "translation",
          question: meaning,
          answers: allReadings.concat(japaneseWords),
          shownAnswers: japaneseWords,
          input: "hiragana",
        })
      );
    });

    return new Review(new RandomPicker(result));
  }

  levels(): string[] {
    const user = Authentication.user.value;
    if (user) {
      const maxLevel = user.paid ? 60 : 3;
      const result: string[] = [];
      for (let i = 1; i <= maxLevel; i++) {
        result.push("Vocabulary Level " + i);
      }
      return result;
    }
    return [];
  }

  status(): CreatorStatus {
    const user = Authentication.user;
    if (user.value) {
      return { available: true, reason: "" };
    }
    return {
      available: false,
      reason:
        "Please sign in using your WaniKani account in order to get access to this review",
    };
  }
}

export default WaniKaniReview;
