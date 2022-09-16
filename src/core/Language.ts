/**
 * Module responsible for everything related to any
 * manupiluations with text in Japanese. Like converting
 * romaji to kana and other way around.
 */
import { hiraganaData, katakanaData } from "@/data/kana";

const hiragana: Map<string, string> = new Map(); // romaji -> hiragana
const katakana: Map<string, string> = new Map(); // romaji -> katakana
const romaji: Map<string, string> = new Map(); // kana -> romaji
const alphabet: Set<string> = new Set(
  "a b c d e f g h i j k l m n o p q r s t u v w x y z".split(" ")
);

function setToMapper(pair: string[], kana: Map<string, string>) {
  if (pair[1] != ".") romaji.set(pair[0], pair[1]);

  // normally じ is used instead of ぢ
  // so we'll skip this kana
  if (pair[0].split("")[0] === "ぢ") return;
  if (pair[0].split("")[0] === "ヂ") return;
  // we don't wanna mess づ and ず, ぢ and じ
  if (pair[0] === "づ") return;
  if (pair[0] === "ぢ") return;

  if (pair[1] == "n") {
    kana.set("nn", pair[0]);
  } else {
    kana.set(pair[1], pair[0]);
  }
}

hiraganaData.all.forEach((pair) => setToMapper(pair, hiragana));
setToMapper(["っ", "."], hiragana);
setToMapper(["こ", "co"], hiragana);

katakanaData.all.forEach((pair) => setToMapper(pair, katakana));
setToMapper(["ッ", "."], katakana);

export class Language {
  static isRomanji(char: string): boolean {
    return alphabet.has(char.toLowerCase());
  }

  /**
   * Converts hiragana to romaji
   * @param input string with hiragana text
   * @returns hiragana text represented in romaji
   */
  static toRomaji(input: string): string {
    let output = "";
    let prev = "";

    // TODO: Add handling of sokuon
    input.split("").forEach((i) => {
      const l = i.toLowerCase();
      if (alphabet.has(l)) {
        output += l;
        return;
      }

      prev += l;
      if (prev.length == 2) {
        if (romaji.has(prev)) {
          output += romaji.get(prev);
        } else {
          if (romaji.has(prev[0])) output += romaji.get(prev[0]);
          else output += prev[0];

          if (romaji.has(prev[1])) output += romaji.get(prev[1]);
          else output += prev[1];
        }
        prev = "";
      }
    });
    if (prev.length == 1 && romaji.has(prev)) {
      output += romaji.get(prev);
    }
    return output;
  }

  /**
   * Converts romanji to hiragana
   * @param input string with romanji text
   * @returns romanji text represented in hiragana
   */
  static toHiragana(input: string): string {
    return this.toKana(input, hiragana);
  }

  static completeHiragana(input: string): string {
    return this.toKana(input, hiragana, true);
  }

  static toKatakana(input: string): string {
    return this.toKana(input, katakana);
  }

  static completeKatakana(input: string) {
    return this.toKana(input, katakana, true);
  }

  static toKana(input: string, kana: Map<string, string>, complete = false) {
    let output = "";
    let prev = "";
    input.split("").forEach((i) => {
      const l = i.toLowerCase();
      if (l === "-") {
        output += "ー";
      } else if (!alphabet.has(l)) {
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
