function setupVid()
{
    var url = document.getElementById("youtubeURL").value;
    url = url.replace('watch?v=','embed/');
    url += "?autoplay=1";
    // alert(url)
    // set src to embeded auto play url
    document.getElementById("utubeWidge").src = url;
}
