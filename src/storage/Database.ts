import Card from "./Card";

const vocabular = new Map<string, any[]>();
{
  function set(key: string, reading: string, meaning: string[]) {
    if (vocabular.has(key)) { console.error("Duplicate in the dababase: " + key); }
    vocabular.set(key, [key, reading, meaning]);
  }

  set("私", "わたし", ["me", "i"]);
  set("誰", "だれ", ["who"]);
  set("何", "なに", ["what"]);
  set("名前", "なまえ", ["name"]);
  set("友達", "ともだち", ["friend"]);
  set("先生", "せんせい", ["teacher"]);
  set("学生", "がくせい", ["student"]);
  set("お母さん", "おかあさん", ["mother"]);
  set("お父さん", "おとうさん", ["father"]);
  set("おじいさん", "おじいさん", ["grandfather", "grandpa"]);
  set("おばあさん", "おばあさん", ["grapndmother", "grandma"]);
  set("兄", "あに", ["older brother"]);
  set("妹", "いもうと", ["younger sister"]);
  set("家族", "かぞく", ["family"]);
  set("日本語", "にほんご", ["japanese", "japanese language"]);
  set("大人", "おとな", ["adult"]);
  set("一人", "ひとり", ["one person", "alone"]);
  set("人工", "じんこう", ["artificial"]);
  set("大きい", "おおきい", ["big"]);
  set("下", "した", ["down"]);
  set("八", "はち", ["eight"]);
  set("八つ", "やっつ", ["eight things"]);
  set("入り口", "いりぐち", ["entrance", "enter"]);
  set("大した", "たいした", ["important"]);
  set("山", "やま", ["mountain"]);
  set("口", "くち", ["mouth"]);
  set("ふじ山", "ふじさん", ["mountain fuji", "fuji"]);
  set("九", "く", ["nine"]);
  set("色", "いろ", ["color"]);

  /*
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
  */
}

const monographs = [
  ["あ", "a" ], ["い", "i"  ], ["う", "u"  ], ["え", "e" ], ["お", "o" ], // 4
  ["か", "ka"], ["き", "ki" ], ["く", "ku" ], ["け", "ke"], ["こ", "ko"], // 9
  ["さ", "sa"], ["し", "shi"], ["す", "su" ], ["せ", "se"], ["そ", "so"], // 14
  ["た", "ta"], ["ち", "chi"], ["つ", "tsu"], ["て", "te"], ["と", "to"], // 19
  ["な", "na"], ["に", "ni" ], ["ぬ", "nu" ], ["ね", "ne"], ["の", "no"], // 24
  ["は", "ha"], ["ひ", "hi" ], ["ふ", "fu" ], ["へ", "he"], ["ほ", "ho"], // 29
  ["ま", "ma"], ["み", "mi" ], ["む", "mu" ], ["め", "me"], ["も", "mo"], // 34
  ["や", "ya"], ["ゆ", "yu" ], ["よ", "yo" ], // 37
  ["ら", "ra"], ["り", "ri" ], ["る", "ru" ], ["れ", "re"], ["ろ", "ro"], // 42
  ["わ", "wa"], ["を", "wo" ], // 44
  ["ん", "n" ], // 45
];

const diacritics = [
  ["が", "ga"], ["ぎ", "gi"], ["ぐ", "gu"], ["げ", "ge"], ["ご", "go"],
  ["ざ", "za"], ["じ", "ji"], ["ず", "zu"], ["ぜ", "ze"], ["ぞ", "zo"],
  ["だ", "da"], ["ぢ", "ji"], ["づ", "zu"], ["で", "de"], ["ど", "do"],
  ["ば", "ba"], ["び", "bi"], ["ぶ", "bu"], ["べ", "be"], ["ぼ", "bo"],
  ["ぱ", "pa"], ["ぴ", "pi"], ["ぷ", "pu"], ["ぺ", "pe"], ["ぽ", "po"],
];

const monographs_digraphs = [
  ["きゃ", "kya"], ["きゅ", "kyu"], ["きょ", "kyo"],
  ["しゃ", "sha"], ["しゅ", "shu"], ["しょ", "sho"],
  ["ちゃ", "cha"], ["ちゅ", "chu"], ["ちょ", "cho"],
  ["にゃ", "nya"], ["にゅ", "nyu"], ["にょ", "nyo"],
  ["ひゃ", "hya"], ["ひゅ", "hyu"], ["ひょ", "hyo"],
  ["みゃ", "mya"], ["みゅ", "myu"], ["みょ", "myo"],
  ["りゃ", "rya"], ["りゅ", "ryu"], ["りょ", "ryo"],
];

const diacritics_digraphs = [
  ["ぎゃ", "gya"], ["ぎゅ", "gyu"], ["ぎょ", "gyo"],
  ["じゃ", "jya"], ["じゅ", "jyu"], ["じょ", "jyo"],
  ["ぢゃ", "jya"], ["ぢゅ", "jyu"], ["ぢょ", "jyo"],
  ["びゃ", "bya"], ["びゅ", "byu"], ["びょ", "byo"],
  ["ぴゃ", "pya"], ["ぴゅ", "pyu"], ["ぴょ", "pyo"],
];

