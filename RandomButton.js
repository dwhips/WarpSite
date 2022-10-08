let RandomButton = document.getElementById("RandomButton");
const colorList = ["aliceblue", "antiquewhite", "aqua", "aquamarine","midnightblue","slategray","orange"]

let iRandom;

function RandomizeButton()
{
    console.log("Testing this way: ${GetRandomColor()}");
    //TODO create string of text to also get the
    RandomButton.style.backgroundColor = GetRandomColor();
    RandomButton.style.borderRadius = GetRoundness();
}

function GetRandomColor()
{
    console.log(colorList.length);
    return colorList[GetRandomInt(colorList.length-1)];
}

function GetRoundness()
{
    switch(GetRandomInt(2)){
        case 0:
            console.log("no round");
            return "0%";

        case 1:
            console.log("mid round");
            return GetRandomInt(10, 5) + "%";

        case 2:
            return GetRandomInt(40, 30) + "%";
    }
    if (CoinFlip())
    {
        
        
    }
    console.log("round");
    

}

function GetRandomInt(max, min = 0)
{
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

function CoinFlip()
{
    return GetRandomInt(1) == 0;
}