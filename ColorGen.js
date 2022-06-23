var canvas = document.getElementById("MainColorCanvas");
var ctx = canvas.getContext("2d");
var color1, color2, color3;

var color1 = document.getElementById("color1"), color2 = document.getElementById("color2"), color3 = document.getElementById("color3");
var color1slider = document.getElementById("color1slider"), color2slider = document.getElementById("color2slider"), color3slider = document.getElementById("color3slider");
var hex = document.getElementById("hex");

InitColors();

function InitColors(){
    color1.value = 125;
    color2.value = 125;
    color3.value = 125;
    color1slider.value = 125;
    color2slider.value = 125;
    color3slider.value = 125;

    SyncFromColori();
}

function SyncFromColori()
{
    // Number between 0 - 255
    color1slider.value = color1.value;
    color2slider.value = color2.value;
    color3slider.value = color3.value;

    hex.value = GetColorFillStyle("Hex");

    updateColor();
}

function SyncFromSlider()
{
    color1.value = color1slider.value;
    color2.value = color2slider.value;
    color3.value = color3slider.value;

    hex.value = GetColorFillStyle("Hex");

    updateColor();
}

function SyncFromHex()
{
    console.log("Hex from sync: " + hex.value);

    SetRGB("Hex", hex.value);
    updateColor();
}

// Get fill style text of each color type
function GetColorFillStyle(colorType)
{
    switch(colorType){
        case "RGB","":
            return "rgb("+ color1.value + "," + color2.value + "," + color3.value + ")";

        case "Hex":
            let r = parseInt(color1.value);
            let g = parseInt(color2.value);
            let b = parseInt(color3.value);

            return "#" + r.toString(16) + g.toString(16) + b.toString(16);

        default:
            console.error("Color type not recognized: " + colorType);
    }
}

// Converts the provided color type to RGB and sets the color vals.
function SetRGB(colorType, colorValue)
{
    switch(colorType){
        case "Hex":
            colorValue = colorValue.substring(1, colorValue.length); // remove preffix #

            let r = colorValue.substring(0,2);
            let g = colorValue.substring(2,4);
            let b = colorValue.substring(4,6);

            color1.value = parseInt(r, 16);
            color2.value = parseInt(g, 16);
            color3.value = parseInt(b, 16);
        break;

        default:
            console.error("Color type not recognized: " + colorType);
    }
}

// Canvas color always updates from RGB, but other conversions will update RGB when changed
function updateColor()
{
    // console.log("Updating Color: " +  GetColorFillStyle("") + ":" + test);
    ctx.fillStyle = GetColorFillStyle("");

    ctx.fillRect(0, 0, canvas.width, canvas.height);
}