var canvas = document.getElementById("MainColorCanvas");
var ctx = canvas.getContext("2d");
var color1, color2, color3;

var colorType = document.getElementById("colorConversionType");
var color1 = document.getElementById("color1"), color2 = document.getElementById("color2"), color3 = document.getElementById("color3");
var color1slider = document.getElementById("color1slider"), color2slider = document.getElementById("color2slider"), color3slider = document.getElementById("color3slider");

InitConverter();

function InitConverter(){
    color1.value = 125;
    color2.value = 125;
    color3.value = 125;
    color1slider.value = 125;
    color2slider.value = 125;
    color3slider.value = 125;

    colorType.value = "RGB"

    updateColor();
}

function SetConversionType()
{
    switch(colorType.value){
        case "RGB":
            color1.placeholder = "R";
            color2.placeholder = "G";
            color3.placeholder = "B";

            document.getElementById("color2cell").style.visibility="visible";
            document.getElementById("color3cell").style.visibility ="visible";

        break;

        case "Hex":
            color1.placeholder = "#0000FF";

            document.getElementById("color2cell").style.visibility = "hidden";
            document.getElementById("color3cell").style.visibility= "hidden";

        break;

        default:
            console.error("Color type not recognized: " + colorType.value);
    }
}

function SyncFromColori()
{
    // Number between 0 - 255
    // color1 = color.value;
    // color2 = document.getElementById("color2").value;
    // color3 = document.getElementById("color3").value;
    color1slider.value = color1.value;
    color2slider.value = color2.value;
    color3slider.value = color3.value;
    updateColor();
}

function SyncFromSlider()
{
    color1.value = color1slider.value;
    color2.value = color2slider.value;
    color3.value = color3slider.value;
    updateColor();
}

//TODO display all the converted values

function updateColor()
{
    switch(colorType.value){
        case "RGB":
            ctx.fillStyle = "rgb("+ color1.value + "," + color2.value + "," + color3.value + ")";
        break;

        case "Hex":
            ctx.fillStyle = "#" + color1.value;
        break;

        default:
            console.error("Color type not recognized: " + colorType.value);
    }
    // for RGB
    
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
}