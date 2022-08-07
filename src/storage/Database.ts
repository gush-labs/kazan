
const monographs = [
  [ "あ", "a" ],
  [ "い", "i" ],
  [ "う", "u" ],
  [ "え", "e" ],
  [ "お", "o" ],

  [ "か", "ka" ],
  [ "き", "ki" ],
  [ "く", "ku" ],
  [ "け", "ke" ],
  [ "こ", "ko" ],

  [ "さ", "sa" ],
  [ "し", "shi" ],
  [ "す", "su" ],
  [ "せ", "se" ],
  [ "そ", "so" ],

  [ "た", "ta" ],
  [ "ち", "chi" ],
  [ "つ", "tsu" ],
  [ "て", "te" ],
  [ "と", "to" ],

  [ "な", "na" ],
  [ "に", "ni" ],
  [ "ぬ", "nu" ],
  [ "ね", "ne" ],
  [ "の", "no" ],

  [ "は", "ha" ],
  [ "ひ", "hi" ],
  [ "ふ", "fu" ],
  [ "へ", "he" ],
  [ "ほ", "ho" ],

  [ "ま", "ma" ],
  [ "み", "mi" ],
  [ "む", "mu" ],
  [ "め", "me" ],
  [ "も", "mo" ],

  [ "や", "ya" ],
  [ "ゆ", "yu" ],
  [ "よ", "yo" ],

  [ "ら", "ra" ],
  [ "り", "ri" ],
  [ "る", "ru" ],
  [ "れ", "re" ],
  [ "ろ", "ro" ],

  [ "わ", "wa" ],
  [ "を", "wo" ],

  [ "ん", "n" ],
]

const diacritics = [
  [ "が", "ga"],
  [ "ぎ", "gi"],
  [ "ぐ", "gu"],
  [ "げ", "ge"],
  [ "ご", "go"],
  
  [ "ざ", "za"],
  [ "じ", "ji"],
  [ "ず", 'zu'],
  [ "ぜ", 'ze'],
  [ "ぞ", 'zo'],

  [ "だ", 'da'],
  [ "ぢ", "ji"],
  [ "づ", 'zu'],
  [ "で", 'de'],
  [ "ど", 'do'],

  [ "ば", "ba"],
  [ "び", 'bi'],
  [ "ぶ", 'bu'],
  [ "べ", 'be'],
  [ "ぼ", "bo"],

  [ "ぱ", 'pa'],
  [ "ぴ", 'pi'],
  [ "ぷ", 'pu'],
  [ "ぺ", 'pe'],
  [ "ぽ", 'po'],
]

const monographs_digraphs = [
  ["きゃ", "kya"],
  ["きゅ", "kyu"],
  ["きょ", 'kyo'],

  ["しゃ", 'sha'],
  ["しゅ", "shu"],
  ["しょ", 'sho'],

  ["ちゃ", 'cha'],
  ["ちゅ", 'chu'],
  ["ちょ", 'cho'],

  ["にゃ", 'nya'],
  ["にゅ", 'nyu'],
  ["にょ", 'nyo'],

  ["ひゃ", 'hya'],
  ["ひゅ", 'hyu'],
  ["ひょ", 'hyo'],

  ["みゃ", 'mya'],
  ["みゅ", 'myu'],
  ["みょ", 'myo'],

  ["りゃ", 'rya'],
  ["りゅ", 'ryu'],
  ["りょ", 'ryo'],
]

const diacritics_digraphs = [
  ["ぎゃ", 'gya'],
  ["ぎゅ", 'gyu'],
  ["ぎょ", 'gyo'],

  ["じゃ", 'jya'],
  ["じゅ", 'jyu'],
  ["じょ", 'jyo'],

  ["ぢゃ", 'jya'],
  ["ぢゅ", 'jyu'],
  ["ぢょ", 'jyo'],

  ["びゃ", 'bya'],
  ["びゅ", 'byu'],
  ["びょ", 'byo'],

  ["ぴゃ", "pya"],
  ["ぴゅ", "pyu"],
  ["ぴょ", 'pyo'],
]

