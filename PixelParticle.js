// resize_canvas();

const def_size = 3;
const grow_size = 7;
const sense_dist = 50;
mag = 5; // magnify condensed font to pixel (TODO this should be based on user window size with min)

const canvas = document.getElementById('WelcomeCanvas');
// size by default first so the text can be recorded then coverted to pixels
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d');
let particleArray = [];

// handle mouse
const mouse = {
    x: null,
    y: null,
    radius: 150 //particle react area
}
console.log('This is canvas shift y');
console.log(canvas.getBoundingClientRect());
// shift by canvas position x and y, dont use aboslute location
const bound_rect = canvas.getBoundingClientRect();

window.addEventListener('mousemove', function(event){
    mouse.x = event.x - bound_rect.x;
    mouse.y = event.y - bound_rect.y;
    // console.log(mouse.x, mouse.y);
});


const y_shift = bound_rect.y;
const x_shift = bound_rect.x;
console.log("x: " + bound_rect.x);
console.log("y: " + bound_rect.y);

ctx.fillStyle = 'white';
ctx.textAlign = "center";
ctx.font = '30px Verdana';
ctx.fillText('WELCOME TO', canvas.width/2, canvas.height/2 - 30/2); // message, x coord to start painting, y 
ctx.font = 'bold 39px Verdana';
let second_row_shift = y_shift + 30; // shift 30 for 30 px and 20 spacer between nl
ctx.fillText('WHIPPLE', canvas.width/2, canvas.height/2 + 39/2);

const txt_coord = ctx.getImageData(0, 0, canvas.width, canvas.height);
// const min_rect_x_y = getCanvasTextSize(ctx);


// // getImageData (tl corner x, y, width x, height y)
ctx.strokeStyle = 'red';
ctx.strokeRect(0,0,canvas.width, canvas.height); //for seeing the getImageData area



//     // TODO delete me
//     // canvas.width = max_x * mag + x_shift;
//     // canvas.height = max_y * mag + y_shift;
//     canvas.width = min_rect_x_y[0] * mag;
//     canvas.height = min_rect_x_y[1] * mag;


class Particle {
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.size = def_size;
        this.baseX = this.x;
        this.baseY = this.y;
        this.density = (Math.random() * 30) + 1; //give random weight
    }
    draw(){
        ctx.fillStyle = 'white';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
    }
    update()
    {
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let dist = Math.sqrt(dy*dy + dx*dx);
        let forceDirectionX = dx / dist;
        let forceDirectionY = dy / dist;
        let maxDist = mouse.radius;
        let force = (maxDist - dist) / maxDist;
        let directionX = forceDirectionX * force * this.density;
        let directionY = forceDirectionY * force * this.density;

        if(dist < mouse.radius)
        {
            this.x -= directionX;
            this.y -= directionY;
            this.size = grow_size;
        }
        else
        {
            if (this.x != this.baseX)
            {
                let dx = this.x - this.baseX;
                this.x -= dx/10; // touch up
            }
            if (this.y != this.baseY)
            {
                let dy = this.y - this.baseY;
                this.y -= dy/10; // touch up
            }
            this.size = def_size;
        }
    }
}

// shows the bounds of a canvas croped as rect around text. 
// top left is always [0 0] and bottom right is cropped to fit all detected text
function maxCanvasTextSize(canvas2D)
{
// using canvas obviously makes this a little less protable. not worth fixing tho
// const txt_coord = canvas2D.getImageData(0, 0, canvas.width, canvas.height);

    let max_x = 0;
    let max_y = 0;
    particleArray = [];
    // canvas is transparent so only text is color based in txt_coord
    
    let alpha_inc = 0;
    for (let y = 0, y2 = txt_coord.height; y < y2; y++)
    {
        for (let x = 0, x2 = txt_coord.width; x < x2; x++)
        {
            if (txt_coord.data[alpha_inc + 3] > 128)
            {

                if (x > max_x)
                {
                    max_x = x;
                }
                if (y > max_y)
                {
                    max_y = y;
                }
            }
            alpha_inc += 4;
        }
    }
    return [max_x, max_y];
}

function minCanvasTextSize(canvas2D)
{
// using canvas obviously makes this a little less protable. not worth fixing tho
// const txt_coord = canvas2D.getImageData(0, 0, canvas.width, canvas.height);

    let min_x = txt_coord.width;
    let min_y = txt_coord.height;
    particleArray = [];
    // canvas is transparent so only text is color based in txt_coord
    
    let alpha_inc = 0;
    for (let y = 0, y2 = txt_coord.height; y < y2; y++)
    {
        for (let x = 0, x2 = txt_coord.width; x < x2; x++)
        {
            if (txt_coord.data[alpha_inc + 3] > 128)
            {

                if (x < min_x)
                {
                    min_x = x;
                }
                if (y < min_y)
                {
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
    // xy_min = minCanvasTextSize(ctx);
    // xy_max = minCanvasTextSize(ctx);
    // let x_diff = xy_max[0]-xy_min[0];
    // let y_diff = xy_max[1]-xy_min[1];
    // let xy_shift = [ x_diff/2 + xy_min[0], y_diff/2 + xy_min[1] ]

    let alpha_inc = 0;
    for (let y = 0; y < txt_coord.height; y++)
    {
        for (let x = 0; x < txt_coord.width; x++)
        {
            // if pixel detected
            if (txt_coord.data[alpha_inc + 3] > 128)
            {
                // let positionX = x;
                // let positionY = y;
                let px = x;// * mag + xy_min[0] * mag;
                let py = x;// * mag + xy_min[1] * mag;
                particleArray.push(new Particle(x , y));
            }
            alpha_inc += 4;
        }
    }
}

function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particleArray.length; i++)
    {
        particleArray[i].draw();
        particleArray[i].update();
    }
    requestAnimationFrame(animate);
}


initParticles();
animate();
