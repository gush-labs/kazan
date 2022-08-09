import database from "@/storage/Database";
import { throwStatement } from "@babel/types";

const hiragana: Map<string, string> = new Map(); // romanji -> hiragana
const katakana: Map<string, string> = new Map(); // romanji -> katakana
const romanji: Map<string, string> = new Map();  // kana -> romanji
const alphabet: Set<string> = new Set("a b c d e f g h i j k l m n o p q r s t u v w x y z".split(" "));

function initializeMapper() {
    function setToMapper(pair: string[], kana: Map<string, string>) {
      if (pair[1] != ".")
        romanji.set(pair[0], pair[1]);

      // normally じ is used instead of ぢ
      // so we'll skip this hiragana
      if (pair[0].split("")[0] === "ぢ") return;
      if (pair[0].split("")[0] === "ヂ") return;

      if (pair[1] == "n") {
        kana.set("nn", pair[0]);
      } else {
        kana.set(pair[1], pair[0]);
      }
    };
    database.hiragana.all.forEach((pair) => setToMapper(pair, hiragana));
    setToMapper(["っ", "."], hiragana);

    database.katakana.all.forEach((pair) => setToMapper(pair, katakana));
    setToMapper(["ッ", "."], katakana);
}
initializeMapper();

class Translator {

  isRomanji(char: string): boolean {
    return alphabet.has(char.toLowerCase());
  }

  /**
   * Converts hiragana to romanji
   * @param input string with hiragana text
   * @returns hiragana text represented in romanji
   */
  toRomanji(input: string): string {
    var output = "";
    var prev = "";
    
    // TODO: Add handling of sokuon
    input.split("").forEach(i => {
      const l = i.toLowerCase();
      if (alphabet.has(l)) { output += l; return; }

      prev += l;
      if (prev.length == 2) {
        if (romanji.has(prev)) { output += romanji.get(prev); }
        else {
          if (romanji.has(prev[0])) output += romanji.get(prev[0]);
          else output += prev[0];

          if (romanji.has(prev[1])) output += romanji.get(prev[1]);
          else output += prev[1];
        }
        prev = "";
      }
    });
    if (prev.length == 1 && romanji.has(prev)) {
      output += romanji.get(prev);
    }
    return output; 
  }

  /**
   * Converts romanji to hiragana
   * @param input string with romanji text
   * @returns romanji text represented in hiragana
   */
  toHiragana(input: string): string {
    return this.toKana(input, hiragana);
  }

  completeHiragana(input: string): string {
    return this.toKana(input, hiragana, true);
  }

  toKatakana(input: string): string {
    return this.toKana(input, katakana);
  }

  completeKatakana(input: string) {
    return this.toKana(input, katakana, true);
  }

  toKana(input: string, kana: Map<string, string>, complete: boolean = false) {
    var output = "";
    var prev = "";
    input.split("").forEach(i => {
      const l = i.toLowerCase();
      if (!alphabet.has(l) || i == ".") {
        output += l;
      } else if (kana.has(prev + l)) {
        output += kana.get(prev + l);
        prev = "";
      } else if (prev.length >= 2 && prev[0] == prev[1] && kana.has(prev.slice(1) + l)) {
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

const translator = new Translator();
export default translator;