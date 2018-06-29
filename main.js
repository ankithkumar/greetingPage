let greetMessage = {
   morning : 'Good Morning',
   afterNoon : 'Good AfterNoon',
   evening : 'Good Evening',
   night : 'Good Night'
}

let greetPerson = function (greetIdOfDom) {
    let currentDate = getDateObject();
    let time = calculateTimeFromDate(currentDate);

    if (time.meridian === 'AM') {
        if (time.hours >=12 && time.hours <=4) {
            greetIdOfDom.innerHTML = greetMessage.night;
        } else if (time.hours >= 4 && time.hours <= 12) {
            greetIdOfDom.innerHTML = greetMessage.morning;
        } 
    } else if (time.meridian === 'PM') {
        if (time.hours >= 12 && time.hours <=5) {
            greetIdOfDom.innerHTML = greetMessage.afterNoon;
        } else if (time.hours > 5 && time.hours <=7) {
            greetIdOfDom.innerHTML = greetMessage.evening;
        } else if (time.hours > 7 && time.hours < 12) {
            greetIdOfDom.innerHTML = greetMessage.night;
        }
    }
}

let checkForMeridian = function (hours) {
    return (hours >= 0 && hours <12) ? 'AM' : (hours >= 12 && hours <=23) ? 'PM' : '';
}

let convertHoursToFitMeridian = function (hours) {
    return hours === 0 ? 12 : hours % 12;
}

let getDateObject = function() {
    return new Date();
}

let calculateTimeFromDate = function (currentDate) {
 time = {};
 let hours = currentDate.getHours();
 time.minutes = currentDate.getMinutes();
 time.meridian = checkForMeridian(hours);
 time.hours = convertHoursToFitMeridian(hours);
 return time;    
}

let updateTime = function (timeIdOfDomObject) {
    let currentDate = getDateObject();
    let time = calculateTimeFromDate(currentDate);
    let timeString = `${time.hours}`;
    timeString = time.minutes < 10 ? `${timeString} : 0${time.minutes}` : `${timeString} : ${time.minutes}`;    
    timeString = `${timeString} ${time.meridian}`
    timeIdOfDomObject.innerHTML = timeString;
}

setTimeInIntervals = function (timeIdOfDomObject) {
    updateTime(timeIdOfDomObject);
    window.setInterval(updateTime, 1000 * 30, timeIdOfDomObject);
}

focusOn = function (domObject) {
    domObject.focus();
}

initialise = function() {
    let timeIdOfDomObject = document.getElementById('time-of-day');
    let greetIdOfDomObject = document.getElementById('greet-message');
    let forTheDayIdOfDomObject = document.getElementById('for-the-day');
    setTimeInIntervals(timeIdOfDomObject);
    greetPerson(greetIdOfDomObject);
    focusOn(forTheDayIdOfDomObject);
}
