/**
 * Interface for review creators. Classes which responsibility
 * is to create reviews for certain subjects.
 */
import type { Review } from "@/core/Review";
import type { Ref } from "vue";

export type CreatorParams = {
  level?: number;
  meaning?: boolean;
  reading?: boolean;
  translation?: boolean;
  shuffle?: boolean;
};

export type CreatorStatus = {
  available: boolean;
  reason: string;
};

export interface Creator {
  id: string;
  name: string;

  meaning: boolean;
  reading: boolean;
  translation: boolean;
  shuffling: boolean;

  /**
   * Creates a new review from given parameters.
   * Parameters are passed as just a raw array of strings
   * (they should be parsed before processing).
   */
  create(params: CreatorParams, rawParams: string[]): Review | undefined;

  /**
   * Returns an array of available levels
   * (for JLTP it will be N5, N4 and so on.)
   *
   * If there are not levels to choose from, should
   * return an empty array.
   */
  levels(): string[];

  /**
   * Tells weither the current review is avaible or not
   * (WaniKani vocabulary might not be avaible is user it not logged in)
   */
  status(): Ref<CreatorStatus>;
}
