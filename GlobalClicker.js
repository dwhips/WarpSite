function incGlobalClicker() 
{
    var cnt = document.getElementById("counter").innerHTML;
    cnt = parseFloat(cnt);
    cnt++;
    document.getElementById("counter").innerHTML = cnt.toString();
}