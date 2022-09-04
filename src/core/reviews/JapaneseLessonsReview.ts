import { Review, RandomPicker } from "../Review";
import ReviewCard from "../ReviewCard";
import type Creator from "./Creator";

function createCard(
  meaning: string,
  note: string,
  japanese: string
): ReviewCard {
  const card = ReviewCard.empty;
  card.question = meaning;
  card.answers = [japanese];
  card.shownAnswers = [japanese];
  card.note = note;
  card.type = "In Japanese";
  card.kana = "hiragana";
  return card;
}

class JapaneseLessonsReview implements Creator {
  id = "lessons";
  name = "Japanese Lessons";

  create(params: string[]): Review | undefined {
    const cards = [
      createCard("to exist", "animate, casual, positive", "いる"),
      createCard("to exist", "animate, casual, negative", "いない"),
      createCard("to exist", "animate, polite, positive", "います"),
      createCard("to exist", "animate, polite, negative", "いません"),

      createCard("to exist", "inanimate, casual, positive", "ある"),
      createCard("to exist", "inanimate, casual, negative", "ない"),
      createCard("to exist", "inanimate, polite, positive", "あります"),
      createCard("to exist", "inanimate, polite, negative", "ありません"),

      createCard("to do", "casual, positive", "する"),
      createCard("to do", "casual, negative", "しない"),
      createCard("to do", "polite, positive", "します"),
      createCard("to do", "polite, negative", "しません"),

      createCard("to become", "casual, positive", "なる"),
      createCard("to become", "casual, negative", "ならない"),
      createCard("to become", "polite, positive", "なります"),
      createCard("to become", "polite, negative", "なりません"),
    ];
    return new Review(new RandomPicker(cards));
  }
}

export default JapaneseLessonsReview;
