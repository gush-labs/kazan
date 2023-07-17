import { Review, RandomPicker, ReviewCard } from "@/core/Review";
import type {
  CreatorParams,
  Creator,
  CreatorStatus,
  ReviewRow,
} from "./Creator";
import { meaningCards, translationCards } from "./Creator";

function createCard(
  meaning: string,
  note: string,
  japanese: string[]
): ReviewCard {
  return new ReviewCard({
    question: meaning,
    answers: japanese,
    shownAnswers: [japanese[0]],
    note: note,
    type: "translation",
    input: "hiragana",
  });
}

class JapanesePhrases implements Creator {
  id = "phrases";
  name = "Genki - Phrases";

  enabledParameters = {
    translation: true,
    meaning: true,
    reading: false,
  };

  create(params: CreatorParams, rawParams: string[]): Review | undefined {
    const data: ReviewRow[] = [
      {
        id: 0,
        english: ["Good morning"],
        japanese: ["おはよう", "おはようございます"],
        reading: [],
      },
      {
        id: 1,
        english: ["Good afternoon", "Good day"],
        japanese: ["こんにちは"],
        reading: [""],
      },
      {
        id: 2,
        english: ["Good evening"],
        japanese: ["こんばんは"],
        reading: [""],
      },
      { id: 3, english: ["Good-bye"], japanese: ["さようなら"], reading: [""] },
      {
        id: 4,
        english: ["Good night"],
        japanese: ["おやすみなさい", "おやすみ"],
        reading: [""],
      },
      {
        id: 5,
        english: ["Thank you"],
        japanese: ["ありがとうございます", "ありがとう"],
        reading: [""],
      },
      {
        id: 6,
        english: ["Excuse me"],
        japanese: ["すみません"],
        reading: [""],
      },
      { id: 7, english: ["No"], japanese: ["いいえ"], reading: [""] },
      {
        id: 8,
        english: ["I'll go and come back", "I'll go", "I will go"],
        japanese: ["いってきます"],
        reading: [""],
      },
      {
        id: 9,
        english: ["Please go and come back", "Come back"],
        japanese: ["いってらしゃい"],
        reading: [""],
      },
      {
        id: 10,
        english: ["I'm home", "I am home"],
        japanese: ["ただいま"],
        reading: [""],
      },

      {
        id: 11,
        english: ["Welcome home"],
        japanese: ["おかえりなさい", "おかえり"],
        reading: [""],
      },
      {
        id: 10,
        english: ["I'm home", "I am home"],
        japanese: ["ただいま"],
        reading: [""],
      },
      {
        id: 10,
        english: ["I'm home", "I am home"],
        japanese: ["ただいま"],
        reading: [""],
      },
    ];
    const meaning = params.meaning ? meaningCards(data) : [];
    const translation = params.translation ? translationCards(data) : [];
    return new Review(new RandomPicker(meaning.concat(translation)));
  }

  levels(): string[] {
    return [];
  }

  status(): CreatorStatus {
    return { available: true, reason: "" };
  }
}

export default JapanesePhrases;
