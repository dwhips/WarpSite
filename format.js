const maxGrowTitleWidth = "100%";
const minGrowTitleWidth = "40%";

function isInViewport(elem)
{
    const rect = elem.getBoundingClientRect();
    return(
        rect.top >= 0 && rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
}

// loops through dom element collection and determines width of element depending if its in view.
function GrowTitleIfVisible(collGrowTitles)
{
    if (collGrowTitles.length = 0) {return;}

    for (let i = 0; i < collGrowTitles.length; i++)
    {
        console.log("in loop: " + collGrowTitles[i]);
        if (collGrowTitles[i].className != 'GrowHeader') {
            console.log("invalid class name: " + collGrowTitles[i].className);
            return;
        }

        if(isInViewport(collGrowTitles[i])){
            collGrowTitles[i].style.width = maxGrowTitleWidth;
        }
        else{collGrowTitles[i].style.width = minGrowTitleWidth;
        }
    }

}

// Sets the grow tiles to the minimum width to start
function InitGrowTitles(collGrowTitles){
    for (let i = 0; i < collGrowTitles.length; i++)
    {
        collGrowTitles[i].style.width = minGrowTitleWidth;
    }
}

let arrGrowTitles = document.getElementsByClassName("GrowHeader");
InitGrowTitles(arrGrowTitles);
GrowTitleIfVisible(arrGrowTitles);

window.addEventListener("scroll", (e) => {
    GrowTitleIfVisible(arrGrowTitles);
})