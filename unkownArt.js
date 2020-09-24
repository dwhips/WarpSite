// this is the first art page that ive done without a demo project/guide
var canvas = document.getElementById('doodle')
var ctx = canvas.getContext('2d')
// var offset_height = document.getElementById("header").offsetHeight;

var bound_rect = canvas.getBoundingClientRect();
canvas.width = window.innerWidth - bound_rect.x;
canvas.height = window.innerHeight - bound_rect.y;

var x_center = canvas.width / 2;
var y_center = canvas.height / 2;
var radius = canvas.width * .25;

if (canvas.width > canvas.height) {
    radius = canvas.height * .25;
}

ctx.strokeStyle = "#FF0000";
ctx.beginPath();
ctx.arc(x_center, y_center, radius, 0, 2 * Math.PI);
ctx.stroke();

// angle in rads
function GetCircleAngleXY(angle, radius, x_center, y_center) {
    var x = Math.cos(angle) * radius;
    var y = Math.sin(angle) * radius;
    return [x + x_center, y + y_center];
}

var n_angles = 100;
var angle_step = 2 * Math.PI / n_angles;
for (var i_angle = 0; i_angle < 2 * Math.PI; i_angle = i_angle + angle_step) {
    var pos = GetCircleAngleXY(i_angle, radius, x_center, y_center)
    ctx.strokeStyle = "#FF0000";
    ctx.beginPath();
    ctx.arc(pos[0], pos[1], 3, 0, 2 * Math.PI);
    ctx.stroke();
}

// Animation Loop
function animate() {
    requestAnimationFrame(animate)
}

// init()
animate();