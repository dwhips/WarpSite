var canvas = document.getElementById("MainColorCanvas");
var ctx = canvas.getContext("2d");
var color1, color2, color3;
var colorType;

function SetConversionType()
{
    colorType = document.getElementById("colorConversionType").value;

    //TODO show/hide
    switch(colorType){
        case "RGB":
            document.getElementById("color1").placeholder = "R";
            document.getElementById("color2").placeholder = "G";
            document.getElementById("color3").placeholder = "B";
        break;

        case "Hex":
            document.getElementById("color1").placeholder = "#0000FF";
        break;

        default:
            console.error("Color type not recognized: " + colorType);
    }
}

function CheckInputs()
{
    // Number between 0 - 255
    color1 = document.getElementById("color1").value;
    color2 = document.getElementById("color2").value;
    color3 = document.getElementById("color3").value;

    updateColor();
}
//TODO display all the converted values

function updateColor()
{
    switch(colorType){
        case "RGB":
            ctx.fillStyle = "rgb("+ color1 + "," + color2 + "," + color3 + ")";
        break;

        case "Hex":
            ctx.fillStyle = "#" + color1;
        break;

        default:
            console.error("Color type not recognized: " + colorType);
    }
    // for RGB
    
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
}