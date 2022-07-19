// This centers 'Welcome to \nWHIPPLE' text in a canvas and adds moving particle effect to it
// a lot of the code is from Franks laboratory at https://www.youtube.com/watch?v=XGioNBHrFU4&feature=youtu.be

const canvas = document.getElementById('WelcomeCanvas');
const ctx = canvas.getContext('2d');

// TODO might need this to change when resize browser window
DrawCanvas();
// canvas.b

let particleArray = [];
const def_size = 3; // default circle size
const grow_size = 5; // size of circle within range
const sense_dist = 125 * (canvas.width / 1500); // range of mouse
mag = 5; // magnify condensed font to pixel

const Rgb_goal = 80;
const rGb_goal = 162;
const rgB_goal = 167;

const Rgb_rate = (255 - Rgb_goal) / 20;
const rGb_rate = (255 - rGb_goal) / 20;
const rgB_rate = (255 - rgB_goal) / 20;

txt_coord = DrawText('WELCOME TO', 'WHIPPLE');

var rect
let reset_bool = false

// handle mouse
const mouse = {
    x: null,
    y: null,
    radius: sense_dist //particle react area
}

// Mouse move for mobile
canvas.ontouchstart = function (event) {
    event.preventDefault();
    rect = canvas.getBoundingClientRect();
    SetMousePosition(event.touches[0].clientX, event.touches[0].clientY);
}

// TODO speed improvement, have isMobile to prevent on move
canvas.ontouchmove = function (event) {
    event.preventDefault();
    rect = canvas.getBoundingClientRect();
    SetMousePosition(event.touches[0].clientX, event.touches[0].clientY);
}

// Mouse move for desktop
addEventListener('mousemove', (event) => {
    rect = canvas.getBoundingClientRect();
    SetMousePosition(event.clientX, event.clientY);
})

addEventListener('resize', () => {
    //reset_bool = true
    DrawCanvas();
    txt_coord = DrawText('WELCOME TO', 'WHIPPLE');
    initParticles(true);
})

function SetMousePosition(clientX, clientY)
{
    mouse.x = (clientX - rect.left) / (rect.right - rect.left) * canvas.width;
    mouse.y = (clientY - rect.top) / (rect.bottom - rect.top) * canvas.height;
}

function DrawCanvas() {
    const bound_rect = canvas.getBoundingClientRect();
    canvas.width = window.innerWidth - bound_rect.x;
    canvas.height = window.innerHeight - bound_rect.y;   // TODO might want size to be a little less then flush to bottom
}

/* Draws text based on screen size. I fiddled with values to work for two strings, top string being a little longer than bottom string. (Only if you care about them being close to same length)
rate of change for font size is based off screen width. width of ~1500 uses font of 30px and 39px. min screen starting at 150 width is 10px and 13px. so every 150 width is 2px to 2.6px increase
*/
function DrawText(text_top, text_bottom) {
    // console.log(window.innerHeight + ": inner hight");
    // console.log(window.innerWidth + ": inner width");

    // 10*13 is minimum font size i want
    let top_font = 10;
    let bot_font = 13;
    let min_width = 600;
    let fontString = "px Tahoma";

    let width_ratio = canvas.width / min_width;
    // let top_ratio = (30 - top_font) / (1500 / min_width);
    // let bot_ratio = (39 - bot_font) / (1500 / min_width);
    top_font = width_ratio * top_font; // see function header for these rates
    bot_font = width_ratio * bot_font;



    var ctx = canvas.getContext('2d');
    ctx.fillStyle = 'white';
    // ctx.textBaseline = 'middle';
    ctx.textAlign = "center";

    if (canvas.width > min_width) {
        // get var for px sizing   30>
        ctx.font = top_font + fontString;
        ctx.fillText(text_top, canvas.width / 2, canvas.height / 2 - top_font / 2 - 5); // message, x coord to start painting, y 
        // get var for px sizing    39>
        ctx.font = 'bold ' + bot_font + fontString;
        ctx.fillText(text_bottom, canvas.width / 2, canvas.height / 2 + bot_font / 2 + 5);
    }
    else
    {
        // I hate this but so much is already hard coded. Will want to make text sizing entirely responsive.
        // This would be a good project to break out, make as an individual page with a lot more flexibility and then use updates in here.
        // Like drawing new particles on the screen. 
        let textSize = 30 + Math.ceil(canvas.width/50);

        ctx.font = 'bold ' + textSize + fontString;
        ctx.fillText("W", canvas.width / 2, canvas.height / 2);
    }

    return ctx.getImageData(0, 0, canvas.width, canvas.height);
}

