var canvas = document.getElementById("MainColorCanvas");
var ctx = canvas.getContext("2d");
var color1, color2, color3;

var color1 = document.getElementById("color1"), color2 = document.getElementById("color2"), color3 = document.getElementById("color3");
var color1slider = document.getElementById("color1slider"), color2slider = document.getElementById("color2slider"), color3slider = document.getElementById("color3slider");
var hex = document.getElementById("hex");
var rgbLabel = document.getElementById("rgbLabel");

var hInput = document.getElementById("hInput"), sInput = document.getElementById("sInput"), lInput = document.getElementById("lInput");
var hSlider = document.getElementById("hSlider"), sSlider = document.getElementById("sSlider"), lSlider = document.getElementById("lSlider");

InitColors();

function InitColors(){
    rgbLabel.value = GetColorFillStyle("RGB");

    SetRandomRGB()
    SyncFromRGBInput();
}

function SyncFromRGBInput()
{
    updateColor("rgb", color1.value, color2.value, color3.value);
}

function SyncFromRGBSlider()
{
    updateColor("rgb", color1slider.value, color2slider.value, color3slider.value)
}

function SyncFromHSLInput()
{
    updateColor("hsl", hInput.value, sInput.value, lInput.value);
}

function SyncFromHSLSlider()
{
    updateColor("hsl", hSlider.value, sSlider.value, lSlider.value);
}

function SyncFromHex()
{
    let arrTemp = ParseLabel("Hex", hex.value);
    if (arrTemp.length == 0) {
        console.error("failed hex parsing from: " + hex.value);
    }
    else{
        updateColor("rgb", arrTemp[0], arrTemp[1], arrTemp[2]);
    }
}

function SyncRGBLabel(){

    let arrTemp = ParseLabel("RGB", rgbLabel.value);
    if (arrTemp.length == 0) {
        console.error("failed rgb parsing from: " + rgbLabel.value);
    }
    else{
        updateColor("rgb", arrTemp[0], arrTemp[1], arrTemp[2]);
    }
}

// Get fill style text of each color type
function GetColorFillStyle(colorType)
{
    switch(colorType){
        case "RGB":
        case "":
            return "rgb("+ color1.value + "," + color2.value + "," + color3.value + ")";

        case "Hex":
            let r = parseInt(color1.value);
            let g = parseInt(color2.value);
            let b = parseInt(color3.value);
            r = r.toString(16);
            g = g.toString(16);
            b = b.toString(16);

            if (r.length == 1) r = "0" + r;
            if (g.length == 1) g = "0" + g;
            if (b.length == 1) b = "0" + b;
            
            return "#" + r + g + b;

        case "HSL":
            return "hsl(" + hInput.value + "," + sInput.value + "%," + lInput.value + "%)";  

        default:
            console.error("GetColorFillStyle Color type not recognized: " + colorType);
    }
}

// This unparses a label/fill style with seperated values.
// If this returns an empty array, the unparse failed and do not try to update the color. The field should be put in error.
function ParseLabel(colorType, labelValue) 
{
    let tempColorArr;
    switch(colorType){
        case "RGB":
            // removing comon prefix and ending
            //TODO remove all preceeding ( prefix vals
            labelValue = labelValue.replace("rgb","");
            labelValue = labelValue.replace("a","");
            labelValue = labelValue.replace("(","");
            labelValue = labelValue.replace(")","");
            //split into rgb values
            tempColorArr = labelValue.split(",");

            //check for valid outputs
            if(tempColorArr.length < 3) return [];

            tempColorArr[0] = tempColorArr[0].trim();
            tempColorArr[1] = tempColorArr[1].trim();
            tempColorArr[2] = tempColorArr[2].trim();

            if(!isNumeric(tempColorArr[0])) return[];
            if(!isNumeric(tempColorArr[1])) return []; 
            if(!isNumeric(tempColorArr[2])) return []; 

            return tempColorArr.slice(0,3);

        case "Hex":
            //parsing out hex value to RGB
            labelValue = labelValue.replace("#",""); // remove preffix #
            if (labelValue.length != 6) return [];

            r = labelValue.substring(0,2);
            g = labelValue.substring(2,4);
            b = labelValue.substring(4,6);

            return [parseInt(r, 16), parseInt(g, 16), parseInt(b, 16)];

        default:
            console.error("ParseLabel Color type not recognized: " + colorType);
    }
    return [];
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
            
        break;

        case "rgb":
            //TODO have regex function that checks that the input will parse correctly. Have the element bein 'Error'
            colorValue = colorValue.replace("rgb","");
            colorValue = colorValue.replace("a","");
            colorValue = colorValue.replace("(","");
            colorValue = colorValue.replace(")","");
            tempArr = colorValue.split(",");

            if (tempArr.length < 3){return "nullss"}
            // assuming r g b are provided
            color1.value = tempArr[0].trim();
            color2.value = tempArr[1].trim();
            color3.value = tempArr[2].trim();
            break;

        case "hsl":
            tempArr = colorValue.split(",");
            tempArr = hsl2rgb(tempArr[0],tempArr[1],tempArr[2]);
            // assuming r g b are provided
            color1.value = Math.floor(tempArr[0]);
            color2.value = Math.floor(tempArr[1]);
            color3.value = Math.floor(tempArr[2]);
        break;

        default:
            console.error("SetRGB Color type not recognized: " + colorType);
    }
    color1slider.value = color1.value;
    color2slider.value = color2.value;
    color3slider.value = color3.value;
}

