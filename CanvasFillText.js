var canvasTextFill = document.getElementById("textFillCanvas");

canvasTextFill.innerHTML = BuiltText("W W W W "); 

// Builds text out of the filler font
function BuiltText(fillerTextElem)
{
    let fullFillerText = fillerTextElem; 
    for(let i = 0; i <= 10; i++)
    {
        fullFillerText += fullFillerText;
    }
    return fullFillerText;
}

function GetScrollFromTop()
{
    return (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
}

function SetOpacity()
{
    let opacity = 100;
    opacity = opacity - (GetScrollFromTop()/ 2);

    canvasTextFill.style.opacity =  opacity + "%";
}

window.onscroll = function (e) {
    console.log("scroll height: " + GetScrollFromTop());
    SetOpacity();
}