import { Review, RandomPicker, ReviewCard } from "@/core/Review";
import type Creator from "./Creator";

function createCard(
  meaning: string,
  note: string,
  japanese: string[]
): ReviewCard {
  const card = ReviewCard.empty;
  card.question = meaning;
  card.answers = japanese;
  card.shownAnswers = [japanese[0]];
  card.note = note;
  card.type = "In Japanese";
  card.kana = "hiragana";
  return card;
}

class JapanesePhrases implements Creator {
  id = "phrases";
  name = "Japanese Common Phrases";

  create(params: string[]): Review | undefined {
    const cards = [
      createCard("Glad to meet you", "", ["はじめまして"]),
      createCard("Look forward to work with you", "", [
        "よろしくおねがいします",
      ]),
      createCard("Good morning", "", ["おはようございます"]),
      createCard("Good day", "", ["こんにちは"]),
      createCard("Good evening", "", ["こんばんは"]),

      createCard("Good night", "", ["おやすみなさい"]),
      createCard("Excuse me", "", ["すみません"]),
      createCard("I'm sorry", "", ["ごめんなさい"]),
      createCard("Thank you", "", ["ありがとうございます", "ありがとう"]),
      // createCard("You're welcome", "", ["どういたしまして"]),
    ];
    return new Review(new RandomPicker(cards));
  }
}

export default JapanesePhrases;
