const monographs = [
  ["あ", "a"],
  ["い", "i"],
  ["う", "u"],
  ["え", "e"],
  ["お", "o"], // 4
  ["か", "ka"],
  ["き", "ki"],
  ["く", "ku"],
  ["け", "ke"],
  ["こ", "ko"], // 9
  ["さ", "sa"],
  ["し", "shi"],
  ["す", "su"],
  ["せ", "se"],
  ["そ", "so"], // 14
  ["た", "ta"],
  ["ち", "chi"],
  ["つ", "tsu"],
  ["て", "te"],
  ["と", "to"], // 19
  ["な", "na"],
  ["に", "ni"],
  ["ぬ", "nu"],
  ["ね", "ne"],
  ["の", "no"], // 24
  ["は", "ha"],
  ["ひ", "hi"],
  ["ふ", "fu"],
  ["へ", "he"],
  ["ほ", "ho"], // 29
  ["ま", "ma"],
  ["み", "mi"],
  ["む", "mu"],
  ["め", "me"],
  ["も", "mo"], // 34
  ["や", "ya"],
  ["ゆ", "yu"],
  ["よ", "yo"], // 37
  ["ら", "ra"],
  ["り", "ri"],
  ["る", "ru"],
  ["れ", "re"],
  ["ろ", "ro"], // 42
  ["わ", "wa"],
  ["を", "wo"], // 44
  ["ん", "n"], // 45
];

const diacritics = [
  ["が", "ga"],
  ["ぎ", "gi"],
  ["ぐ", "gu"],
  ["げ", "ge"],
  ["ご", "go"], // 4
  ["ざ", "za"],
  ["じ", "ji"],
  ["ず", "zu"],
  ["ぜ", "ze"],
  ["ぞ", "zo"], // 9
  ["だ", "da"],
  ["ぢ", "ji"],
  ["づ", "zu"],
  ["で", "de"],
  ["ど", "do"], // 14
  ["ば", "ba"],
  ["び", "bi"],
  ["ぶ", "bu"],
  ["べ", "be"],
  ["ぼ", "bo"], // 19
  ["ぱ", "pa"],
  ["ぴ", "pi"],
  ["ぷ", "pu"],
  ["ぺ", "pe"],
  ["ぽ", "po"], // 24
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
  ["ア", "a"],
  ["イ", "i"],
  ["ウ", "u"],
  ["エ", "e"],
  ["オ", "o"], // 4
  ["カ", "ka"],
  ["キ", "ki"],
  ["ク", "ku"],
  ["ケ", "ke"],
  ["コ", "ko"], // 9
  ["サ", "sa"],
  ["シ", "shi"],
  ["ス", "su"],
  ["セ", "se"],
  ["ソ", "so"], // 14
  ["タ", "ta"],
  ["チ", "chi"],
  ["ツ", "tsu"],
  ["テ", "te"],
  ["ト", "to"], // 19
  ["ナ", "na"],
  ["ニ", "ni"],
  ["ヌ", "nu"],
  ["ネ", "ne"],
  ["ノ", "no"], // 24
  ["ハ", "ha"],
  ["ヒ", "hi"],
  ["フ", "fu"],
  ["ヘ", "he"],
  ["ホ", "ho"], // 29
  ["マ", "ma"],
  ["ミ", "mi"],
  ["ム", "mu"],
  ["メ", "me"],
  ["モ", "mo"], // 34
  ["ヤ", "ya"],
  ["ユ", "yu"],
  ["ヨ", "yo"], // 37
  ["ラ", "ra"],
  ["リ", "ri"],
  ["ル", "ru"],
  ["レ", "re"],
  ["ロ", "ro"], // 42
  ["ワ", "wa"],
  ["ヲ", "wo"], // 44
  ["ン", "n"], // 45
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

const katakana_monographs_digraphs = [
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

export const hiraganaData = {
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
    wa: monographs.slice(43, 46),

    ga: diacritics.slice(0, 5),
    za: diacritics.slice(5, 10),
    da: diacritics.slice(10, 15),
    ba: diacritics.slice(15, 20),
    pa: diacritics.slice(20, 25),

    kya: monographs_digraphs.slice(0, 3),
    sha: monographs_digraphs.slice(3, 6),
    cha: monographs_digraphs.slice(6, 9),
    nya: monographs_digraphs.slice(9, 12),
    hya: monographs_digraphs.slice(12, 15),
    mya: monographs_digraphs.slice(15, 18),
    rya: monographs_digraphs.slice(18, 21),

    gya: diacritics_digraphs.slice(0, 3),
    jya1: diacritics_digraphs.slice(3, 6),
    jya2: diacritics_digraphs.slice(6, 9),
    bya: diacritics_digraphs.slice(9, 12),
    pya: diacritics_digraphs.slice(12, 15),
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
};

export const katakanaData = {
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
    wa: katakana_monographs.slice(43, 46),

    ga: katakana_diacritics.slice(0, 5),
    za: katakana_diacritics.slice(5, 10),
    da: katakana_diacritics.slice(10, 15),
    ba: katakana_diacritics.slice(15, 20),
    pa: katakana_diacritics.slice(20, 25),

    kya: katakana_monographs_digraphs.slice(0, 3),
    sha: katakana_monographs_digraphs.slice(3, 6),
    cha: katakana_monographs_digraphs.slice(6, 9),
    nya: katakana_monographs_digraphs.slice(9, 12),
    hya: katakana_monographs_digraphs.slice(12, 15),
    mya: katakana_monographs_digraphs.slice(15, 18),
    rya: katakana_monographs_digraphs.slice(18, 21),

    gya: katakana_diacritics_digraphs.slice(0, 3),
    jya1: katakana_diacritics_digraphs.slice(3, 6),
    jya2: katakana_diacritics_digraphs.slice(6, 9),
    bya: katakana_diacritics_digraphs.slice(9, 12),
    pya: katakana_diacritics_digraphs.slice(12, 15),
  },
  monographs: {
    main: katakana_monographs,
    digraphs: katakana_monographs_digraphs,
    all: katakana_monographs.concat(katakana_monographs_digraphs),
  },
  diacritics: {
    main: katakana_diacritics,
    digraphs: katakana_diacritics_digraphs,
    all: katakana_diacritics.concat(katakana_diacritics_digraphs),
  },
  all: katakana_monographs
    .concat(katakana_monographs_digraphs)
    .concat(katakana_diacritics)
    .concat(katakana_diacritics_digraphs),
};
