var trans_txt = document.getElementById("trans_txt"); // translated text
var user_txt = document.getElementById("user_txt");
var lang = document.getElementById("translator");

var first_click = true;

// lang.addEventListener('click', function (event) {
//     UpdateTranslation();
// })
// lang.addEventListener('touch', function (event) {
//     UpdateTranslation();
// })

user_txt.addEventListener('click', function (event) {
    console.log(first_click);
    if (first_click) {
        user_txt.innerHTML  = "";
        trans_txt.innerHTML  = ""; // in case they translated the intro text
        first_click = false;
    }
    else
        trans_txt.innerHTML  = Translate(user_txt.value);
})

function UpdateTranslation() {
    // console.log("Update Triggered");
    // console.log(user_txt.value);
    // console.log(lang.value);
    trans_txt.innerHTML  = Translate(user_txt.value);
}

function Translate(txt) {
    switch (lang.value) {
        case 'backwards':
            // console.log("In Backwards");
            return Reverse(txt);
            break;
        case 'zalgo':
            return Zalgofy(txt);
            break;
        case 'worm':
            return Wormify(txt);
            break;
        case 'owo':
            return Owoify(txt);
            break;
        case 'cryllic':
            return Crillify(txt);
            break;
        default:
            console.log("Check the lang.value is properly typed in the html or called in this script. given val: ", lang.value);
    }
    // need a way so strings starting with "<" will still print
    return txt;
}

function Reverse(s) {
    return s.split("").reverse().join("");
}

//https://github.com/Alexime/Zalgo
function Zalgofy(pzalg) {
    var uni = ['\u0300',
        '\u0301', '\u0302', '\u0303', '\u0304', '\u0305', '\u0306', '\u0307', '\u0308', '\u0309', '\u0310',
        '\u0311', '\u0312', '\u0313', '\u0314', '\u0315', '\u0316', '\u0317', '\u0318', '\u0319', '\u0320',
        '\u0321', '\u0322', '\u0323', '\u0324', '\u0325', '\u0326', '\u0327', '\u0328', '\u0329', '\u0330',
        '\u0331', '\u0332', '\u0333', '\u0334', '\u0335', '\u0336', '\u0337', '\u0338', '\u0339', '\u0340',
        '\u0341', '\u0342', '\u0343', '\u0344', '\u0345', '\u0346', '\u0347', '\u0348', '\u0349', '\u0350',
        '\u0351', '\u0352', '\u0353', '\u0354', '\u0355', '\u0356', '\u0357', '\u0358', '\u0359', '\u0360',
        '\u036A', '\u036B', '\u036C', '\u036D', '\u036E', '\u036F'
    ];
    //Splitting into Parts
    var text = pzalg.split('');
    //Fun Bit
    for (var i = 0; i < text.length; i++) {
        var dcn = Math.round(Math.random() * 25) + 5;
        for (var j = 0; j < dcn; j++) {
            var dc = Math.round(Math.random() * 66);
            text[i] += uni[dc];
        }
    }
    //Putting back together
    pzalg = '';
    for (var i = 0; i < text.length; i++) {
        pzalg += text[i];
    }
    return pzalg;
}

//https://github.com/Alexime/Zalgo
function Wormify(pzalg) {
    var text = pzalg.split('');

    for (var i = 0; i < text.length; i++) {
        if (i != '\n') {
            text[i] += '\u0303' + '\u02F7' + '\u0334' + '\u0360';
        }
    }
    //Putting back together
    pzalg = '';
    for (var i = 0; i < text.length; i++) {
        pzalg += text[i];
    }
    return pzalg;
}

function Owoify(txt) {
    txt = txt.replace(/l/g, 'w');
    txt = txt.replace(/r/g, 'w');
    txt = txt.replace(/L/g, 'W');
    txt = txt.replace(/R/g, 'W');
    return txt;
}

function Crillify(txt) {
    const VaporMap = {
        " ": "　",
        "`": "`",
        "1": "１",
        "2": "２",
        "3": "３",
        "4": "４",
        "5": "５",
        "6": "６",
        "7": "７",
        "8": "８",
        "9": "９",
        "0": "０",
        "-": "－",
        "=": "＝",
        "~": "~",
        "!": "！",
        "@": "＠",
        "#": "＃",
        "$": "＄",
        "%": "％",
        "^": "^",
        "&": "＆",
        "*": "＊",
        "(": "（",
        ")": "）",
        "_": "_",
        "+": "＋",
        "q": "ｑ",
        "w": "ｗ",
        "e": "ｅ",
        "r": "ｒ",
        "t": "ｔ",
        "y": "ｙ",
        "u": "ｕ",
        "i": "ｉ",
        "o": "ｏ",
        "p": "ｐ",
        "[": "[",
        "]": "]",
        "\\": "\\",
        "Q": "Ｑ",
        "W": "Ｗ",
        "E": "Ｅ",
        "R": "Ｒ",
        "T": "Ｔ",
        "Y": "Ｙ",
        "U": "Ｕ",
        "I": "Ｉ",
        "O": "Ｏ",
        "P": "Ｐ",
        "{": "{",
        "}": "}",
        "|": "|",
        "a": "ａ",
        "s": "ｓ",
        "d": "ｄ",
        "f": "ｆ",
        "g": "ｇ",
        "h": "ｈ",
        "j": "ｊ",
        "k": "ｋ",
        "l": "ｌ",
        ";": "；",
        "'": "＇",
        "A": "Ａ",
        "S": "Ｓ",
        "D": "Ｄ",
        "F": "Ｆ",
        "G": "Ｇ",
        "H": "Ｈ",
        "J": "Ｊ",
        "K": "Ｋ",
        "L": "Ｌ",
        ":": "：",
        "z": "ｚ",
        "x": "ｘ",
        "c": "ｃ",
        "v": "ｖ",
        "b": "ｂ",
        "n": "ｎ",
        "m": "ｍ",
        ",": "，",
        ".": "．",
        "/": "／",
        "Z": "Ｚ",
        "X": "Ｘ",
        "C": "Ｃ",
        "V": "Ｖ",
        "B": "Ｂ",
        "N": "Ｎ",
        "M": "Ｍ",
        "<": "<",
        ">": ">",
        "?": "？"
    }
    return txt.replace(/[a-z]/gi, m => VaporMap[m]);
}

function copyToClipboard() {
    var text = trans_txt.innerHTML ;

    if (window.clipboardData && window.clipboardData.setData) {
        // Internet Explorer-specific code path to prevent textarea being shown while dialog is visible.
        return clipboardData.setData("Text", text);

    } else if (document.queryCommandSupported && document.queryCommandSupported("copy")) {
        var textarea = document.createElement("textarea");
        textarea.innerHTML  = text;
        textarea.style.position = "fixed"; // Prevent scrolling to bottom of page in Microsoft Edge.
        document.body.appendChild(textarea);
        textarea.select();
        try {
            return document.execCommand("copy"); // Security exception may be thrown by some browsers.
        } catch (ex) {
            console.warn("Copy to clipboard failed.", ex);
            return false;
        } finally {
            document.body.removeChild(textarea);
        }
    }
}

trans_txt.innerHTML  = Translate(user_txt.value);