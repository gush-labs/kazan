
class ReviewCard {
  target: string;
  answer: string;
  id: number;

  constructor(id: number, target: string, answer: string) {
    this.target = target;
    this.id = id;
    this.answer = answer;
  }
}

export default ReviewCard;