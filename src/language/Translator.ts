import database from "@/storage/Database";

const mapper: Map<string, string> = new Map();
const alphabet: Set<String> = new Set("a b c d e f g h i j k l m n o p q r s t u v w x y z".split(" "));

function initializeMapper() {
    function setToMapper(pair: string[]) {
      if (pair[1] == "n") {
        mapper.set(pair[0], "nn");
        mapper.set("nn", pair[0]);
      } else {
        mapper.set(pair[0], pair[1]);
        mapper.set(pair[1], pair[0]);
      }
    };
    database.hiragana.monographs.main.forEach(pair => setToMapper(pair));
    database.hiragana.monographs.digraphs.forEach(pair => setToMapper(pair));
    database.hiragana.diacritics.main.forEach(pair => setToMapper(pair));
    database.hiragana.diacritics.digraphs.forEach(pair => setToMapper(pair));
}
initializeMapper();

class Translator {

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
        if (mapper.has(prev)) { output += mapper.get(prev); }
        else {
          output += mapper.get(prev[0]);
          output += mapper.get(prev[1]);
        }
        prev = "";
      }
    });
    if (prev.length == 1 && mapper.has(prev)) {
      output += mapper.get(prev);
    }
    return output; 
  }

  /**
   * Converts romanji to hiragana
   * @param input string with romanji text
   * @returns romanji text represented in hiragana
   */
  toHiragana(input: string): string {
    var output = "";
    var prev = "";
    input.split("").forEach(i => {
      const l = i.toLowerCase();
      console.log(prev);
      if (!alphabet.has(l)) {
        output += l;
      } else if (mapper.has(prev + l)) {
        output += mapper.get(prev + l);
        prev = "";
      } else if (prev.length >= 2 && prev[0] == prev[1] && mapper.has(prev.slice(1) + l)) {
        output += "っ" + mapper.get(prev.slice(1) + l);
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