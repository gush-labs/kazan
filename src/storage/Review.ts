import translator from "@/language/Translator";
import Card from "./Card";

type Collection = Array<Card>;

/**
 * Implementation for the way review cards
 * will be picked from the collection
 */
interface Picker {
  // get a card to review
  pick(): Card;
  // called when some card answered correctly
  correct(id: number): void;
  // called when some card answered incorrectly
  incorrect(id: number): void;
  // repeats all cards again
  repeat(): Picker;
  // repeats only incorrect cards
  repeatIncorrect(): Picker;
  // how many cards picker would generate
  size(): number;
  // returns all incorrect cards
  getIncorrect(): Card[];
  // returns all correct cards
  getCorrect(): Card[];
}

/**
 * Picks a new card from the collection randomly
 */
export class RandomPicker implements Picker {
  collection: Collection = [];
  correctCounters: Array<number> = [];
  incorrectCards = new Set<number>();

  constructor(collection: Collection) {
    collection.forEach(() => this.correctCounters.push(0));
    this.collection = collection;
  }

  pick(): Card {
    if (this.collection.length == 0) {
      return Card.empty();
    }

    // Take a new card from the list of least reviewed cards
    const mins = this.getMins();
    const id = mins[Math.floor(Math.random() * mins.length)];
    return Card.from(id, this.collection[id]);
  }

  repeat(): RandomPicker {
    return new RandomPicker(this.collection);
  }

  repeatIncorrect(): RandomPicker {
    return new RandomPicker(this.getIncorrect());
  }

  getCorrect(): Card[] {
    const result: Card[] = [];
    this.collection.forEach((card, id) => {
      if (!this.incorrectCards.has(id)) {
        result.push(card);
      }
    });
    return result;
  }

  getIncorrect(): Card[] {
    const result: Card[] = [];
    this.incorrectCards.forEach((id) => {
      result.push(this.collection[id]);
    });
    return result;
  }

  same(collection: Collection): RandomPicker {
    return new RandomPicker(collection);
  }

  correct(id: number) {
    this.correctCounters[id] += 1;
  }

  incorrect(id: number) {
    this.incorrectCards.add(id);
  }

  /**
   * @returns array of cards which were reviewed least of all
   */
  getMins(): Array<number> {
    const mins: Array<number> = [];

    let min = this.correctCounters[0];
    this.correctCounters.forEach((element) => {
      if (min > element) {
        min = element;
      }
    });
    this.correctCounters.forEach((element, id) => {
      if (element == min) {
        mins.push(id);
      }
    });

    return mins;
  }

  size(): number {
    return this.collection.length;
  }
}

/**
 * Collection of review cards
 */
export class Review {
  kana: string;
  picker: Picker;

  size: number;

  // Counts how much time user spend
  // answering every card
  time: number[] = [];
  timeStart = Date.now();

  completed = new Set<number>();
  correct = new Set<number>();
  incorrect = new Set<number>();

  constructor(picker: Picker, kana: string) {
    this.picker = picker;
    this.size = picker.size();
    this.kana = kana;
  }

  complete(): boolean {
    return this.completed.size == this.size;
  }

  take(): Card {
    this.timeStart = Date.now();
    return this.picker.pick();
  }

  getCorrect(): number {
    return this.correct.size;
  }

  getIncorrect(): number {
    return this.incorrect.size;
  }

  progress(): number {
    return this.completed.size / this.size;
  }

  repeat(): Review {
    return new Review(this.picker.repeat(), this.kana);
  }

  repeatIncorrect(): Review {
    return new Review(this.picker.repeatIncorrect(), this.kana);
  }

  getTimers(): number[] {
    return this.time;
  }

  verify(card: Card, input: string): boolean {
    const romanjiAnswer = translator.toRomaji(card.answer);
    const romanjiInput = translator.toRomaji(input);

    const correct =
      card.answer === input ||
      card.answer === romanjiInput ||
      romanjiAnswer === input ||
      romanjiAnswer === romanjiInput;

    if (correct) {
      console.log("verify: " + input);
      const elapsed = (Date.now() - this.timeStart) / 1000;
      this.time.push(elapsed);

      this.completed.add(card.id);
      if (!this.incorrect.has(card.id)) {
        this.correct.add(card.id);
      }
      this.picker.correct(card.id);
    } else {
      if (!this.correct.has(card.id)) {
        this.incorrect.add(card.id);
      }
      this.picker.incorrect(card.id);
    }
    return correct;
  }
}
