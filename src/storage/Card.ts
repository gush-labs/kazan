
class Card {
  target: string = "";
  answer: string = "";
  id: number = 0;

  static create(id: number, target: string, answer: string): Card {
    const card = new Card();
    card.id = id;
    card.target = target;
    card.answer = answer;
    return card;
  }

  static from(id: number = 0, card: Card): Card{
    const newCard = new Card();
    newCard.id = id;
    newCard.answer = card.answer;
    newCard.target = card.target;
    return newCard;
  }

  static empty(): Card{
    return new Card();
  }
}

export default Card;