const katakana_monographs = [
  [ "ア", "a" ],
  [ "イ", "i" ],
  [ "ウ", "u" ],
  [ "エ", "e" ],
  [ "オ", "o" ],

  [ "カ", "ka" ],
  [ "キ", "ki" ],
  [ "ク", "ku" ],
  [ "ケ", "ke" ],
  [ "コ", "ko" ],

  [ "サ", "sa" ],
  [ "シ", "shi" ],
  [ "ス", "su" ],
  [ "セ", "se" ],
  [ "ソ", "so" ],

  [ "タ", "ta" ],
  [ "チ", "chi" ],
  [ "ツ", "tsu" ],
  [ "テ", "te" ],
  [ "ト", "to" ],

  [ "ナ", "na" ],
  [ "ニ", "ni" ],
  [ "ヌ", "nu" ],
  [ "ネ", "ne" ],
  [ "ノ", "no" ],

  [ "ハ", "ha" ],
  [ "ヒ", "hi" ],
  [ "フ", "fu" ],
  [ "ヘ", "he" ],
  [ "ホ", "ho" ],

  [ "マ", "ma" ],
  [ "ミ", "mi" ],
  [ "ム", "mu" ],
  [ "メ", "me" ],
  [ "モ", "mo" ],

  [ "ヤ", "ya" ],
  [ "ユ", "yu" ],
  [ "ヨ", "yo" ],

  [ "ラ", "ra" ],
  [ "リ", "ri" ],
  [ "ル", "ru" ],
  [ "レ", "re" ],
  [ "ロ", "ro" ],

  [ "ワ", "wa" ],
  [ "ヲ", "wo" ],

  [ "ン", "n" ],
]

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
]

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
]

const wanikani_l1_vocabular = [
  ["大人", "おとな"],
  ["一人", "ひとり"],
  ["人工", "じんこう"],
  ["大きい", "おおきい"],
  ["下", "した"],
  ["八", "はち"],
  ["八つ", "やっつ"],
  ["入り口","いりぐち"],
  ["大した","たいした"],
  ["山","やま"],
  ["口","くち"],
  ["ふじ山","ふじさん"],
  ["九","く"],
  ["九つ","ここのつ"],
  ["一","いち"],
  ["一つ","ひとつ"],
  ["人","ひと"],
  ["下さい","ください"],
  ["人口","じんこう"],
  ["力","ちから"],
  ["川","かわ"],
  ["七","なな"],
  ["七つ","ななつ"],
  ["大きさ","おおきさ"],
  ["十","じゅう"],
  ["三","さん"],
  ["三人","さんにん"],
  ["三つ","みっつ"],
  ["入る","はいる"],
  ["上げる","あげる"],
  ["下げる","さげる"],
  ["二","に"],
  ["二人","ふたり"],
  ["二つ","ふたつ"],
  ["上","うえ"],
  ["力いっぱい","ちからいっぱい"],
  ["女","おんな"],
];

const database = {
  hiragana: {
    monographs: {
      main: monographs,
      digraphs: monographs_digraphs, 
      all: monographs.concat(monographs_digraphs)
    },
    diacritics: {
      main: diacritics,
      digraphs: diacritics_digraphs,
      all: diacritics.concat(diacritics_digraphs)
    },
    all: monographs.concat(monographs_digraphs).concat(diacritics).concat(diacritics_digraphs),
  },
  katakana: {
    monographs: {
      main: katakana_monographs,
      digraphs: katakana_digraphs,
      all: katakana_monographs.concat(katakana_digraphs)
    },
    diacritics: {
      main: katakana_diacritics,
      digraphs: katakana_diacritics_digraphs,
      all: katakana_diacritics.concat(katakana_diacritics_digraphs)
    },
    all: katakana_monographs.concat(katakana_digraphs).concat(katakana_diacritics).concat(katakana_diacritics_digraphs),
  },
  wanikani: {
    words: [ 
      wanikani_l1_vocabular,
    ]
  }
}

export default database;