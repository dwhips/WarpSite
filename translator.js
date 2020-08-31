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
    trans_txt.innerHTML = text;
}

function Translate(txt) {
    switch (lang.value) {
        case 'normal':
            return txt;
            break;
        case 'backwards':
            console.log("In Backwards");
            return Reverse(txt);
            break;
        case 'zalgo':
            return Zalgofy(txt);
            break;
        case 'worm':
            return Wormify(txt);
            break;
        default:
            console.log("Check the lang.value is properly typed in the html or called in this script");
    }
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
        text[i] += '\u0303' + '\u02F7' + '\u0334' + '\u0360';
    }
    //Putting back together
    pzalg = '';
    for (var i = 0; i < text.length; i++) {
        pzalg += text[i];
    }
    return pzalg;
}