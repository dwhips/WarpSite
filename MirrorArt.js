var canvas = document.getElementById('doodle')
var ctx = canvas.getContext('2d')

var bound_rect = canvas.getBoundingClientRect();
canvas.width = window.innerWidth - bound_rect.x;
canvas.height = window.innerHeight - bound_rect.y;

ctx.fillStyle = 'black'
ctx.fillRect(0, 0, canvas.width, canvas.height)

ctx.strokeStyle = 'red';
ctx.strokeRect(0, 0, canvas.width, canvas.height);

addEventListener('resize', () => {
    canvas.width = window.innerWidth - bound_rect.x;
    canvas.height = window.innerHeight - bound_rect.y;
})

//#region Math
function rand(min, max) {
    return Math.random() * (max - min) + min
}

function randInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

function radians_to_degrees(radians)
{
  var pi = Math.PI;
  return radians * (180/pi);
}
//#endregion

//#region Art
function GetMidlinePoints(xMin, yMin, xMax, yMax, isHorizontal){
    if (isHorizontal){
        return [[xMin, (yMax-yMin)/2], [xMax, (yMax-yMin)/2]]
    }
    return [[(xMax-xMin)/2], yMin, [[(xMax-xMin)/2]], yMax]
}

function DrawLine(x1, y1, x2, y2, ctx){
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
}

function DrawTriangle(x1, y1, x2, y2, height, ctx){
    var xFar, yFar
    xFar = Math.abs(x1 - x2)/2 + Math.min(x1, x2)
    yFar = y1 + height

    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(xFar, yFar);
    ctx.lineTo(x2, y2);
    ctx.stroke();
}

//function GrowingTriangle(isGrow) vs isShrink. call DrawTriangle with log height
// have global ratio controled by log that other shapes are ratio of height

//#endregion

//#region Drawing
function ResetCanvas(ctx){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    x1 = 0, y1 = 0
    x2 = canvas.width, y2 = canvas.height
    bothXyCoord = GetMidlinePoints(x1, y1, x2, y2, true)
    xy1 = bothXyCoord[0]
    xy2 = bothXyCoord[1]

    ctx.strokeStyle ='red'
    DrawLine(xy1[0], xy1[1], xy2[0], xy2[1], ctx)
}

var x1 = 0, y1 = 0
var x2 = canvas.width, y2 = canvas.height
var xy1, xy2
var bothXyCoord

// use cos^2 to go o to 1, period i think is pi
var timeTick = 0 // delete later? maybe i'll use this
var ntimeTickCycle = 100
var flip = true
var flipSign = -1

var maxHeight = canvas.height/2
var currentHeight = 0

var count = 20
var test, initstep = Math.PI / count
var step = initstep
for(i = 0; i < count; i++){
    step = step + initstep
//    test = radians_to_degrees( Math.pow(Math.cos(step), 2) )
    test = Math.pow(Math.cos(step), 2)
    console.log(test)
}
console.log("Done")
console.log("Should be 0: " + Math.pow(Math.cos(Math.PI/2), 2))

var steppps = Math.PI/ntimeTickCycle, stepTick = 0
// function animate() {
//     stepTick += steppps
//     timeTick++
//     currentHeight = radians_to_degrees(Math.pow(Math.cos(stepTick), 2) * maxHeight)
    

//     if (timeTick = ntimeTickCycle) timeTick = 0, stepTick = 0, console.log("flip") // TODO instead of time, make it if naheight reached

//     if (flip) flipSign*= -1

//     //console.log("flip" + flipSign + "    current: "+ currentHeight +"   max: " +  maxHeight)
//     ResetCanvas(ctx)
//     DrawTriangle(xy1[0], xy1[1], xy2[0], xy2[1], currentHeight, ctx)
//     DrawTriangle(xy1[0], xy1[1], xy2[0], xy2[1], -1*currentHeight, ctx)

//     requestAnimationFrame(animate);
//     flip = false
// }

var stop = false;
var frameCount = 0;
//var $results = $("#results");
var fps, fpsInterval, startTime, now, then, elapsed;


// initialize the timer variables and start the animation

function startAnimating(fps) {
    fpsInterval = 1000 / fps;
    then = Date.now();
    startTime = then;
    animate();
}

function animate() {

    // request another frame

    requestAnimationFrame(animate);

    // calc elapsed time since last loop

    now = Date.now();
    elapsed = now - then;

    // if enough time has elapsed, draw the next frame

    if (elapsed > fpsInterval) {

        // Get ready for next frame by setting then=now, but also adjust for your
        // specified fpsInterval not being a multiple of RAF's interval (16.7ms)
        then = now - (elapsed % fpsInterval);

        stepTick += steppps
        timeTick++
        currentHeight = radians_to_degrees(Math.pow(Math.cos(stepTick), 2) * maxHeight)


        if (timeTick = ntimeTickCycle) timeTick = 0, stepTick = 0, console.log("flip") // TODO instead of time, make it if naheight reached

        if (flip) flipSign *= -1

        //console.log("flip" + flipSign + "    current: "+ currentHeight +"   max: " +  maxHeight)
        ResetCanvas(ctx)
        DrawTriangle(xy1[0], xy1[1], xy2[0], xy2[1], currentHeight, ctx)
        DrawTriangle(xy1[0], xy1[1], xy2[0], xy2[1], -1 * currentHeight, ctx)

        requestAnimationFrame(animate);
        flip = false

    }
}


//#endregion

//#region Shape Obj

//#endregion

//#region init
ResetCanvas(ctx)

startAnimating(20);
//animate();
//#endregion