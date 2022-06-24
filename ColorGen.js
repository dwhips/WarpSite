var canvas = document.getElementById("MainColorCanvas");
var ctx = canvas.getContext("2d");
var color1, color2, color3;

var color1 = document.getElementById("color1"), color2 = document.getElementById("color2"), color3 = document.getElementById("color3");
var color1slider = document.getElementById("color1slider"), color2slider = document.getElementById("color2slider"), color3slider = document.getElementById("color3slider");
var colorAlpha = document.getElementById("colorAlpha"), colorAlphaSlider = document.getElementById("colorAlphaSlider");
var hex = document.getElementById("hex");
var rgbLabel = document.getElementById("rgbLabel");

InitColors();

function InitColors(){
    color1.value = 125;
    color2.value = 125;
    color3.value = 125;
    color1slider.value = 125;
    color2slider.value = 125;
    color3slider.value = 125;

    colorAlpha.value = 1;

    rgbLabel.value = GetColorFillStyle("RGB");

    SetRandomRGB()
    SyncFromColori();
}

function SyncFromColori()
{
    // Number between 0 - 255
    color1slider.value = color1.value;
    color2slider.value = color2.value;
    color3slider.value = color3.value;
    colorAlphaSlider.value = colorAlpha.value;

    hex.value = GetColorFillStyle("Hex");

    rgbLabel.value = GetColorFillStyle("RGB");

    updateColor();
}

function SyncFromSlider()
{
    console.log("alpha from slider: " + colorAlphaSlider.value);
    color1.value = color1slider.value;
    color2.value = color2slider.value;
    color3.value = color3slider.value;
    colorAlpha.value = colorAlphaSlider.value;

    hex.value = GetColorFillStyle("Hex");

    rgbLabel.value = GetColorFillStyle("RGB");

    updateColor();
}

function SyncFromHex()
{
    console.log("Hex from sync: " + hex.value);

    SetRGB("Hex", hex.value);
    updateColor();
}

function SyncFromLabel(){

    console.log("rgb label from sync: " + rgbLabel.value);
    SetRGB("rgb", rgbLabel.value);
    updateColor();
}

// Get fill style text of each color type
function GetColorFillStyle(colorType)
{
    switch(colorType){
        case "RGB":
        case "":
            return "rgba("+ color1.value + "," + color2.value + "," + color3.value + "," + colorAlpha.value + ")";

        case "Hex":
            let r = parseInt(color1.value);
            let g = parseInt(color2.value);
            let b = parseInt(color3.value);

            return "#" + r.toString(16) + g.toString(16) + b.toString(16);

        default:
            console.error("GetColorFillStyle Color type not recognized: " + colorType);
    }
}

// Converts the provided color type to RGB and sets the color vals.
function SetRGB(colorType, colorValue)
{
    let r, g,b;
    let tempArr;
    switch(colorType){
        case "Hex":
            colorValue = colorValue.substring(1, colorValue.length); // remove preffix #

            r = colorValue.substring(0,2);
            g = colorValue.substring(2,4);
            b = colorValue.substring(4,6);

            color1.value = parseInt(r, 16);
            color2.value = parseInt(g, 16);
            color3.value = parseInt(b, 16);

            colorAlpha.value = 1.0;
        break;

        case "rgb":
            //TODO have regex function that checks that the input will parse correctly. Have the element bein 'Error'
            colorValue = colorValue.replace("rgb","");
            colorValue = colorValue.replace("a","");
            colorValue = colorValue.replace("(","");
            colorValue = colorValue.replace(")","");
            console.log("color val: " + colorValue);
            tempArr = colorValue.split(",");

            if (tempArr.length < 3){return "nullss"}
            // assuming r g b are provided
            color1.value = tempArr[0].trim();
            color2.value = tempArr[1].trim();
            color3.value = tempArr[2].trim();

        break;

        default:
            console.error("SetRGB Color type not recognized: " + colorType);
    }
}

// Canvas color always updates from RGB, but other conversions will update RGB when changed
function updateColor()
{
    console.log("Updating Color: " +  GetColorFillStyle(""));
    ctx.fillStyle = GetColorFillStyle("");

    ctx.fillRect(0, 0, canvas.width, canvas.height);


    var canvasTest = document.getElementById("test");
    var ctxTest = canvasTest.getContext("2d");
    ctxTest.fillStyle = "rgba(" + color1.value + "," + color2.value + "," + color3.value + "," + colorAlpha.value + ")";
    ctxTest.fillRect(0,0,canvasTest.width,canvasTest.height);
}

function SetRandomRGB()
{
    color1.value = Math.floor(Math.random() * 255);
    color2.value = Math.floor(Math.random() * 255);
    color3.value = Math.floor(Math.random() * 255);
    colorAlpha.value = 1.0;
}