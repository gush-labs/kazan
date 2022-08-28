import translator from "@/language/Translator";
import type Card from "./Card";

type Collection = Array<Card>;

/**
 * Picks cards to review
 */
interface Picker {

  /**
   * Returns a card that currently will be reviewed
   * with an unique id set in Card.id.
   * 
   * This method might return the same cards multiple times
   * depending on the Picker implementation.
   */
  pick(): Card;

  /**
   * Called by the user of the Picker class whenever
   * the card generated by Picker.card() is answered correctly.
   * @param id - id of the card which was answered correctly.
   */
  correct(id: number): void;

  /**
   * Called by the user of the Picker class whenever
   * the card generated by Picker.card() in answered incorrectly.
   * @param id - id of the card which was answered incorrectly.
   */
  incorrect(id: number): void;

  /**
   * How many times Picker.pick() method should be called
   * before the review will be treated as completed.
   */
  totalCards(): number;
}

/**
 * Picks cards randomly and repeats ones that were
 * answered incorrectly.
 */
export class RandomPicker implements Picker {

  // Collection of all cards for this review
  collection: Collection = [];
  // How many times a specific card was picked
  cardPicked: Array<number> = [];

  constructor(collection: Collection) {
    collection.forEach((card, i) => {
      card.assignId(i);
      this.cardPicked.push(0);
      this.collection.push(card);
    });
  }

  pick(): Card {
    // Find cards that were answered the least amount of time
    const minNumberPicked = this.cardPicked.reduce((l, r) => l < r ? l : r);
    // Get IDs of all of those cards
    const minIds: number[] = [];
    this.cardPicked.forEach((v, i) => { if (v == minNumberPicked) { minIds.push(i); } });
    // Take a random card from this array
    const id = minIds[Math.floor(Math.random() * minIds.length)];

    // Marked as already picked
    this.cardPicked[id] += 1;
    return this.collection[id];
  }

  correct(id: number) { }
  incorrect(id: number) { }
  totalCards(): number { return this.collection.length; }

}

/**
 * Represents a review of some set of cards.
 * Which cards will be picked is desided by the
 * implementation of the Picker.
 */
export class Review {
  kana: string;
  picker: Picker;

  // Monitors answer time for the current card
  cardTime = new Map<number, number>();
  cardTimeStart: number = Date.now();

  // All cards generated by Picker.pick();
  generatedCards = new Map<number, Card>();
  // All cards that completed (answered correctly)
  completedCardsIds = new Set<number>();
  // All cards that were answered without any mistakes
  correctCardsIds = new Set<number>();
  // All cards that were answered with at least one mistake
  incorrectCardsIds = new Set<number>();

  constructor(picker: Picker, kana: string) {
    this.picker = picker;
    this.kana = kana;
  }

  completed(): boolean {
    return this.completedCardsIds.size == this.picker.totalCards();
  }

  take(): Card {
    this.cardTimeStart = Date.now();

    // Look for cards that were unswered incorrectly
    const incorrectCardsToReview: number[] = [];
    this.incorrectCardsIds.forEach(i => {
      if (!this.completedCardsIds.has(i)) {
        incorrectCardsToReview.push(i);
      }
    });

    // If there are no incorrectly answered cards to repeat
    // then pick a new one from the picker
    if (this.generatedCards.size < this.picker.totalCards()) {
      const card = this.picker.pick();
      this.generatedCards.set(card.id, card);
      return card;
    } else {
      const rid = Math.floor(Math.random() * incorrectCardsToReview.length);
      const id = incorrectCardsToReview[rid];
      return this.generatedCards.get(id)!;
    }
  }

  getCorrectCards(): Card[] {
    const result: Card[] = [];
    this.completedCardsIds.forEach(id => result.push(this.generatedCards.get(id)!));
    return result;
  }

  getIncorrectCards(): Card[] {
    const result: Card[] = [];
    this.incorrectCardsIds.forEach(id => result.push(this.generatedCards.get(id)!));
    return result;
  }

  /**
   * @returns progress of the current review (value from 0 to 1)
   */
  progress(): number {
    return this.completedCardsIds.size / this.picker.totalCards();
  }

  /**
   * Repeat the entire review from zero
   * @returns new review with the same cards
   */
  repeat(): Review {
    const collection: Collection = [];
    this.completedCardsIds.forEach(id => collection.push(this.generatedCards.get(id)!));
    return new Review(new RandomPicker(collection), this.kana);
  }

  /**
   * Repeat all cards that were answered incorrectly
   * during this review
   * @returns new review with incorrectly answered cards
   */
  repeatIncorrect(): Review {
    const collection: Collection = this.getIncorrectCards();
    return new Review(new RandomPicker(collection), this.kana);
  }

  /**
   * @returns returns how much time user spent answering every card
   */
  getTimers(): number[] {
    const time: number[] = [];
    this.cardTime.forEach((v, k) => time.push(v));
    return time;
  }

  verify(card: Card, input: string): boolean {
    const romanjiAnswer = translator.toRomaji(card.answer()); // what?
    const romanjiInput = translator.toRomaji(input);

    const correct =
      card.answer() === input ||
      card.answer() === romanjiInput ||
      romanjiAnswer === input ||
      romanjiAnswer === romanjiInput;

    if (correct) {
      // Calculate time to answer
      const elapsed = (Date.now() - this.cardTimeStart) / 1000;
      this.cardTime.set(card.id, elapsed);

      // Set as completed and correct if there were no mistakes
      this.completedCardsIds.add(card.id);
      if (!this.incorrectCardsIds.has(card.id)) {
        this.correctCardsIds.add(card.id); 
      }
      this.picker.correct(card.id);
      return true;
    }

    if (!this.correctCardsIds.has(card.id)) {
      this.incorrectCardsIds.add(card.id);
    }
    this.picker.incorrect(card.id);
    return false;
  }
}