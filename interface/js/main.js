// set current time
function checkTime(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

function startTime() {
   let today = new Date();
   let h = today.getHours();
   let m = today.getMinutes();

    m = checkTime(m);
    document.getElementById('time').innerHTML = h + ":" + m;
    t = setTimeout(function() {
        startTime()
    }, 500);
}


startTime();
