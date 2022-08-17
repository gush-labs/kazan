import Card from "./Card";

const monographs = [
  ["あ", "a"], // 0
  ["い", "i"],
  ["う", "u"],
  ["え", "e"],
  ["お", "o"], // 4

  ["か", "ka"], // 5
  ["き", "ki"],
  ["く", "ku"],
  ["け", "ke"],
  ["こ", "ko"], // 9

  ["さ", "sa"], // 10
  ["し", "shi"],
  ["す", "su"],
  ["せ", "se"],
  ["そ", "so"], // 14

  ["た", "ta"], // 15
  ["ち", "chi"],
  ["つ", "tsu"],
  ["て", "te"],
  ["と", "to"], // 19

  ["な", "na"], // 20
  ["に", "ni"],
  ["ぬ", "nu"],
  ["ね", "ne"],
  ["の", "no"], // 24

  ["は", "ha"], // 25
  ["ひ", "hi"],
  ["ふ", "fu"],
  ["へ", "he"],
  ["ほ", "ho"], // 29

  ["ま", "ma"], // 30
  ["み", "mi"],
  ["む", "mu"],
  ["め", "me"],
  ["も", "mo"], // 34

  ["や", "ya"], // 35
  ["ゆ", "yu"],
  ["よ", "yo"], // 37

  ["ら", "ra"], // 38
  ["り", "ri"],
  ["る", "ru"],
  ["れ", "re"],
  ["ろ", "ro"], // 42

  ["わ", "wa"], // 43
  ["を", "wo"], // 44

  ["ん", "n"], // 45
];

const diacritics = [
  ["が", "ga"],
  ["ぎ", "gi"],
  ["ぐ", "gu"],
  ["げ", "ge"],
  ["ご", "go"],

  ["ざ", "za"],
  ["じ", "ji"],
  ["ず", "zu"],
  ["ぜ", "ze"],
  ["ぞ", "zo"],

  ["だ", "da"],
  ["ぢ", "ji"],
  ["づ", "zu"],
  ["で", "de"],
  ["ど", "do"],

  ["ば", "ba"],
  ["び", "bi"],
  ["ぶ", "bu"],
  ["べ", "be"],
  ["ぼ", "bo"],

  ["ぱ", "pa"],
  ["ぴ", "pi"],
  ["ぷ", "pu"],
  ["ぺ", "pe"],
  ["ぽ", "po"],
];

const monographs_digraphs = [
  ["きゃ", "kya"],
  ["きゅ", "kyu"],
  ["きょ", "kyo"],

  ["しゃ", "sha"],
  ["しゅ", "shu"],
  ["しょ", "sho"],

  ["ちゃ", "cha"],
  ["ちゅ", "chu"],
  ["ちょ", "cho"],

  ["にゃ", "nya"],
  ["にゅ", "nyu"],
  ["にょ", "nyo"],

  ["ひゃ", "hya"],
  ["ひゅ", "hyu"],
  ["ひょ", "hyo"],

  ["みゃ", "mya"],
  ["みゅ", "myu"],
  ["みょ", "myo"],

  ["りゃ", "rya"],
  ["りゅ", "ryu"],
  ["りょ", "ryo"],
];

const diacritics_digraphs = [
  ["ぎゃ", "gya"],
  ["ぎゅ", "gyu"],
  ["ぎょ", "gyo"],

  ["じゃ", "jya"],
  ["じゅ", "jyu"],
  ["じょ", "jyo"],

  ["ぢゃ", "jya"],
  ["ぢゅ", "jyu"],
  ["ぢょ", "jyo"],

  ["びゃ", "bya"],
  ["びゅ", "byu"],
  ["びょ", "byo"],

  ["ぴゃ", "pya"],
  ["ぴゅ", "pyu"],
  ["ぴょ", "pyo"],
];

const katakana_monographs = [
  ["ア", "a"], // 0
  ["イ", "i"],
  ["ウ", "u"],
  ["エ", "e"],
  ["オ", "o"], // 4

  ["カ", "ka"], // 5
  ["キ", "ki"],
  ["ク", "ku"],
  ["ケ", "ke"],
  ["コ", "ko"], // 9

  ["サ", "sa"], // 10
  ["シ", "shi"],
  ["ス", "su"],
  ["セ", "se"],
  ["ソ", "so"], // 14

  ["タ", "ta"], // 15
  ["チ", "chi"],
  ["ツ", "tsu"],
  ["テ", "te"],
  ["ト", "to"], // 19

  ["ナ", "na"], // 20
  ["ニ", "ni"],
  ["ヌ", "nu"],
  ["ネ", "ne"],
  ["ノ", "no"], // 24

  ["ハ", "ha"], // 25
  ["ヒ", "hi"],
  ["フ", "fu"],
  ["ヘ", "he"],
  ["ホ", "ho"], // 29

  ["マ", "ma"], // 30
  ["ミ", "mi"],
  ["ム", "mu"],
  ["メ", "me"],
  ["モ", "mo"], // 34

  ["ヤ", "ya"], // 35
  ["ユ", "yu"],
  ["ヨ", "yo"], // 37

  ["ラ", "ra"], // 38
  ["リ", "ri"],
  ["ル", "ru"],
  ["レ", "re"],
  ["ロ", "ro"], // 42

  ["ワ", "wa"], // 43
  ["ヲ", "wo"], // 44

  ["ン", "n"], // 45
];

