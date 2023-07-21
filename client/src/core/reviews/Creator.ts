/**
 * Interface for review creators. Classes which responsibility
 * is to create reviews for certain subjects.
 */
import { ReviewCard, type Review } from "@/core/Review";

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

export type ReviewRow = {
  id: number;
  // Usually english translation of the japanese word
  english: string[];
  // Japanese word or a phrase
  japanese: string[];
  // Reading of the japanese word
  reading: string[];
  // Hints
  note?: string;

  // The next 3 fields are used for the case
  // when we want to show only one answer
  // despite accepting multiple for example
  shownReadings?: string[];
  shownJapanese?: string[];
  shownEnglish?: string[];
};

export type ReviewTable = ReviewRow[];

export function meaningCards(data: ReviewTable): ReviewCard[] {
  return data.map((row) => {
    return new ReviewCard({
      id: row.id,
      type: "meaning",
      question: (row.shownJapanese ?? row.japanese)[0],
      shownAnswers: row.shownEnglish ?? row.english,
      answers: row.english,
      note: row.note,
      input: "romaji",
    });
  });
}

export function readingCards(data: ReviewTable): ReviewCard[] {
  return data.map((row) => {
    return new ReviewCard({
      id: row.id,
      type: "meaning",
      question: (row.shownJapanese ?? row.japanese)[0],
      shownAnswers: row.shownReadings ?? row.reading,
      answers: row.reading,
      note: row.note,
      input: "hiragana",
    });
  });
}

export function translationCards(data: ReviewTable): ReviewCard[] {
  return data.map((row) => {
    return new ReviewCard({
      id: row.id,
      type: "meaning",
      question: (row.shownEnglish ?? row.english)[0],
      shownAnswers: row.shownJapanese ?? row.japanese,
      answers: row.japanese.concat(row.reading),
      note: row.note,
      input: "hiragana",
    });
  });
}

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

  enabledParameters: CreatorParams;

  create(
    parameters: CreatorParams,
    additionalParameters: string[]
  ): Review | undefined;

  levels(): string[];

  status(): CreatorStatus;
}
