function ExtendLadder(n)
{
    for(var i = 0; i < n; ++i)
    {
        document.getElementById('monkey').innerHTML += "        ||======||\n";
        document.getElementById('monkey').innerHTML += "        ||      ||\n";
        document.getElementById('monkey').innerHTML += "        ||      ||\n";
    }
}

// for when i want to add more visual spice to the page
function AddStar()
{
    // * . +
}

window.onscroll = function(ev) {
    if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight) {
        //alert("you're at the bottom of the page");

        ExtendLadder(25);
        
    }
};