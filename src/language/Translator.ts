import database from "@/storage/Database";

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
      if (alphabet.has(l)) { return; }

      prev += l;
      if (prev.length == 2) {
        if (romanji.has(prev)) { output += romanji.get(prev); }
        else {
          output += romanji.get(prev[0]);
          output += romanji.get(prev[1]);
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

  toKatakana(input: string): string {
    return this.toKana(input, katakana);
  }

  toKana(input: string, kana: Map<string, string>) {
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
    return output + prev;
  }

}

const translator = new Translator();
export default translator;