const katakana_monographs = [
  ["ア", "a"], ["イ", "i"], ["ウ", "u"], ["エ", "e"], ["オ", "o"], // 4
  ["カ", "ka"], ["キ", "ki"], ["ク", "ku"], ["ケ", "ke"], ["コ", "ko"], // 9
  ["サ", "sa"], ["シ", "shi"], ["ス", "su"], ["セ", "se"], ["ソ", "so"], // 14
  ["タ", "ta"], ["チ", "chi"], ["ツ", "tsu"], ["テ", "te"], ["ト", "to"], // 19
  ["ナ", "na"], ["ニ", "ni"], ["ヌ", "nu"], ["ネ", "ne"], ["ノ", "no"], // 24
  ["ハ", "ha"], ["ヒ", "hi"], ["フ", "fu"], ["ヘ", "he"], ["ホ", "ho"], // 29
  ["マ", "ma"], ["ミ", "mi"], ["ム", "mu"], ["メ", "me"], ["モ", "mo"], // 34
  ["ヤ", "ya"], ["ユ", "yu"], ["ヨ", "yo"], // 37
  ["ラ", "ra"], ["リ", "ri"], ["ル", "ru"], ["レ", "re"], ["ロ", "ro"], // 42
  ["ワ", "wa"], ["ヲ", "wo"], // 44
  ["ン", "n"], // 45
];

const katakana_digraphs = [
  ["キャ", "kya"], ["キュ", "kyu"], ["キョ", "kyo"],
  ["シャ", "sha"], ["シュ", "shu"], ["ショ", "sho"],
  ["チャ", "cha"], ["チュ", "chu"], ["チョ", "cho"],
  ["ニャ", "nya"], ["ニュ", "nyu"], ["ニョ", "nyo"],
  ["ヒャ", "hya"], ["ヒュ", "hyu"], ["ヒョ", "hyo"],
  ["ミャ", "mya"], ["ミュ", "myu"], ["ミョ", "myo"],
  ["リャ", "rya"], ["リュ", "ryu"], ["リョ", "ryo"],
];

const katakana_diacritics = [
  ["ガ", "ga"], ["ギ", "gi"], ["グ", "gu"], ["ゲ", "ge"], ["ゴ", "go"],
  ["ザ", "za"], ["ジ", "ji"], ["ズ", "zu"], ["ゼ", "ze"], ["ゾ", "zo"],
  ["ダ", "da"], ["ヂ", "ji"], ["ヅ", "zu"], ["デ", "de"], ["ド", "do"],
  ["バ", "ba"], ["ビ", "bi"], ["ブ", "bu"], ["ベ", "be"], ["ボ", "bo"],
  ["パ", "pa"], ["ピ", "pi"], ["プ", "pu"], ["ペ", "pe"], ["ポ", "po"],
];

const katakana_diacritics_digraphs = [
  ["ギャ", "gya"], ["ギュ", "gyu"], ["ギョ", "gyo"],
  ["ジャ", "jya"], ["ジュ", "jyu"], ["ジョ", "jyo"],
  ["ヂャ", "jya"], ["ヂュ", "jyu"], ["ヂョ", "jyo"],
  ["ビャ", "bya"], ["ビュ", "byu"], ["ビョ", "byo"],
  ["ピャ", "pya"], ["ピュ", "pyu"], ["ピョ", "pyo"],
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

const jlpt_l1_vocabular = [
  "私", "誰", "何", "名前",
  "友達", "先生", "学生",
  "お母さん", "お父さん", "おじいさん",
  "おばあさん", "兄", "妹",
  "家族", "日本語", "大きい",
  "色", "入口", "上", "内", "円", "大人",
  "女", "女の子", "川", "木", "北",
  "下さい", "口", "下", "上手",
  "〜人", "千", "外", "大切",
  "食べる"
]

export const database = {
  hiragana: {
    alphabet: {
      a: monographs.slice(0, 5),
      ka: monographs.slice(5, 10),
      sa: monographs.slice(10, 15),
      ta: monographs.slice(15, 20),
      na: monographs.slice(20, 25),
      ha: monographs.slice(25, 30),
      ma: monographs.slice(30, 35),
      ya: monographs.slice(35, 38),
      ra: monographs.slice(38, 43),
      wa: monographs.slice(43, 45),
      n: monographs.slice(45, 46)
    },
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
    alphabet: {
      a: katakana_monographs.slice(0, 5),
      ka: katakana_monographs.slice(5, 10),
      sa: katakana_monographs.slice(10, 15),
      ta: katakana_monographs.slice(15, 20),
      na: katakana_monographs.slice(20, 25),
      ha: katakana_monographs.slice(25, 30),
      ma: katakana_monographs.slice(30, 35),
      ya: katakana_monographs.slice(35, 38),
      ra: katakana_monographs.slice(38, 43),
      wa: katakana_monographs.slice(43, 45),
      n: katakana_monographs.slice(45, 46)
    },
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
    wanikani: [ wanikani_l1_vocabular, wanikani_l2_vocabular ],
    jlpt: [ jlpt_l1_vocabular ]
  },

  vocabToCards: (words: string[]) => {
    const added = new Set<string>();
    return words.map(k => {
      if (added.has(k)) { console.error("Duplicate in the same table: " + k); }
      added.add(k);

      const entry = vocabular.get(k);
      if (entry) { return Card.create(0, entry[0] as string, entry[1] as string); }
      else { console.error("Word is not in the database: " + k); }

      return undefined;
    }).filter(e => e).map(e => e!);
  },

  kanaToCards: (kana: string[][]) => {
    return kana.map(entry => Card.create(0, entry[0], entry[1]));
  }
};


export function generateCards(entries: Array<Array<string>>): Card[] {
  return entries.map(entry => Card.create(0, entry[0], entry[1]));
}
