let startTime, updatedTime, difference, timeinterval;
let running = false;
let paused = false;
const timeDisplay = document.getElementById('time');
const lapsContainer = document.getElementById('laps');

function startStopwatch(){
    if (!running){
        if (!paused){
            startTime = new Date().getTime();
        } else{
            startTime = new Date().getTime()-difference;
        }
        timeinterval=setInterval(getShowTime, 10); 
        running = true;
        paused =false;
        document.getElementById('startstop').textContent ="Stop";
    } else{
        clearInterval(timeinterval);
        running=false;
        paused=true;
        document.getElementById('startstop').textContent = "Start";
    }
}

function getShowTime(){
    updatedTime = new Date().getTime();
    difference= updatedTime-startTime;
    
    let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes= Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds= Math.floor((difference % (1000 * 60)) / 1000);
    let milliseconds =Math.floor((difference % 1000) / 10);

    hours = (hours< 10) ? "0" + hours : hours;
    minutes = (minutes< 10) ? "0" + minutes : minutes;
    seconds= (seconds< 10) ? "0" + seconds : seconds;
    milliseconds =(milliseconds< 10) ? "0" + milliseconds : milliseconds;

    timeDisplay.innerHTML = hours + ':' + minutes + ':' + seconds + ':' + milliseconds;
}

function pauseStopwatch(){
    if (running){
        clearInterval(timeinterval);
        paused = true;
        running= false;
        document.getElementById('startstop').textContent = "Start";
    }
}

function resetStopwatch(){
    clearInterval(timeinterval);
    running = false;
    paused= false;
    timeDisplay.innerHTML = "00:00:00.00";
    lapsContainer.innerHTML = '';
    document.getElementById('startstop').textContent = "Start";
    startTime = undefined;
    updatedTime = undefined;
    difference= undefined;
}

function lapStopwatch(){
    if (running){
        const lapTime = document.createElement('li');
        lapTime.textContent =timeDisplay.innerHTML;
        lapsContainer.appendChild(lapTime);
    }
}

document.getElementById('startstop').addEventListener('click',startStopwatch);
document.getElementById('pause').addEventListener('click',pauseStopwatch);
document.getElementById('reset').addEventListener('click', resetStopwatch);
document.getElementById('lap').addEventListener('click',lapStopwatch);
