var trans_txt = document.getElementById("trans_txt");
var user_txt = document.getElementById("user_txt");

function UpdateTranslation() {
    // console.log("Update Triggered");
    // console.log(user_txt.value);
    trans_txt.innerHTML = user_txt.value;
}