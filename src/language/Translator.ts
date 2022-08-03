import database from "@/storage/Database";

class Translator {

  mapper: Map<string, string>;
  alphabet: Set<string> = new Set("a b c d e f g h i j k l m n o p q r s t u v w x y z".split(" "));

  constructor() {
    this.mapper = new Map();
    database.hiragana.monographs.main.forEach(pair => this.setToMapper(pair));
    database.hiragana.monographs.digraphs.forEach(pair => this.setToMapper(pair));
    database.hiragana.diacritics.main.forEach(pair => this.setToMapper(pair));
    database.hiragana.diacritics.digraphs.forEach(pair => this.setToMapper(pair));
  }

  private setToMapper(pair: string[]) {
    if (pair[1] == "n") {
      this.mapper.set(pair[0], "nn");
      this.mapper.set("nn", pair[0]);
    } else {
      this.mapper.set(pair[0], pair[1]);
      this.mapper.set(pair[1], pair[0]);
    }
  }

  /**
   * Converts hiragana to romanji
   * @param input string with hiragana text
   * @returns hiragana text represented in romanji
   */
  toRomanji(input: string): string {
    var output = "";
    var prev = "";
    input.split("").forEach(i => {
      const l = i.toLowerCase();
      if (this.alphabet.has(l)) { return; }

      prev += l;
      if (prev.length == 2) {
        if (this.mapper.has(prev)) { output += this.mapper.get(prev); }
        else {
          output += this.mapper.get(prev[0]);
          output += this.mapper.get(prev[1]);
        }
        prev = "";
      }
    });
    if (prev.length == 1 && this.mapper.has(prev)) {
      output += this.mapper.get(prev);
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
      if (!this.alphabet.has(l)) {
        output += l;
      } else if (this.mapper.has(prev + l)) {
        output += this.mapper.get(prev + l);
        prev = "";
      } else if (prev.length >= 2 && prev[0] == prev[1] && this.mapper.has(prev.slice(1) + l)) {
        output += "っ" + this.mapper.get(prev.slice(1) + l);
        prev = "";
      } else {
        prev += l;
      }
    });
    return output + prev;
  }

}

export default Translator;