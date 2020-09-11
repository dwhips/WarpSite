var canvas = document.getElementById('doodle')
var ctx = canvas.getContext('2d')
// var offset_height = document.getElementById("header").offsetHeight;

var bound_rect = canvas.getBoundingClientRect();
canvas.width = window.innerWidth - bound_rect.x;
canvas.height = window.innerHeight - bound_rect.y;

ctx.fillStyle = 'black'
ctx.fillRect(0, 0, canvas.width, canvas.height)


addEventListener('resize', () => {
    canvas.width = window.innerWidth - bound_rect.x;
    canvas.height = window.innerHeight - bound_rect.y;
    general_wave = InitWaves(ctx, canvas);
})

function rand(min, max) {
    return Math.random() * (max - min) + min
}

function randInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

function randNormal(mu, sigma) {
    var sum = 0
    for (var i = 0; i < 6; i += 1) {
        sum += rand(-1, 1)
    }
    return mu + sigma * sum / 6
}

function normalPDF(x, mu, sigma) {
    var sigma2 = Math.pow(sigma, 2)
    var numerator = Math.exp(-Math.pow((x - mu), 2) / (2 * sigma2))
    var denominator = Math.sqrt(2 * Math.PI * sigma2)
    return numerator / denominator
}

function InitWaves(ctx, canvas) {
    var xMin = canvas.width / 10;
    var xMax = canvas.width - xMin;
    var yMin = 100;
    var yMax = canvas.height - yMin;

    var nLines = 80;
    var nPoints = 80;

    var mx = (xMin + xMax) / 2;
    var dx = (xMax - xMin) / nPoints;
    var dy = (yMax - yMin) / nLines;

    var x = xMin;
    var y = yMin;

    ctx.moveTo(xMin, yMin);

    ctx.fillStyle = 'black'
    ctx.strokeStyle = 'white'
    ctx.lineWidth = 1.2

    var general_wave_data = new Array(3);
    for (var i = 0; i < 3; i++) {
        general_wave_data[i] = new Array(nLines)
    }

    for (var i = 0; i < nLines; i++) {
        ctx.beginPath()
        // Generate random parameters for the line's normal distribution
        var nModes = randInt(1, 4);
        var mus = [];
        var sigmas = [];
        for (var j = 0; j < nModes; j++) {
            mus[j] = rand(mx - 50, mx + 50);
            sigmas[j] = randNormal(24, 30);
        }
        var w = y;

        general_wave_data[0][i] = nModes;
        general_wave_data[1][i] = mus;
        general_wave_data[2][i] = sigmas;

        DrawWave(nPoints, nModes, x, dx, mus, sigmas, w, y);

        // Cover the previous lines
        ctx.fill()
        // Draw the current line
        ctx.stroke()
        // Go to the next line
        x = xMin
        y = y + dy
        ctx.moveTo(x, y)
    }
    return general_wave_data;
}

function DrawAllWaves(ctx, canvas, general_wave_data) {
    // Determine x and y range

    var xMin = canvas.width / 10;

    var xMax = canvas.width - xMin;
    var yMin = 100;
    var yMax = canvas.height - yMin;

    var nLines = 80;
    var nPoints = 80;

    var mx = (xMin + xMax) / 2;
    var dx = (xMax - xMin) / nPoints;
    var dy = (yMax - yMin) / nLines;

    var x = xMin;
    var y = yMin;

    ctx.moveTo(xMin, yMin);

    ctx.fillStyle = 'black'
    ctx.strokeStyle = 'white'
    ctx.lineWidth = 1.2

    var general_wave_data = new Array(3);
    for (var i = 0; i < 3; i++) {
        general_wave_data[i] = new Array(nLines)
    }

    for (var i = 0; i < nLines; i++) {
        ctx.beginPath()
        // Generate random parameters for the line's normal distribution
        var nModes = general_wave[0][i];
        var mus = general_wave[1][i];
        var sigmas = general_wave[2][i];
        var w = y;

        DrawWave(nPoints, nModes, x, dx, mus, sigmas, w, y);

        // Cover the previous lines
        ctx.fill()
        // Draw the current line
        ctx.stroke()
        // Go to the next line
        x = xMin
        y = y + dy
        ctx.moveTo(x, y)
    }
}


function DrawWave(nPoints, nModes, x, dx, mus, sigmas, w, y) {
    for (var k = 0; k < nPoints; k++) {
        x = x + dx
        var noise = 0
        for (var l = 0; l < nModes; l++) {
            noise += normalPDF(x, mus[l], sigmas[l])
        }
        var yy = 0.3 * w + 0.7 * (y - 600 * noise + noise * Math.random() * 200 + Math.random())
        ctx.lineTo(x, yy)
        w = yy
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    DrawAllWaves(ctx, canvas, general_wave);
    requestAnimationFrame(animate);
    setTimeout(() => { }, 1000);
}

const general_wave = InitWaves(ctx, canvas);
animate();
