// resize_canvas();

const def_size = 3;
const grow_size = 7;
const sense_dist = 50;
mag = 5; // magnify condensed font to pixel (TODO this should be based on user window size with min)

const canvas = document.getElementById('WelcomeCanvas');
const ctx = canvas.getContext('2d');
// size by default first so the text can be recorded then coverted to pixels
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
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

const y_shift = 40;
const x_shift = y_shift;

ctx.fillStyle = 'white';
ctx.font = '30px Verdana';
ctx.fillText('WELCOME TO', x_shift, y_shift); // message, x coord to start painting, y 
ctx.font = 'bold 39px Verdana';
let second_row_shift = y_shift + 30 + 20; // shift 30 for 30 px and 20 spacer between nl
ctx.fillText('WHIPPLE', x_shift, second_row_shift); // TODO need it to be based on user screen ^^ same as above todo

// getImageData (tl corner x, y, width x, height y)
ctx.strokeStyle = 'white';
ctx.strokeRect(0,0,300,100); //for seeing the getImageData area
const txt_coord = ctx.getImageData(0, 0, 300, 100); // looks in given area

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

function init() {
    let max_x = 0;
    let max_y = 0;
    particleArray = [];
    // canvas is transparent so only text is color based in txt_coord
    
    let alpha_inc = 0;
    for (let y = 0, y2 = txt_coord.height; y < y2; y++)
    {
        for (let x = 0, x2 = txt_coord.width; x < x2; x++)
        {
            
            // if (txt_coord.data[ (y*4*txt_coord.width)+(x*4) + 3 ] > 128)
            if (txt_coord.data[alpha_inc + 3] > 128)
            {
                // let positionX = x;
                // let positionY = y;
                particleArray.push(new Particle(x * mag, y * mag));

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

    canvas.width = max_x * mag;
    canvas.height = max_y * mag;
}

init();

function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particleArray.length; i++)
    {
        particleArray[i].draw();
        particleArray[i].update();
    }
    requestAnimationFrame(animate);
}

animate();
