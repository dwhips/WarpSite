function setupVid()
{
    // https://stackoverflow.com/questions/27535244/is-there-anyway-to-visualize-youtube-audio-from-an-iframe-using-the-web-audio-ap
    var url = document.getElementById("youtubeURL").value;
    url = url.replace('watch?v=','embed/');
    url += "?autoplay=1";
    // alert(url)

    // set src to embeded auto play url
    document.getElementById("utubeWidge").src = url;

    document.getElementById("dummytxt").innerHTML = url;
}

