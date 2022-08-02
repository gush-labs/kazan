import type ReviewCard from "./ReviewCard";

class ReviewCounter {
  private correct: Set<number> = new Set();
  private incorrect: Set<number> = new Set();
  private completed: number = 0;
  
  private collectionSize: number;
  private repeatTimes: number;

  constructor(collectionSize: number, repeatTimes: number) {
    this.collectionSize = collectionSize;
    this.repeatTimes = repeatTimes;
  }

  addCorrect(card: ReviewCard) {
    this.completed += 1;
    if (!this.incorrect.has(card.id)) {
      this.correct.add(card.id);
    }
  }

  getCorrectCards() {
    return this.correct;
  }

  getIncorrectCards() {
    return this.incorrect;
  }

  addIncorrect(card: ReviewCard) {
    this.correct.delete(card.id);
    this.incorrect.add(card.id);
  }

  getCorrect(): number {
    return this.correct.size;
  }

  getIncorrect(): number {
    return this.incorrect.size;
  }

  getProgress(): number {
    return Math.floor((this.completed / (this.collectionSize * this.repeatTimes)) * 100);
  }
}

export default ReviewCounter;