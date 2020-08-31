var trans_txt = document.getElementById("trans_txt");
var user_txt = document.getElementById("user_txt");
var lang = document.getElementById("translator");

lang.addEventListener('click', function(event) {
    UpdateTranslation()
})

function UpdateTranslation() {
    // console.log("Update Triggered");
    // console.log(user_txt.value);
    // console.log(lang.value);
    var text = Translate(user_txt.value);
    trans_txt.textContent = text;
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
        case 'crillify':
            return Crillify(txt);
            break;
        default:
            console.log("Check the lang.value is properly typed in the html or called in this script");
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
    cyrillic_translit = {
        '\u0410': 'A',
        '\u0430': 'a',
        '\u0411': 'B',
        '\u0431': 'b',
        '\u0412': 'V',
        '\u0432': 'v',
        '\u0413': 'G',
        '\u0433': 'g',
        '\u0414': 'D',
        '\u0434': 'd',
        '\u0415': 'E',
        '\u0435': 'e',
        '\u0416': 'Zh',
        '\u0436': 'zh',
        '\u0417': 'Z',
        '\u0437': 'z',
        '\u0418': 'I',
        '\u0438': 'i',
        '\u0419': 'I',
        '\u0439': 'i',
        '\u041a': 'K',
        '\u043a': 'k',
        '\u041b': 'L',
        '\u043b': 'l',
        '\u041c': 'M',
        '\u043c': 'm',
        '\u041d': 'N',
        '\u043d': 'n',
        '\u041e': 'O',
        '\u043e': 'o',
        '\u041f': 'P',
        '\u043f': 'p',
        '\u0420': 'R',
        '\u0440': 'r',
        '\u0421': 'S',
        '\u0441': 's',
        '\u0422': 'T',
        '\u0442': 't',
        '\u0423': 'U',
        '\u0443': 'u',
        '\u0424': 'F',
        '\u0444': 'f',
        '\u0425': 'Kh',
        '\u0445': 'kh',
        '\u0426': 'Ts',
        '\u0446': 'ts',
        '\u0427': 'Ch',
        '\u0447': 'ch',
        '\u0428': 'Sh',
        '\u0448': 'sh',
        '\u0429': 'Shch',
        '\u0449': 'shch',
        '\u042a': '"',
        '\u044a': '"',
        '\u042b': 'Y',
        '\u044b': 'y',
        '\u042c': "'",
        '\u044c': "'",
        '\u042d': 'E',
        '\u044d': 'e',
        '\u042e': 'Iu',
        '\u044e': 'iu',
        '\u042f': 'Ia',
        '\u044f': 'ia'
    }
    result = txt.replace(/[a-z]/gi, m => cyrillic_translit[m]);
}

function copyToClipboard() {
    var text = trans_txt.textContent;

    if (window.clipboardData && window.clipboardData.setData) {
        // Internet Explorer-specific code path to prevent textarea being shown while dialog is visible.
        return clipboardData.setData("Text", text);

    } else if (document.queryCommandSupported && document.queryCommandSupported("copy")) {
        var textarea = document.createElement("textarea");
        textarea.textContent = text;
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