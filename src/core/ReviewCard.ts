/**
 * Represents a review card.
 */
class ReviewCard {
  id = 0;
  type = "";
  question = "";
  answers: string[] = [];

  static create(type: string, question: string, answers: string[]): ReviewCard {
    const card = this.empty;
    card.type = type;
    card.question = question;
    card.answers = answers;
    return card;
  }

  get answer(): string {
    return this.answers[0];
  }

  check(userAnswer: string): boolean {
    return this.answers.find((answer) => answer == userAnswer) != undefined;
  }

  assignId(id: number) {
    this.id = id;
  }

  static get empty(): ReviewCard {
    return new ReviewCard();
  }
}

export default ReviewCard;
