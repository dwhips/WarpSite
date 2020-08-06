function setupVid()
{
    var url = document.getElementById("youtubeURL").value;
    var url = url.replace('watch?v=','embed/');
    alert(url)
}
