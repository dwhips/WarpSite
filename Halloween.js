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
        this.height = this.width * 4;
        this.draggable = false;
        this.max_x = canvas.width * .9;
        this.min_x = canvas.width * .1;;
        this.x_pos = canvas.width * .9;
        this.slider_angle = 0;
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
        // VerifyZipPos(mouse.x);
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
    c.moveTo(zip.min_x, y_mid);
    c.lineTo(zip.max_x, y_mid);
    c.stroke();

    // prolly mod this for dynamic sizes
    DrawZipTeeth(8, 15);
    // will need to figure out ratio to make this dyanamic size. doesnt need to be perfect tho
    DrawZipSlider(zip.x_pos);
}

// once mouth opens i might need a zipper class that keeps track of each init pos
function DrawZipTeeth(nZips, hash_height) {
    nZips += 2; // for extra width on edge
    const zip_width = (zip.max_x - zip.min_x) / nZips;
    var zip_x;

    c.strokeStyle = "white";
    c.lineWidth = 3;
    for (var iZip = 1; iZip < nZips; iZip++) {
        zip_x = zip.min_x + iZip * zip_width;

        c.beginPath();
        c.moveTo(zip_x, y_mid + hash_height / 2);
        c.lineTo(zip_x, y_mid - hash_height / 2);
        c.stroke();
    }
}


function DrawZipSlider(x_pos) {
    x_pos -= zip.width / 2;
    c.fillStyle = "white";

    c.translate(zip.x_pos, y_mid)
    c.rotate(zip.slider_angle);// * Math.PI/180);
    // c.fillRect(x_pos, y_mid, zip.width, zip.width * 3);
    c.fillRect(-zip.width / 2, 0, zip.width, zip.width * 3);
    c.rotate(-zip.slider_angle);// * Math.PI/180);
    c.translate(-zip.x_pos, -y_mid)

    var coord = CordFromAngle(zip.slider_angle + 90 * Math.PI / 180, zip.height - 6, zip.x_pos, y_mid)
    // const x_circle_center = x_pos + zip.width / 2; // will change with angle stuff
    // const y_circle_center = y_mid + zip.width * 3 + 3;
    c.beginPath();
    c.arc(coord[0], coord[1], zip.width / 2, 0, 2 * Math.PI);
    c.stroke();
}

// Checks if mouse position is clicking on zipper
function TouchingSlider() {
    // draw invisible path around zipper
    var x_pos = zip.x_pos - zip.width / 2;
    c.fillStyle = "transparent";

    c.translate(zip.x_pos, y_mid)
    c.rotate(zip.slider_angle);
    c.beginPath();
    c.rect(-zip.width / 2, 0, zip.width, zip.width * 4); // 4 instead of 3 to account for circle
    c.rotate(-zip.slider_angle);
    c.translate(-zip.x_pos, -y_mid)

    if (c.isPointInPath(mouse.x, mouse.y))
        zip.draggable = true;

    c.stroke; // not sure if needed, but might mess up future iterations without
}

// makes sure the slidder doesnt extend beyond zipper bounds and calculates angles for stuff
function VerifyZipPos() {
    // for left bound      TODO need a little spice now angle is added
    if (zip.draggable) {
        console.log('mod position');
        const x = mouse.x;
        zip.slider_angle = Angle2Mouse(zip.x_pos, y_mid) + 90 * Math.PI / 180;
        if (x < zip.min_x - zip.height) {
            zip.x_pos = zip.min_x;
        }
        // for right bound
        else if (x > zip.max_x + zip.height) {
            zip.x_pos = zip.max_x;
        }
        // within moving angle of slider but not moving it
        else if (Math.abs(mouse.x - zip.x_pos) <= zip.height) {
            // and 90* cos i have zipper down not pointing right, so relative angle should be 90* not 0*
            // zip.slider_angle = Angle2Mouse(zip.x_pos, y_mid) + 90 * Math.PI / 180;
        }
        else {
            // zip.slider_angle = Angle2Mouse(zip.x_pos, y_mid) + 90 * Math.PI / 180;
            if (mouse.x < zip.x_pos) {
                zip.x_pos = mouse.x + zip.height;
            }
            else {
                zip.x_pos = mouse.x - zip.height;
            }
        }
    }
    else {
        // Pendulum();
    }
}

function Dist2Mouse(x, y) {
    const x1 = x - mouse.x;
    const y1 = y - mouse.y;
    return Math.sqrt(x1 * x1 + y1 * y1);
}

function Angle2Mouse(x, y) {
    return Math.atan2(y - mouse.y, x - mouse.x);
}

function CordFromAngle(ang, dist, x1, y1) {
    var x = Math.round(Math.cos(ang) * dist + x1);
    var y = Math.round(Math.sin(ang) * dist + y1);
    return [x, y];
}

// its gotta be written in a way that it isnt running when user clicks

// // im using pseudo gravity, lets see if it looks good
// function Pendulum()
// {
//     var add_sub = 1;
//     var new_coord;
//     var x2;
//     var angle_shift;
//     for(var i_fall = 0; i_fall < 4; i_fall++)
//     {
//         x2 = 1.1;
//         // if i did reall gravity i could account for frame count but why
//         for(i_step = 0; i_step < 100; i_step++)
//         {
//             x2 *= x2;
//             if(i_fall%2 == 1)
//             {
//                 add_sub *= -1;
//             }

//             angle_shift =  add_sub*x2 /10;

//             new_coord = CordFromAngle(zip.slider_angle+angle_shift * Math.PI / 180, zip.height, zip.x_pos, y_mid);

//         }
//     }
// }

function animate() {
    // console.log(zip.draggable);
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height)
    c.fillStyle = "white";

    initZipper();
    VerifyZipPos();
    // DrawZipSlider(zip.x_pos);
    requestAnimationFrame(animate);
}

animate();