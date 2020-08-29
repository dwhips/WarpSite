var button = document.getElementById("gbl_button");
var og_width = button.style.width;
var og_height = button.style.height;
console.log(og_width);
console.log(og_height);

function buttonClicked() {
    incGlobalClicker();
    // ButtonEffect();
}

function incGlobalClicker() {
    var cnt = button.innerHTML;
    cnt = parseFloat(cnt);
    cnt++;
    button.innerHTML = cnt.toString();
}

// function ButtonEffect() {
//     Grow();
//     ResetSize();
// }

// function Grow() {
//     button.style.width = '500px';
// }

// function ResetSize() {

// }

function _initButton() {
    // get gbl count
    var count = 0;
    button.innerHTML = count.toString();
}

_initButton();