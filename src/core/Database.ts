// TODO: This file should be destroyed, disassembled, buried under the ground
// every person who knows about existence of this file should be killed
import { ReviewCard } from "@/core/Review";
import { hiraganaData, katakanaData } from "@/data/kana";

type Word = {
  japanese: string; // full word in japanese using kanji, hiragana and katakana
  reading: string; // reading of this word in hiragana
  meanings: string[]; // possible meanings
  meaning: string; // primary meaning

  // optional fields for now
  wk_id?: number; // WaniKani id
  audio?: string; // link to prononciation audio
  pictch?: string; // pitch pattern for this word
};

const vocabular = new Map<string, Word>();
const vocabularMeaning = new Map<string, Word[]>();
function set(
  japanese: string,
  reading: string,
  meanings: string[],
  meaning: string
) {
  const word = { japanese, reading, meanings, meaning };
  if (vocabular.has(japanese)) {
    console.error("Duplicate in the dababase: " + japanese);
  }
  vocabular.set(japanese, word);

  if (!vocabularMeaning.has(meaning)) {
    vocabularMeaning.set(meaning, []);
  }
  vocabularMeaning.get(meaning)!.push(word);
}

set("私", "わたし", ["me", "i"], "me");
set("誰", "だれ", ["who"], "who?");
set("何", "なに", ["what"], "what?");
set("名前", "なまえ", ["name"], "name");
set("友達", "ともだち", ["friend"], "friend");
set("先生", "せんせい", ["teacher"], "teacher");
set("学生", "がくせい", ["student"], "student");
set("お母さん", "おかあさん", ["mother"], "mother");
set("お父さん", "おとうさん", ["father"], "mother");
set("母", "はは", ["mother"], "mother");
set("父", "ちち", ["father"], "father");
set("おじいさん", "おじいさん", ["grandfather", "grandpa"], "grandfather");
set("おばあさん", "おばあさん", ["grapndmother", "grandma"], "grandmother");
set("兄", "あに", ["older brother"], "older brother");
set("妹", "いもうと", ["younger sister"], "younger sister");
set("家族", "かぞく", ["family"], "family");
set("日本語", "にほんご", ["japanese", "japanese language"], "japanese");
set("大人", "おとな", ["adult"], "adult");
set("一人", "ひとり", ["one person", "alone"], "one person");
set("人工", "じんこう", ["artificial"], "artificial");
set("大きい", "おおきい", ["big"], "big");
set("下", "した", ["down"], "down");
set("八", "はち", ["eight"], "eight");
set("八つ", "やっつ", ["eight things"], "eight things");
set("入り口", "いりぐち", ["entrance", "enter"], "entrance");
set("大した", "たいした", ["important"], "important");
set("山", "やま", ["mountain"], "mountain");
set("口", "くち", ["mouth"], "mouth");
set("ふじ山", "ふじさん", ["mountain fuji", "fuji"], "mountain Fuji");
set("九", "く", ["nine"], "nine");
set("色", "いろ", ["color"], "color");
set("九つ", "ここのつ", ["nine things"], "nine things");
set("一", "いち", ["one"], "one");
set("一つ", "ひとつ", ["one thing"], "one thing");
set("人", "ひと", ["person"], "person");
set("下さい", "ください", ["please give me"], "please give me");
set("人口", "じんこう", ["population"], "population");
set("力", "ちから", ["power"], "power");
set("川", "かわ", ["river"], "river");
set("七", "なな", ["seven"], "seven");
set("七つ", "ななつ", ["seven thigns"], "seven things");
set("大きさ", "おおきさ", ["size"], "size");
set("十", "じゅう", ["ten"], "ten");
set("三", "さん", ["three"], "three");
set("三人", "さんにん", ["three people", "three person"], "three people");
set("三つ", "みっつ", ["three things"], "three things");
set("入る", "はいる", ["to enter", "enter"], "to enter"),
  set("上げる", "あげる", ["to raise"], "to raise");
set("下げる", "さげる", ["to lower"], "to lower");
set("二", "に", ["two"], "two");
set("二人", "ふたり", ["two people", "two person"], "two people");
set("二つ", "ふたつ", ["two things"], "two things");
set("上", "うえ", ["up"], "up");
set("力いっぱい", "ちからいっぱい", ["full power"], "full power");
set("女", "おんな", ["woman"], "woman");

