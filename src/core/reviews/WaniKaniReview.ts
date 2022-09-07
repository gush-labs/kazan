import { Review, RandomPicker, ReviewCard } from "@/core/Review";
import { Dictionary, Word } from "@/core/Dictionary";
import type Creator from "./Creator";

type WaniKaniQuery = {
  level: number;
  reading: boolean;
  meaning: boolean;
  translation: boolean;
};

class WaniKaniReview implements Creator {
  id = "wanikani";
  name = "WaniKani";

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
        result.push(new ReviewCard({
          type: "reading",
          question: word.japanese,
          answers: word.readings.concat(word.japanese),
          shownAnswers: word.readings,
          input: "hiragana"
        }));
      }

      if (params.meaning) {
        result.push(new ReviewCard({
          type: "meaning",
          question: word.japanese,
          answers: word.meanings
        }));
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

      result.push(new ReviewCard({
        type: "translation",
        question: meaning,
        answers: allReadings.concat(japaneseWords),
        shownAnswers: japaneseWords,
        input: "hiragana"
      }));
    });

    return new Review(new RandomPicker(result));
  }
}

export default WaniKaniReview;
