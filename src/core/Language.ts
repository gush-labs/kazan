/**
 * Module responsible for everything related to any
 * manupiluations with text in Japanese. Like converting
 * romaji to kana and other way around.
 */
import { hiraganaData, katakanaData } from "@/data/kana";

const alphabet = {
  romajiToHiragana: new Map<string, string>(),
  romajiToKatakana: new Map<string, string>(),
  kanaToRomaji: new Map<string, string>(),
  english: new Set(
    "a b c d e f g h i j k l m n o p q r s t u v w x y z".split(" ")
  ),
  numbers: new Set("1 2 3 4 5 6 7 8 9 0".split(" ")),
};

function updateAlphabet(pair: string[], romajiToKana: Map<string, string>) {
  const kana = pair[0];
  const romaji = pair[1];
  alphabet.kanaToRomaji.set(kana, romaji);

  if (kana.length > 1) {
    alphabet.kanaToRomaji.set(kana[1], ".");
  }

  // normally じ is used instead of ぢ so we'll skip this kana
  if (kana.split("")[0] === "ぢ") return;
  if (kana.split("")[0] === "ヂ") return;
  // we don't wanna mess づ and ず, ぢ and じ
  if (kana === "づ") return;
  if (kana === "ぢ") return;

  if (pair[1] == "n") {
    romajiToKana.set("nn", kana);
  } else {
    romajiToKana.set(romaji, kana);
  }
}

hiraganaData.all.forEach((pair) =>
  updateAlphabet(pair, alphabet.romajiToHiragana)
);
updateAlphabet(["っ", "."], alphabet.romajiToHiragana);
updateAlphabet(["こ", "co"], alphabet.romajiToHiragana);

katakanaData.all.forEach((pair) =>
  updateAlphabet(pair, alphabet.romajiToKatakana)
);
updateAlphabet(["ッ", "."], alphabet.romajiToKatakana);
updateAlphabet(["ー", "-"], alphabet.romajiToHiragana);

class Language {
  static isRomanji(char: string): boolean {
    return alphabet.english.has(char.toLowerCase());
  }

  /**
   * Converts romanji to hiragana
   * @param input string with romanji text
   * @returns romanji text represented in hiragana
   */
  static toHiragana(input: string): string {
    return this.toKana(input, alphabet.romajiToHiragana);
  }

  static completeHiragana(input: string): string {
    return this.toKana(input, alphabet.romajiToHiragana, true);
  }

  static toKatakana(input: string): string {
    return this.toKana(input, alphabet.romajiToKatakana);
  }

  static completeKatakana(input: string) {
    return this.toKana(input, alphabet.romajiToKatakana, true);
  }

  static kanaOnly(input: string): boolean {
    return (
      input
        .split("")
        .filter((c) => c != " ")
        .filter((c) => !alphabet.kanaToRomaji.has(c)).length == 0
    );
  }

  static latinOnly(input: string): boolean {
    return (
      input
        .split("")
        .filter((c) => c != " ")
        .filter((c) => c != ".")
        .filter((c) => c != "?")
        .filter((c) => !alphabet.numbers.has(c.toLowerCase()))
        .filter((c) => !alphabet.english.has(c.toLowerCase())).length == 0
    );
  }

  /**
   * Weakly compares 2 strings by calculating how much they look alike.
   * For example, compare("hello", "herlo", 0.5) will require 2 given string
   * to be at least 50% same, and function will return "true" in case of those strings
   * (because at least half of the characters are the same).
   */
  // TODO: This thing needs unit tests very much
  static compare(
    input: string,
    target: string,
    correctnessThreshold: number
  ): boolean {
    // If two strings are significantly different in length, then
    // there is no reason to compare characters and we should just return false
    if (
      Math.abs(input.length - target.length) / target.length >
      1 - correctnessThreshold + 0.01
    ) {
      return false;
    }

    const searchDepth = 2;
    let targetPos = 0;
    let correctCharacters = 0;

    input
      .toLowerCase()
      .split("")
      .forEach((inputCharacter, id) => {
        const targetCharacters = target
          .toLowerCase()
          .split("")
          .slice(targetPos);

        for (
          let id = 0;
          id < Math.min(searchDepth, targetCharacters.length);
          id += 1
        ) {
          const targetCharacter = targetCharacters[id];
          if (inputCharacter == targetCharacter) {
            targetPos += id + 1;
            correctCharacters += 1;
            break;
          }
        }
      });

    const correctness = correctCharacters / target.length;
    return correctness >= correctnessThreshold;
  }

  static toKana(input: string, kana: Map<string, string>, complete = false) {
    let output = "";
    let prev = "";
    input.split("").forEach((i) => {
      const l = i.toLowerCase();
      if (l === "-") {
        output += "ー";
      } else if (!alphabet.english.has(l)) {
        output += l;
      } else if (kana.has(prev + l)) {
        output += kana.get(prev + l);
        prev = "";
      } else if (
        prev.length >= 2 &&
        prev[0] == prev[1] &&
        kana.has(prev.slice(1) + l)
      ) {
        output += kana.get(".")! + kana.get(prev.slice(1) + l);
        prev = "";
      } else {
        prev += l;
      }
    });
    // When user completed the input, we should check if there is an "n"
    // at the end of the string. If so, we should replace it with a proper kana
    // before checking the answer
    if (complete && prev == "n" && kana.has("nn")) prev = kana.get("nn")!;
    return output + prev;
  }
}

export default Language;
