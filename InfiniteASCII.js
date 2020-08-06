var ladderDiv = document.createElement('pre');
ladderDiv.innerHTML = "";
for(var i = 0; i < 100; ++ i)
{
    // need it to append but get scroll working first
   ladderDiv.innerHTML += "        ||======||\n";
   ladderDiv.innerHTML += "        ||      ||\n";
   ladderDiv.innerHTML += "        ||      ||\n";
}

window.onscroll = function(ev) {
    if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight) {
        var d1 = document.getElementById('monkey');
        d1.insertAdjacentElement('afterend', ladderDiv)

        //alert("you're at the bottom of the page");
        
    }
};