const wanikani_l1_vocabular = [
  ["大人", "おとな"],
  ["一人", "ひとり"],
  ["人工", "じんこう"],
  ["大きい", "おおきい"],
  ["下", "した"],
  ["八", "はち"],
  ["八つ", "やっつ"],
  ["入り口", "いりぐち"],
  ["大した", "たいした"],
  ["山", "やま"],
  ["口", "くち"],
  ["ふじ山", "ふじさん"],
  ["九", "く"],
  ["九つ", "ここのつ"],
  ["一", "いち"],
  ["一つ", "ひとつ"],
  ["人", "ひと"],
  ["下さい", "ください"],
  ["人口", "じんこう"],
  ["力", "ちから"],
  ["川", "かわ"],
  ["七", "なな"],
  ["七つ", "ななつ"],
  ["大きさ", "おおきさ"],
  ["十", "じゅう"],
  ["三", "さん"],
  ["三人", "さんにん"],
  ["三つ", "みっつ"],
  ["入る", "はいる"],
  ["上げる", "あげる"],
  ["下げる", "さげる"],
  ["二", "に"],
  ["二人", "ふたり"],
  ["二つ", "ふたつ"],
  ["上", "うえ"],
  ["力いっぱい", "ちからいっぱい"],
  ["女", "おんな"],
];

const wanikani_l2_vocabular = [
  ["四月", "しがつ"],
  ["玉", "たま"],
  ["本", "ほん"],
  ["丸", "まる"],
  ["丸い", "まるい"],
  ["正しい", "ただしい"],
  ["犬", "いぬ"],
  ["八日", "ようか"],
  ["夕べ", "ゆうべ"],
  ["出口", "でぐち"],
  ["目", "め"],
  ["目玉", "めだま"],
  ["二月", "にがつ"],
  ["五日", "いつか"],
  ["五十", "ごじゅう"],
  ["火", "ひ"],
  ["五", "ご"],
  ["五つ", "いつつ"],
  ["四", "よん"],
  ["天才", "てんさい"],
  ["女子", "じょし"],
  ["女の子", "おんなのこ"],
  ["上手", "じょうず"],
  ["手", "て"],
  ["天", "てん"],
  ["入力", "にゅうりょく"],
  ["中", "なか"],
  ["一月", "いちがつ"],
  ["日本", "にほん"],
  ["六月", "ろくがつ"],
  ["子", "こ"],
  ["王", "おう"],
  ["左右", "さゆう"],
  ["左", "ひだり"],
  ["五月", "ごがつ"],
  ["〜円", "えん"],
  ["月", "つき"],
  ["九日", "ここのか"],
  ["十月", "じゅうがつ"],
  ["一日", "いちにち"],
  ["一千", "いっせん"],
  ["千円", "せんえん"],
  ["玉ねぎ", "たまねぎ"],
  ["人々", "ひとびと"],
  ["王子", "おうじ"],
  ["王女", "おうじょ"],
  ["子犬", "こいぬ"],
  ["女王", "じょおう"],
  ["田", "た"],
  ["右", "みぎ"],
  ["円い", "まるい"],
  ["二日", "ふつか"],
  ["七日", "なのか"],
  ["六", "ろく"],
  ["十六", "じゅうろく"],
  ["六日", "むいか"],
  ["六つ", "むっつ"],
  ["小さい", "ちいさい"],
  ["土", "つち"],
  ["日", "ひ"],
  ["刀", "かたな"],
  ["十日", "とおか"],
  ["三日", "みっか"],
  ["千", "せん"],
  ["上る", "のぼる"],
  ["正す", "ただす"],
  ["出る", "でる"],
  ["立つ", "たつ"],
  ["木", "き"],
  ["水中", "すいちゅう"],
  ["下手", "へた"],
  ["中々", "なかなか"],
  ["火山", "かざん"],
  ["水", "みず"],
  ["白", "しろ"],
  ["白人", "はくじん"],
  ["文", "ぶん"],
  ["〜才", "さい"],
];

const kanji_numbers = [
  ["一", "ichi"],
  ["ニ", "ni"],
  ["三", "san"],
  ["四", "yon"],
  ["五", "go"],
  ["六", "roku"],
  ["七", "nana"],
  ["八", "hachi"],
  ["九", "ku"],
  ["十", "jyuu"],
  ["百", "hyaku"],
  ["千", "sen"],
  ["万", "man"],
];

