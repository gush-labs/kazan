import translator from '@/language/Translator';
import ReviewCard from './ReviewCard';

class ReviewCollection {
  
  pairs: Array<Array<string>>;
  correctCounters: Array<number> = [];
  kana: string;

  constructor(pairs: Array<Array<string>>, kana: string) {
    this.pairs = pairs;
    this.kana = kana;
    pairs.forEach(() => this.correctCounters.push(0));
  }

  size(): number {
    return this.pairs.length;
  }

  take(): ReviewCard {
    if (this.pairs.length == 0) {
      return new ReviewCard(0, "", "");
    }

    // Take a new card from the list of least reviewed cards
    const mins = this.getMins();
    const id = mins[Math.floor(Math.random() * mins.length)];
    return new ReviewCard(id, this.pairs[id][0], this.pairs[id][1]);
  }

  verify(card: ReviewCard, input: string): boolean {
    const romanjiAnswer = translator.toRomanji(card.answer);
    const romanjiInput = translator.toRomanji(input);

    const correct = card.answer === input ||
                    card.answer === romanjiInput ||
                    romanjiAnswer === input || 
                    romanjiAnswer === romanjiInput;

    this.correctCounters[card.id] += correct ? 1 : 0;
    return correct;
  }

  /**
   * @returns array of cards which were reviewed least of all
   */
  getMins(): Array<number> {
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