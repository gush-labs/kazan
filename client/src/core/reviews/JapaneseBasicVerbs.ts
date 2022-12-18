import { Review, RandomPicker, ReviewCard } from "@/core/Review";
import type { CreatorParams, Creator, CreatorStatus } from "./Creator";

function createCard(
  meaning: string,
  note: string,
  japanese: string
): ReviewCard {
  return new ReviewCard({
    question: meaning,
    answers: [japanese],
    note: note,
    type: "translation",
    input: "hiragana",
  });
}

class JapaneseBasicVerbs implements Creator {
  id = "verbs";
  name = "Japanese Basic Verbs";

  enabledParameters = {
    translation: true,
    meaning: false,
    reading: false,
    shuffle: true,
  };

  create(params: CreatorParams, rawParams: string[]): Review | undefined {
    const cards = [
      createCard("to exist", "animate, casual, affirmative", "いる"),
      createCard("to exist", "animate, casual, negative", "いない"),
      createCard("to exist", "animate, polite, affirmative", "います"),
      createCard("to exist", "animate, polite, negative", "いません"),

      createCard("to exist", "inanimate, casual, affirmative", "ある"),
      createCard("to exist", "inanimate, casual, negative", "ない"),
      createCard("to exist", "inanimate, polite, affirmative", "あります"),
      createCard("to exist", "inanimate, polite, negative", "ありません"),

      createCard("to do", "casual, affirmative", "する"),
      createCard("to do", "casual, negative", "しない"),
      createCard("to do", "polite, affirmative", "します"),
      createCard("to do", "polite, negative", "しません"),

      createCard("to become", "casual, affirmative", "なる"),
      createCard("to become", "casual, negative", "ならない"),
      createCard("to become", "polite, affirmative", "なります"),
      createCard("to become", "polite, negative", "なりません"),

      createCard("です", "casual, affirmative", "だ"),
      createCard("です", "casual, negative", "じゃない"),
      createCard("です", "polite, negative", "じゃありません"),
    ];
    return new Review(new RandomPicker(cards));
  }

  levels(): string[] {
    return [];
  }

  status(): CreatorStatus {
    return { available: true, reason: "" };
  }
}

export default JapaneseBasicVerbs;