//Temp until I think how to clean this all up
function SetHSLFromRGB(r,g,b)
{
    
    let tempArr = rgbToHsl(r,g,b);

    tempArr[0] = Math.floor(tempArr[0]);
    tempArr[1] = Math.floor(tempArr[1]);
    tempArr[2] = Math.floor(tempArr[2]);

    hInput.value = tempArr[0];
    sInput.value = tempArr[1];
    lInput.value = tempArr[2];

    hSlider.value = tempArr[0];
    sSlider.value = tempArr[1];
    lSlider.value = tempArr[2];
}

// https://stackoverflow.com/questions/2353211/hsl-to-rgb-color-conversion
// input: h as an angle in [0,360] and s,l in [0,1] - output: r,g,b in [0,1]
function hsl2rgb(h,s,l) 
{
    // s,l to 0-1
    s= s/100;
    l=l/100;


   let a=s*Math.min(l,1-l);
   let f= (n,k=(n+h/30)%12) => l - a*Math.max(Math.min(k-3,9-k,1),-1);
   return [f(0)*255,f(8)*255,f(4)*255];
} 

//https://gist.github.com/mjackson/5311256
function rgbToHsl(r, g, b) {
    r /= 255, g /= 255, b /= 255;
  
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;
  
    if (max == min) {
      h = s = 0; // achromatic
    } else {
      var d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
  
      h /= 6;
    }
  
    return [ h*360, s*100, l*100 ];
  }

function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

// Canvas color always updates from RGB, but other conversions will update RGB when changed
function updateColor(style, input1, input2, input3)
{
    // console.log("updateColor - " + input1 + " " + input2 + " " + input3)
    switch(style){
        case "rgb": 
            color1slider.value = input1;
            color2slider.value = input2;
            color3slider.value = input3;

            color1.value = input1;
            color2.value = input2;
            color3.value = input3;

            SetHSLFromRGB(input1, input2, input3);
            hex.value = GetColorFillStyle("Hex");
            rgbLabel.value = GetColorFillStyle("RGB");
            break;

        case "hsl":
            // tempArr = colorValue.split(",");
            hSlider.value = input1;
            sSlider.value = input2;
            lSlider.value = input3;

            hInput.value = input1;
            sInput.value = input2;
            lInput.value = input3;

            SetRGB("hsl", input1 + "," + input2 + "," + input3);
            hex.value = GetColorFillStyle("Hex");
            rgbLabel.value = GetColorFillStyle("RGB");
            break;

        // temp, rethink how set RGB is used. Implement another param for string or just unparse?
        // case "hex":
        //     //temp, sets rgb
        //     SetRGB("Hex", colorValue);

        //     SetHSLFromRGB(color1.value, color2.value, color3.value);
        //     hex.value = GetColorFillStyle("Hex");
        //     rgbLabel.value = GetColorFillStyle("RGB");
        //     break;

        default:
            console.error("UpdateColor Color type not recognized: " + colorType);


    }

    ctx.fillStyle = GetColorFillStyle("");

    ctx.fillRect(0, 0, canvas.width, canvas.height);

    var canvasTest = document.getElementById("test");
    var ctxTest = canvasTest.getContext("2d");
    ctxTest.fillStyle = "rgb(" + color1.value + "," + color2.value + "," + color3.value + ")";
    ctxTest.fillRect(0,0,canvasTest.width,canvasTest.height);
}

function SetRandomRGB()
{
    color1.value = Math.floor(Math.random() * 255);
    color2.value = Math.floor(Math.random() * 255);
    color3.value = Math.floor(Math.random() * 255);
}