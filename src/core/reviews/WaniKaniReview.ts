import type ReviewCreator from "./ReviewCreator";
import { Dictionary, Word2 } from "@/core/Dictionary";
import ReviewCard from "@/core/ReviewCard";
import { Review, RandomPicker } from "@/core/Review";

type WaniKaniQuery = {
  level: number;
  reading: boolean;
  meaning: boolean;
  translation: boolean;
};

class WaniKaniReview implements ReviewCreator {

  id: string = "wanikani";
  name: string = "WaniKani";

  static parseWaniKaniQuery(paramsText: string[]): WaniKaniQuery | undefined {
    try {
      const params: WaniKaniQuery = {
        level: parseInt(paramsText[0]),
        reading: paramsText[1] == "true",
        meaning: paramsText[2] == "true",
        translation: paramsText[3] == "true",
      };
      return params;
    } catch (e) {
      console.error("Failed to parse dictionary query", e);
      return undefined;
    }
  }

  create(paramsRaw: string[]): Review | undefined {
    const result: ReviewCard[] = [];
    const translation: string[] = [];
    const vocabulary = Dictionary.vocabulary;
    const wanikaniLevels = Dictionary.wanikaniLevels;
    const meanings = Dictionary.meanings;

      const params = WaniKaniReview.parseWaniKaniQuery(paramsRaw);
      if (!params) {
        return undefined;
      }

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
          const card = ReviewCard.create(
            "Reading",
            word.japanese,
            word.readings.concat(word.japanese),
            word.readings,
            "hiragana"
          );
          result.push(card);
        }

        if (params.meaning) {
          const card = ReviewCard.create(
            "Meaning",
            word.japanese,
            word.meanings
          );
          result.push(card);
        }

        if (params.translation) {
          translation.push(Word2.primaryMeaning(word));
        }
      });

    translation.forEach((meaning) => {
      const wordIds = meanings.get(meaning);
      if (!wordIds) {
        return;
      }
      const words: Word2[] = [];

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

      const card = ReviewCard.create(
        "In Japanese",
        meaning,
        allReadings,
        japaneseWords,
        "hiragana"
      );
      result.push(card);
    });

    return new Review(new RandomPicker(result));
  }

}

export default WaniKaniReview;