const katakana_digraphs = [
  ["キャ", "kya"],
  ["キュ", "kyu"],
  ["キョ", "kyo"],

  ["シャ", "sha"],
  ["シュ", "shu"],
  ["ショ", "sho"],

  ["チャ", "cha"],
  ["チュ", "chu"],
  ["チョ", "cho"],

  ["ニャ", "nya"],
  ["ニュ", "nyu"],
  ["ニョ", "nyo"],

  ["ヒャ", "hya"],
  ["ヒュ", "hyu"],
  ["ヒョ", "hyo"],

  ["ミャ", "mya"],
  ["ミュ", "myu"],
  ["ミョ", "myo"],

  ["リャ", "rya"],
  ["リュ", "ryu"],
  ["リョ", "ryo"],
];

const katakana_diacritics = [
  ["ガ", "ga"],
  ["ギ", "gi"],
  ["グ", "gu"],
  ["ゲ", "ge"],
  ["ゴ", "go"],

  ["ザ", "za"],
  ["ジ", "ji"],
  ["ズ", "zu"],
  ["ゼ", "ze"],
  ["ゾ", "zo"],

  ["ダ", "da"],
  ["ヂ", "ji"],
  ["ヅ", "zu"],
  ["デ", "de"],
  ["ド", "do"],

  ["バ", "ba"],
  ["ビ", "bi"],
  ["ブ", "bu"],
  ["ベ", "be"],
  ["ボ", "bo"],

  ["パ", "pa"],
  ["ピ", "pi"],
  ["プ", "pu"],
  ["ペ", "pe"],
  ["ポ", "po"],
];

const katakana_diacritics_digraphs = [
  ["ギャ", "gya"],
  ["ギュ", "gyu"],
  ["ギョ", "gyo"],

  ["ジャ", "jya"],
  ["ジュ", "jyu"],
  ["ジョ", "jyo"],

  ["ヂャ", "jya"],
  ["ヂュ", "jyu"],
  ["ヂョ", "jyo"],

  ["ビャ", "bya"],
  ["ビュ", "byu"],
  ["ビョ", "byo"],

  ["ピャ", "pya"],
  ["ピュ", "pyu"],
  ["ピョ", "pyo"],
];

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

export const database = {
  hiragana: {
    /*
    alphabet: {
      a: monographs.splice(0, 5),
      ka: monographs.splice(5, 5),
      sa: monographs.splice(10, 5),
      ta: monographs.splice(15, 5),
      na: monographs.splice(20, 5),
      ha: monographs.splice(25, 5),
      ma: monographs.splice(30, 5),
      ya: monographs.splice(35, 3),
      ra: monographs.splice(38, 5),
      wa: monographs.splice(43, 2),
      n: monographs.splice(45, 1)
    },
    */
    monographs: {
      main: monographs,
      digraphs: monographs_digraphs,
      all: monographs.concat(monographs_digraphs),
    },
    diacritics: {
      main: diacritics,
      digraphs: diacritics_digraphs,
      all: diacritics.concat(diacritics_digraphs),
    },
    all: monographs
      .concat(monographs_digraphs)
      .concat(diacritics)
      .concat(diacritics_digraphs),
  },
  katakana: {
    /*
    alphabet: {
      a: katakana_monographs.splice(0, 5),
      ka: katakana_monographs.splice(5, 5),
      sa: katakana_monographs.splice(10, 5),
      ta: katakana_monographs.splice(15, 5),
      na: katakana_monographs.splice(20, 5),
      ha: katakana_monographs.splice(25, 5),
      ma: katakana_monographs.splice(30, 5),
      ya: katakana_monographs.splice(35, 3),
      ra: katakana_monographs.splice(38, 5),
      wa: katakana_monographs.splice(43, 2),
      n: katakana_monographs.splice(45, 1)
    },
    */
    monographs: {
      main: katakana_monographs,
      digraphs: katakana_digraphs,
      all: katakana_monographs.concat(katakana_digraphs),
    },
    diacritics: {
      main: katakana_diacritics,
      digraphs: katakana_diacritics_digraphs,
      all: katakana_diacritics.concat(katakana_diacritics_digraphs),
    },
    all: katakana_monographs
      .concat(katakana_digraphs)
      .concat(katakana_diacritics)
      .concat(katakana_diacritics_digraphs),
  },
  kanji: {
    numbers: {
      kanji: kanji_numbers,
      arabic: arabic_numbers,
      things: kanji_numbers_days
        .concat(kanji_numbers)
        .concat(kanji_numbers_month)
        .concat(kanji_numbers_people),
    },
    wanikani: [wanikani_l1_vocabular, wanikani_l2_vocabular],
  },
};

export function generateCards(entries: Array<Array<string>>): Card[] {
  const result: Card[] = [];
  entries.forEach((entry) => result.push(Card.create(0, entry[0], entry[1])));
  return result;
}
