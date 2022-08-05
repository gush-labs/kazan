import ReviewCard from './ReviewCard';

class ReviewCollection {
  
  pairs: Array<Array<string>>;
  correctCounters: Array<number> = [];
  typeHiragana: boolean;

  constructor(pairs: Array<Array<string>>, typeHiragana: boolean = false) {
    this.pairs = pairs;
    this.typeHiragana = typeHiragana;
    pairs.forEach(() => this.correctCounters.push(0));
  }

  size(): number {
    return this.pairs.length;
  }

  take(): ReviewCard {
    if (this.pairs.length == 0) {
      return new ReviewCard(0, "", "");
    }

    const mins = this.getMins();
    const id = mins[Math.floor(Math.random() * mins.length)];
    return new ReviewCard(id, this.pairs[id][0], this.pairs[id][1]);
  }

  verify(card: ReviewCard, answer: string): boolean {
    if (card.answer === answer || card.target === answer) {
      this.correctCounters[card.id] += 1;
      return true;
    }
    return false;
  }

  private getMins(): Array<number> {
    const mins: Array<number> = [];
    
    var min = this.correctCounters[0];
    this.correctCounters.forEach((element) => {
      if (min > element) { min = element; }
    });
    this.correctCounters.forEach((element, id) => {
      if (element == min) { mins.push(id); }
    });

    return mins;
  }

}

export default ReviewCollection;