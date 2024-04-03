var moment = require('moment-timezone');


function getCurrentDateTime(){
    return new Date().getTime();
    //new Date().toLocaleString("en-US", {timeZone: 'Asia/Kolkata'})
}


function getAsiaKolkataDateTime(){
  return new Date(new Date().toLocaleString("en-US", { timeZone: 'Asia/Kolkata' })).getTime()
}

function convertSecondsToMinutesAndSecondsFormat(timeInSeconds){

  let totalSeconds = Math.floor(timeInSeconds);

  // Calculate the number of minutes
  let minutes = Math.floor(totalSeconds / 60);

  // Calculate the remaining seconds
  let seconds = totalSeconds % 60;

  let time = minutes.toString().padStart(2, '0') + ':' + seconds.toString().padStart(2, '0');

  return time;
}



function getCurrentTimeStartOfMinute(){
    var start_time = moment().tz("Asia/Kolkata").startOf('minute').unix();
    start_time = start_time * 1000;
    return start_time;
}

function getCurrentTimeEndOfMinute(){
  var end_time = moment().tz("Asia/Kolkata").endOf('minute').unix();
  end_time = end_time * 1000;
  return end_time;
}

function getDateTimeFormat(timestamp, required_format){
  
  var date_format = moment.tz(timestamp, "Asia/Kolkata").format(required_format);
  
  return date_format;
}
  // add the code below
  module.exports = {getCurrentDateTime, getAsiaKolkataDateTime, getCurrentTimeStartOfMinute, getCurrentTimeEndOfMinute, convertSecondsToMinutesAndSecondsFormat, getDateTimeFormat};
