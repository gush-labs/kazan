
class Card {
  id: number = 0;
  type: string = "";
  target: string = "";
  answers: string[] = [];

  static create(type: string, target: string, answers: string[]): Card {
    const card = new Card();
    card.type = type;
    card.target = target;
    card.answers = answers;
    return card;
  }

  answer(): string {
    return this.answers[0];
  }

  check(answer: string): boolean {
    if (answer === this.target) { return true; }
    for (const a in this.answers) { if (answer === a) { return true; } }
    return false;
  }

  assignId(id: number) {
    this.id = id;
  }

  static empty(): Card {
    return new Card();
  }
}

export default Card;