class Particle {
    constructor(x, y, ix, iy) {
        this.x = x;
        this.y = y;
        this.ix = ix
        this.iy = iy
        this.size = def_size;
        this.baseX = this.x;
        this.baseY = this.y;
        this.density = (Math.random() * 30) + 1; //give random weight
        // I cant tell if the var names are genius or terrible
        this.Rgb = 255;
        this.rGb = 255;
        this.rgB = 255;
    }
    reset() {
        let center_width = canvas.width / 2;
                let center_height = canvas.height / 2;
                let x_diff = center_width - this.ix;
                let y_diff = center_height - this.iy;
                this.x = center_width - x_diff * mag;
                this.y = center_height - y_diff * mag;

    }
    draw() {
        ctx.fillStyle = "rgb(" + this.Rgb + "," + this.rGb + "," + this.rgB + ")";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
    }
    update() {
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let dist = Math.sqrt(dy * dy + dx * dx);
        let forceDirectionX = dx / dist;
        let forceDirectionY = dy / dist;
        let maxDist = mouse.radius;
        let force = (maxDist - dist) / maxDist;
        let directionX = forceDirectionX * force * this.density;
        let directionY = forceDirectionY * force * this.density;

        if (dist < mouse.radius) {
            this.x -= directionX;
            this.y -= directionY;
            this.size = grow_size;

            let pp = 100;

            if (this.Rgb > pp || this.rGb > pp || this.rgB > pp) {
                this.Rgb -= Rgb_rate;
                this.rGb -= rGb_rate;
                this.rgB -= rgB_rate;
            }
        } else {
            if (this.x != this.baseX) {
                let dx = this.x - this.baseX;
                this.x -= dx / 10; // touch up
            }
            if (this.y != this.baseY) {
                let dy = this.y - this.baseY;
                this.y -= dy / 10; // touch up
            }
            this.size = def_size;
            this.Rgb += Rgb_rate / 2;
            this.rGb += rGb_rate / 2;
            this.rgB += rgB_rate / 2;

            if (this.Rgb > 255 || this.rGb > 255 || this.rgB > 255) {
                this.Rgb = 255;
                this.rGb = 255;
                this.rgB = 255;
            }
        }
    }
}

// // shows the bounds of a canvas croped as rect around text. 
// // top left is always [0 0] and bottom right is cropped to fit all detected text
// function maxCanvasTextSize(canvas2D) {
//     // const txt_coord = canvas2D.getImageData(0, 0, canvas.width, canvas.height);

//     let max_x = 0;
//     let max_y = 0;
//     // canvas is transparent so only text is color based in txt_coord

//     let alpha_inc = 0;
//     for (let y = 0, y2 = txt_coord.height; y < y2; y++) {
//         for (let x = 0, x2 = txt_coord.width; x < x2; x++) {
//             if (txt_coord.data[alpha_inc + 3] > 128) {

//                 if (x > max_x) {
//                     max_x = x;
//                 }
//                 if (y > max_y) {
//                     max_y = y;
//                 }
//             }
//             alpha_inc += 4;
//         }
//     }
//     return [max_x, max_y];
// }

// init pixel position and add particle obj if push_particles = true
function initParticles(push_particles) {
    if (push_particles) particleArray = [];

    // canvas is transparent so only text is color based in txt_coord
    let alpha_inc = 0;
    for (let y = 0; y < txt_coord.height; y++) {
        for (let x = 0; x < txt_coord.width; x++) {
            // if pixel detected
            if (txt_coord.data[alpha_inc + 3] > 128) {

                // keep spacing relative to center line with the mag
                let center_width = canvas.width / 2;
                let center_height = canvas.height / 2;
                let x_diff = center_width - x;
                let y_diff = center_height - y;
                let px = center_width - x_diff * mag;
                let py = center_height - y_diff * mag;

                if (push_particles) particleArray.push(new Particle(px, py, x, y));
            }
            alpha_inc += 4;
        }
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particleArray.length; i++) {
        particleArray[i].draw();
        particleArray[i].update();            
    }
    // if(!reset_bool){
    //     for (let i = 0; i < particleArray.length; i++) {
    //         particleArray[i].draw();
    //         particleArray[i].update();
            
    //     }
    // }else{
    //     for (let i = 0; i < particleArray.length; i++) {
    //         canvas.width = window.innerWidth - bound_rect.x;
    //         canvas.height = window.innerHeight - bound_rect.y;

    //         console.log("Resize" + canvas.height + canvas.width)

    //         particleArray[i].reset();
    //         particleArray[i].draw();
    //         particleArray[i].update();
            
    //         txt_coord = DrawText('WELCOME TO', 'WHIPPLE')
    //         initParticles(false); //TODO new delete

    //         reset_bool = false
    //     }
    // }
    
    

    requestAnimationFrame(animate);

    ////debug canvas
    // ctx.strokeStyle = 'red';
    // ctx.strokeRect(0, 0, canvas.width, canvas.height);
}

initParticles(true);
animate();