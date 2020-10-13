const canvas = document.getElementById('HalloweenCanvas');
const c = canvas.getContext('2d');

var bound_rect = canvas.getBoundingClientRect();
canvas.width = window.innerWidth - bound_rect.x;
canvas.height = window.innerHeight - bound_rect.y;

// for resizing need to make var
const x_mid = canvas.width / 2;
const y_mid = canvas.height / 2;

// for testing canvas size. delete when dynamic sizing fully tested.
// c.fillStyle = 'red'
// c.fillRect(0, 0, canvas.width, canvas.height)

const mouse = {
    x: innerWidth / 2,
    y: innerHeight / 2
}

class Zipper {
    constructor() {
        this.width = 10;
        this.draggable = false;
        this.max_x = canvas.width * .9;
        this.min_x = canvas.width * .1;;
        this.x_pos = canvas.width * .9;
    }
}
var zip = new Zipper();

addEventListener('mousedown', (event) => {
    console.log("mousedown");
    var rect = canvas.getBoundingClientRect();

    mouse.x = (event.clientX - rect.left) / (rect.right - rect.left) * canvas.width;
    mouse.y = (event.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height;
    TouchingSlider();
})

addEventListener('mouseup', (event) => {
    console.log("mouseup");
    zip.draggable = false;
})

addEventListener('mousemove', (event) => {
    if (zip.draggable) {
        console.log("mousemove while draggable");
        var rect = canvas.getBoundingClientRect();

        mouse.x = (event.clientX - rect.left) / (rect.right - rect.left) * canvas.width;
        mouse.y = (event.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height;
        VerifyZipPos(mouse.x);
    }
})

// Mouse move for mobile
// Currently no testing for mobile
canvas.ontouchstart = function (event) {
    console.log("mobile touch");
    event.preventDefault();
    var rect = canvas.getBoundingClientRect();
    mouse.x = (event.touches[0].clientX - rect.left) / (rect.right - rect.left) * canvas.width;
    mouse.y = (event.touches[0].clientY - rect.top) / (rect.bottom - rect.top) * canvas.height;
    // TouchingSlider();
}

function initZipper() {
    c.strokeStyle = "white";
    c.beginPath();
    c.moveTo(canvas.width * .1, y_mid);
    c.lineTo(canvas.width * .9, y_mid);
    c.stroke();

    // prolly mod this for dynamic sizes
    DrawZipTeeth(8, 15);
    // will need to figure out ratio to make this dyanamic size. doesnt need to be perfect tho
    DrawZipSlider(zip.x_pos);
}

// once mouth opens i might need a zipper class that keeps track of each init pos
function DrawZipTeeth(nZips, hash_height) {
    nZips += 2; // for extra width on edge
    const zip_width = canvas.width * .8 / nZips;
    var zip_x;

    c.strokeStyle = "white";
    c.lineWidth = 3;
    for (var iZip = 1; iZip < nZips; iZip++) {
        zip_x = canvas.width * .1 + iZip * zip_width;

        c.beginPath();
        c.moveTo(zip_x, y_mid + hash_height / 2);
        c.lineTo(zip_x, y_mid - hash_height / 2);
        c.stroke();
    }

}

// TODO with no angle or x pos
function DrawZipSlider(x_pos) {
    x_pos -= zip.width / 2;
    c.fillStyle = "white";
    c.fillRect(x_pos, y_mid, zip.width, zip.width * 3);

    const x_circle_center = x_pos + zip.width / 2; // will change with angle stuff
    const y_circle_center = y_mid + zip.width * 3 + 3;
    c.beginPath();
    c.arc(x_circle_center, y_circle_center, zip.width / 2, 0, 2 * Math.PI);
    c.stroke();

}

// will need to account for the angle
function TouchingSlider() {
    if ((mouse.x >= zip.x_pos - zip.width / 2) && (mouse.x <= zip.x_pos + zip.width / 2)) {
        // currently zipper height harcoded
        if ((mouse.y >= y_mid) && (mouse.y <= y_mid + zip.width * 4)) {
            // console.log(mouse.x + " , " + mouse.y);
            zip.draggable = true;
        }
    }
    // zip.draggable = false;
}

// makes sure the slidder doesnt extend beyond zipper bounds
function VerifyZipPos(x) {
    if (x < zip.min_x) {
        zip.x_pos = zip.min_x;
    }
    else if (x > zip.max_x) {
        zip.x_pos = zip.max_x;
    }
    else {
        zip.x_pos = mouse.x;
    }
}

function animate() {
    console.log(zip.draggable);
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height)
    c.fillStyle = "white";

    initZipper();
    // DrawZipSlider(zip.x_pos);

    requestAnimationFrame(animate);
}


initZipper();
animate();
