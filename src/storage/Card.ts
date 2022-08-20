
class Card {
  id: number = 0;
  target: string = "";
  answers: string[] = [];

  static create(target: string, answer: string): Card {
    const card = new Card();
    card.target = target;
    card.answers.push(answer);
    return card;
  }

  static createM(target: string, answers: string[]): Card {
    const card = new Card();
    card.target = target;
    card.answers = answers;
    return card;
  }

  answer(): string {
    return this.answers[0];
  }

  assignId(id: number) {
    this.id = id;
  }

  static empty(): Card {
    return new Card();
  }
}

export default Card;
