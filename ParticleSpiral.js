// mostly sourced from https://www.youtube.com/watch?v=5MUsKgU6i0I&ab_channel=ChrisCourses

const canvas = document.getElementById('particle_spiral');
const c = canvas.getContext('2d');

// var generate_spirals = true;

// canvas.width = innerWidth;
// canvas.height = innerHeight;


const mouse = {
    x: innerWidth / 2,
    y: innerHeight / 2
}

// TODO reak out to helper js file
// function isMobile() { return ('ontouchstart' in document.documentElement); }

addEventListener('mousemove', (event) => {
    var rect = canvas.getBoundingClientRect();

    mouse.x = (event.clientX - rect.left) / (rect.right - rect.left) * canvas.width;
    mouse.y = (event.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height;
})

// Mouse move for mobile
canvas.ontouchstart = function (event) {
    event.preventDefault();
    var rect = canvas.getBoundingClientRect();
    mouse.x = (event.touches[0].clientX - rect.left) / (rect.right - rect.left) * canvas.width;
    mouse.y = (event.touches[0].clientY - rect.top) / (rect.bottom - rect.top) * canvas.height;
}

canvas.ontouchmove = function (event) {
    event.preventDefault();
    var rect = canvas.getBoundingClientRect();
    mouse.x = (event.touches[0].clientX - rect.left) / (rect.right - rect.left) * canvas.width;
    mouse.y = (event.touches[0].clientY - rect.top) / (rect.bottom - rect.top) * canvas.height;
}

addEventListener('resize', () => {
    var rect = canvas.getBoundingClientRect();
    canvas.width = window.innerWidth - rect.x;
    canvas.height = window.innerHeight - rect.y;
    init()
})

// Objects
class Particle {
    constructor(x, y, radius, color, velocity) {
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
        this.velocity = velocity
        this.ttl = 1000
    }

    draw() {
        c.beginPath()
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        c.fillStyle = this.color
        c.fill()
        c.closePath()
    }

    update() {
        this.draw()
        this.x += this.velocity.x
        this.y += this.velocity.y
        this.ttl--
    }
}

// Implementation
let particles
function init() {
    particles = []

    var bound_rect = canvas.getBoundingClientRect();
    canvas.width = window.innerWidth - bound_rect.x;
    canvas.height = window.innerHeight - bound_rect.y;
}

let hue = 0
let hueRadians = 0
function generateRing() {
    // if (generate_spirals) {
        setTimeout(generateRing, 200)
        hue = Math.sin(hueRadians)

        const particleCount = 100

        for (let i = 0; i < particleCount; i++) {
            // full circle = pi * 2 radians
            const radian = (Math.PI * 2) / particleCount
            const x = mouse.x
            const y = mouse.y
            particles.push(
                new Particle(x, y, 5, `hsl(${Math.abs(hue * 360)}, 50%, 50%)`, {
                    x: Math.cos(radian * i) * 3,
                    y: Math.sin(radian * i) * 3
                })
            )
        }
    // }
    hueRadians += 0.01

}

// Animation Loop
function animate() {
    requestAnimationFrame(animate)
    c.fillStyle = 'rgba(0, 0, 0, 0.1)'
    c.fillRect(0, 0, canvas.width, canvas.height)
    let rad = 5*2; // hardcode i know

    particles.forEach((particle, i) => {

        if (particle.x < -1*canvas.width*.1 || particle.x > canvas.width*1.1) {
            particles.splice(i, 1)
        }
        else if (particle.y < 0 || particle.y > canvas.height) {
            particles.splice(i, 1)
        }
        // timer kill just in case
        else if (particle.ttl < 0) {
            particles.splice(i, 1)
        }
        else {
            particle.update()
        }
    })
}

init()
animate()
generateRing()
