/**
 * Represents a review card.
 */
class ReviewCard {
  id = 0;
  type = "";
  question = "";

  shownAnswers: string[] = [];
  answers: string[] = [];
  kana = "";

  static create(
    type: string,
    question: string,
    answers: string[],
    shownAnswers: string[] = [],
    kana = ""
  ): ReviewCard {
    const card = this.empty;
    card.type = type;
    card.question = question;
    card.answers = answers;
    card.kana = kana;
    if (shownAnswers.length == 0) {
      card.shownAnswers = answers;
    } else {
      card.shownAnswers = shownAnswers;
    }
    return card;
  }

  get answer(): string {
    return this.answers[0];
  }

  check(userAnswer: string): boolean {
    return (
      this.answers.find(
        (answer) => answer.toLowerCase() == userAnswer.toLowerCase()
      ) != undefined
    );
  }

  assignId(id: number) {
    this.id = id;
  }

  static get empty(): ReviewCard {
    return new ReviewCard();
  }
}

export default ReviewCard;
