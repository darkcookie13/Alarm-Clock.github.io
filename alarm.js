const currentTime = document.querySelector("h1"),
selectmenu = document.querySelectorAll("select"),
setAlarmNow = document.querySelector("button"),
content = document.querySelector(".content")


let alarmTime, isAlarmSet = false, 
AlarmTone = new Audio("Alarm-Tone.mp3")
// console.log(selectmenu);

// It's for the Hour bar
for(let i = 12; i > 0; i--){
    i = i < 10 ? "0" + i : i;
    let option = `<option value="${i}">${i}</option>`;
    selectmenu[0].firstElementChild.insertAdjacentHTML('afterend', option);
}

// It's for the Minutes bar
for(let i = 59; i >= 0; i--){
    i = i < 10 ? "0" + i : i;
    let option = `<option value="${i}">${i}</option>`;
    selectmenu[1].firstElementChild.insertAdjacentHTML('afterend', option);
}

// It's for the AM/PM bar
for(let i = 2; i > 0; i--){
    let AMPM = i == 1 ? "AM" : "PM";
    let option = `<option value="${AMPM}">${AMPM}</option>`;
    selectmenu[2].firstElementChild.insertAdjacentHTML('afterend', option);
}

// It is to set the current Time 
setInterval(() => {
    let date = new Date(),
    hour = date.getHours(),
    minute = date.getMinutes(),
    second = date.getSeconds(),
    AMPM = "AM";

    if(hour >= 12){
        hour = hour - 12;
        AMPM = "PM";
    }

    hour = hour == 0 ? hour = 12 : hour;

    hour = hour < 10 ? "0" + hour : hour;
    minute = minute < 10 ? "0" + minute : minute;
    second = second < 10 ? "0" + second : second;

    currentTime.innerText = `${hour}:${minute}:${second} ${AMPM}`;

    // It's for the tone to when Alarm rings
    if(alarmTime == `${hour}:${minute} ${AMPM}`){
        AlarmTone.play();
        AlarmTone.loop = true;
    }
}, 1000);

// It's to set the alarm
function setAlarm(){
    if(isAlarmSet){
        alarmTime = "";
        AlarmTone.pause();
        content.classList.remove("disable");
        setAlarmNow.innerText = "Set Alarm";
        return isAlarmSet = false;
    }

    // If someone don't set the alarm and click the set Alarm button this will show an alert
    let time = `${selectmenu[0].value}:${selectmenu[1].value} ${selectmenu[2].value}`;
    if(time.includes("Hour") || time.includes("Minute") || time.includes("AM/PM")){
        return alert("Ooooo.... Select a Time to Set Alarm!")
    }
    isAlarmSet = true;
    alarmTime = time;
    content.classList.add("disable");
    setAlarmNow.innerText = "Clear Alarm";
    // console.log(time);
}

setAlarmNow.addEventListener("click", setAlarm);