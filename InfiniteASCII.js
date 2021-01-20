function ExtendLadder(n) {
    for (var i = 0; i < n; ++i) {
        document.getElementById('monkey').innerHTML += " ||======|| " + PopulateStar() + "\n";
        document.getElementById('monkey').innerHTML += " ||      || " + PopulateStar() + "\n";
        document.getElementById('monkey').innerHTML += " ||      || " + PopulateStar() + "\n";
    }
}

// for when i want to add more visual spice to the page
// also possibly save how far users go down and add ascii text like ----- this is average user scroll

// Uses perlin noise to generate nice plots of star shapes
function PopulateStar() {
    return ""; // TODO delete me and get this working. since i have 2 divs, i feel like maybe
    // i can have a left right div for the perlin noise stuff
    for (var i = 0; i < 25; i++) {
        if (Math.random() > .95) {
            // return AddStar();

        }
        // something like while (x < width - "    ||=====||")
    }
}

// Randomly selects star shape
function AddStar() {
    // * . +
    switch (getRandomInt(0, 3)) {
        case 0:
            return "*";
        case 1:
            return ".";
        case 2:
            return "+";
        case 3:
            return "o";
        default:
            return "";
    }
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

window.onscroll = function(ev) {
    if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight) {
        //alert("you're at the bottom of the page");

        ExtendLadder(25);

    }
};

ExtendLadder(25);

// // Add a check for if the page is too zoomed out at the start
// function CheckSmallPage() {
//     var i = 0;
//     while (!CheckScrollable() && i < 20) {
//         ExtendLadder(1);
//         i++;
//     }
// }

// // very buggy
// function CheckScrollable() {
//     // var scrollHeight = document.body.scrollHeight;
//     // var clientHeight = document.documentElement.clientHeight;
//     var hasScrollbar = window.innerWidth > document.documentElement.clientHeight
//     console.log(hasScrollbar);
//     // return scrollHeight > clientHeight;
//     return hasScrollbar;
// }

// CheckSmallPage();