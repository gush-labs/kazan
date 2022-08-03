
class ReviewReport {
  correct: Set<number>;
  incorrect: Set<number>;

  constructor(correct: Set<number>, incorrect: Set<number>) {
    this.correct = correct;
    this.incorrect = incorrect;
  }
}

export default ReviewReport;