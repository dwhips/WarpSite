const def_size = 3;
const grow_size = 7;
const sense_dist = 200;
mag = 5; // magnify condensed font to pixel (TODO this should be based on user window size with min)

const canvas = document.getElementById('WelcomeCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let particleArray = [];

// handle mouse
const mouse = {
    x: null,
    y: null,
    radius: 150 //particle react area
}

window.addEventListener('mousemove', function(event){
    mouse.x = event.x;
    mouse.y = event.y;
    // console.log(mouse.x, mouse.y);
});

const y_top_shift = 40;
ctx.fillStyle = 'white';
ctx.font = '30px Verdana';
ctx.fillText('WELCOME TO', 2, y_top_shift); // message, x, y shift of canvas , max width
ctx.font = 'bold 35px Verdana';
ctx.fillText(' WHIPPLE', 2, y_top_shift *2.5); // TODO need it to be based on user screen ^^ same as above todo

// getImageData (tl corner x, y, width x, height y)
ctx.strokeStyle = 'white';
ctx.strokeRect(0,0,220,100); //for seeing the getImageData area
const txt_coord = ctx.getImageData(0, 0, 220, 100); // looks in given area

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
            }
            alpha_inc += 4;
        }
    }
}

init();
console.log(particleArray);

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
