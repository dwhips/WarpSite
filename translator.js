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
            console.log("In Normal");
            return txt;
            break;
        case 'backwards':
            console.log("In Backwards");
            return Reverse(txt);
            break;
        default:
            console.log("Check the lang.value is properly typed in the html or called in this script");
    }
    return txt;
}

function Reverse(s) {
    return s.split("").reverse().join("");
}