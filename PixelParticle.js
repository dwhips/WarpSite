// This centers 'Welcome to \nWHIPPLE' text in a canvas and adds moving particle effect to it
// a lot of the code is from Franks laboratory at https://www.youtube.com/watch?v=XGioNBHrFU4&feature=youtu.be

const canvas = document.getElementById('WelcomeCanvas');
const ctx = canvas.getContext('2d');
const bound_rect = canvas.getBoundingClientRect();
canvas.width = window.innerWidth - bound_rect.x;
canvas.height = window.innerHeight - bound_rect.y;


let particleArray = [];
const def_size = 3; // default circle size
const grow_size = 5; // size of circle within range
const sense_dist = 125; // range of mouse
mag = 5; // magnify condensed font to pixel

// handle mouse
const mouse = {
    x: null,
    y: null,
    radius: sense_dist //particle react area
}

window.addEventListener('mousemove', function (event) {
    // shift by canvas position x and y, dont use aboslute location
    mouse.x = event.x - bound_rect.x + window.pageXOffset;
    mouse.y = event.y - bound_rect.y + window.pageYOffset;
    // TODO bug for when screen size is rescaled
    // mouse.x = Math.floor( mouse.x / canvas.width * 100);
    // mouse.y = Math.floor( mouse.y / canvas.width * 100);
    // console.log(mouse.x, mouse.y);
});

ctx.fillStyle = 'white';
ctx.textAlign = "center";
ctx.font = '30px Tahoma';
ctx.fillText('WELCOME TO', canvas.width/2, canvas.height/2 - 30/2 -5); // message, x coord to start painting, y 
ctx.font = 'bold 39px Tahoma';
ctx.fillText('WHIPPLE', canvas.width /2, canvas.height/2 + 39/2 +5);

const txt_coord = ctx.getImageData(0, 0, canvas.width, canvas.height);

class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = def_size;
        this.baseX = this.x;
        this.baseY = this.y;
        this.density = (Math.random() * 30) + 1; //give random weight
    }
    draw() {
        ctx.fillStyle = 'white';
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
        }
        else {
            if (this.x != this.baseX) {
                let dx = this.x - this.baseX;
                this.x -= dx / 10; // touch up
            }
            if (this.y != this.baseY) {
                let dy = this.y - this.baseY;
                this.y -= dy / 10; // touch up
            }
            this.size = def_size;
        }
    }
}

// shows the bounds of a canvas croped as rect around text. 
// top left is always [0 0] and bottom right is cropped to fit all detected text
function maxCanvasTextSize(canvas2D) {
    // const txt_coord = canvas2D.getImageData(0, 0, canvas.width, canvas.height);

    let max_x = 0;
    let max_y = 0;
    // canvas is transparent so only text is color based in txt_coord

    let alpha_inc = 0;
    for (let y = 0, y2 = txt_coord.height; y < y2; y++) {
        for (let x = 0, x2 = txt_coord.width; x < x2; x++) {
            if (txt_coord.data[alpha_inc + 3] > 128) {

                if (x > max_x) {
                    max_x = x;
                }
                if (y > max_y) {
                    max_y = y;
                }
            }
            alpha_inc += 4;
        }
    }
    return [max_x, max_y];
}

function minCanvasTextSize(canvas2D) {
    // using canvas obviously makes this a little less protable. not worth fixing tho
    // const txt_coord = canvas2D.getImageData(0, 0, canvas.width, canvas.height);

    let min_x = txt_coord.width;
    let min_y = txt_coord.height;
    // canvas is transparent so only text is color based in txt_coord

    let alpha_inc = 0;
    for (let y = 0, y2 = txt_coord.height; y < y2; y++) {
        for (let x = 0, x2 = txt_coord.width; x < x2; x++) {
            if (txt_coord.data[alpha_inc + 3] > 128) {

                if (x < min_x) {
                    min_x = x;
                }
                if (y < min_y) {
                    min_y = y;
                }
            }
            alpha_inc += 4;
        }
    }
    return [min_x, min_y];
}

function initParticles() {
    particleArray = [];
    // canvas is transparent so only text is color based in txt_coord
    let xy_min = minCanvasTextSize(ctx);

    let alpha_inc = 0;
    for (let y = 0; y < txt_coord.height; y++) {
        for (let x = 0; x < txt_coord.width; x++) {
            // if pixel detected
            if (txt_coord.data[alpha_inc + 3] > 128) {
                // this conversion is to maintain psositive numbers when scaling
                // not convinved it centers it perfectly
                let px = x * mag - xy_min[0] * mag;
                let py = y * mag - xy_min[1] * mag;
                particleArray.push(new Particle(px + xy_min[0] / 2, py + xy_min[1] / 2));
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
    requestAnimationFrame(animate);

    ctx.strokeStyle = 'red';
    ctx.strokeRect(0, 0, canvas.width, canvas.height);
}

initParticles();
animate();
