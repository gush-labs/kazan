/**
 * Interface for review creators. Classes which responsibility
 * is to create reviews for certain subjects.
 */
import type { Review } from "@/core/Review";

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

/**
 * Takes creator params with raw params and converts them
 * into a string, than can be put into URL parameters
 */
export function exportParams(
  params: CreatorParams,
  rawParams: string[]
): string {
  const data: string[] = [
    (params.level ?? 0) + "",
    (params.meaning ?? false) + "",
    (params.reading ?? false) + "",
    (params.translation ?? false) + "",
    (params.shuffle ?? false) + "",
  ];
  return data.concat(rawParams).reduce((l, r) => l + "," + r);
}

/**
 * Takes the string from URL parameters and parses it into
 */
export function parseParams(params: string): [CreatorParams, string[]] {
  const data: string[] = params.split(",");
  return [
    {
      level: parseInt(data[0]),
      meaning: data[1] == "true",
      reading: data[2] == "true",
      translation: data[3] == "true",
      shuffle: data[4] == "true",
    },
    data.slice(5),
  ];
}

export interface Creator {
  id: string;
  name: string;

  // If creator only supports some of parameters
  // and has default values for them
  fixedParams: CreatorParams;

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
  status(): CreatorStatus;
}