const kanji_numbers_people = [
  ["一人", "ひとり"],
  ["二人", "ふたり"],
  ["三人", "さんにん"],
  ["四人", "よにん"],
  ["五人", "ごにん"],
  ["六人", "ろくにん"],
  ["七人", "しちにん"],
  ["八人", "はちにん"],
  ["九人", "くにん"],
  ["十人", "じゅうにん"],
];

const kanji_numbers_days = [
  ["一日", "いちにち"],
  ["二日", "ふつか"],
  ["三日", "みっか"],
  ["四日", "よっか"],
  ["五日", "いつか"],
  ["六日", "むいか"],
  ["七日", "なのか"],
  ["八日", "ようか"],
  ["九日", "ここのか"],
  ["十日", "とおか"],
];

const kanji_numbers_things = [
  ["", ""],
  ["", ""],
  ["", ""],
  ["", ""],
  ["", ""],
  ["", ""],
  ["", ""],
  ["", ""],
  ["", ""],
  ["", ""],
];

const kanji_numbers_month = [
  ["一月", "いちがつ"],
  ["二月", "にがつ"],
  ["三月", "さんがつ"],
  ["四月", "しがつ"],
  ["五月", "ごがつ"],
  ["六月", "ろくがつ"],
  ["七月", "しちがつ"],
  ["八月", "はちがつ"],
  ["九月", "くがつ"],
  ["十月", "じゅうがつ"],
];

const arabic_numbers = [
  ["1", "ichi"],
  ["2", "ni"],
  ["3", "san"],
  ["4", "yon"],
  ["5", "go"],
  ["6", "roku"],
  ["7", "nana"],
  ["8", "hachi"],
  ["9", "kyuu"],
  ["10", "jyuu"],
];

const jlpt_l1_vocabular = [
  "私",
  "誰",
  "何",
  "名前",
  "友達",
  "先生",
  "学生",
  "お母さん",
  "お父さん",
  "おじいさん",
  "おばあさん",
  "兄",
  "妹",
  "家族",
  "日本語",
  "大きい",
  "色",
  "入口",
  "上",
  "内",
  "円",
  "大人",
  "女",
  "女の子",
  "川",
  "木",
  "北",
  "下さい",
  "口",
  "下",
  "上手",
  "〜人",
  "千",
  "外",
  "大切",
  "食べる",
];

class Database {
  katakana = katakanaData;
  hiragana = hiraganaData;

  vocabular = {
    wanikani: [wanikani_l1_vocabular, wanikani_l2_vocabular],
    jlpt: [jlpt_l1_vocabular],
  };

  wordsReadings(words: string[]) {
    return this.findData(words, (word) => {
      const entry = vocabular.get(word);
      return entry
        ? ReviewCard.create("Reading", entry.japanese, [entry.reading])
        : undefined;
    });
  }

  wordsMeanings(words: string[]) {
    return this.findData(words, (word) => {
      const entry = vocabular.get(word);
      return entry
        ? ReviewCard.create("Meaning", entry.japanese, entry.meanings)
        : undefined;
    });
  }

  meaningsWords(meanings: string[]): ReviewCard[] {
    return this.findData(meanings, (meaning) => {
      const words = vocabularMeaning.get(meaning);
      if (words) {
        return ReviewCard.create(
          "Japanese",
          meaning,
          words.map((e) => e.japanese).concat(words.map((e) => e.reading))
        );
      }
      return undefined;
    });
  }

  private findData<T>(
    keys: string[],
    reader: (key: string) => T | undefined
  ): T[] {
    const requested = new Set<string>();
    return keys
      .map((key) => {
        if (requested.has(key)) {
          console.error("Requested several times: " + key);
          return undefined;
        }
        requested.add(key);
        return reader(key);
      })
      .filter((e) => e)
      .map((e) => e!);
  }

  kanaToCards(kana: string[][]) {
    return kana.map((entry) =>
      ReviewCard.create("Reading", entry[0], [entry[1]])
    );
  }
}

export const database = new Database();

export function generateCards(entries: Array<Array<string>>): ReviewCard[] {
  return entries.map((entry) =>
    ReviewCard.create("Reading", entry[0], [entry[1]])
  );
}
