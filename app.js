const timeEl = document.getElementById('time');
const dateEl = document.getElementById('date');
const currentWeatherItemsEl = document.getElementById('current-weather-items');
const timezone = document.getElementById('time-zone');
const countryEl = document.getElementById('country');
const weatherForecastEl = document.getElementById('weather-forecast');
const currentTempEl = document.getElementById('current-temp');
var button=document.getElementById('button');
var inputvalue=document.getElementById('inputvalue');

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const API_KEY ='e3c9bef235e4eab518701918a05f43ae';

setInterval(changedata,1000);

function changedata(){
    const time = new Date();
    let month = time.getMonth();
    let date = time.getDate();
    const day = time.getDay();
    const hour = time.getHours();
    const hoursIn12HrFormat = hour >= 13 ? hour %12: hour;
    const minutes = time.getMinutes();
    const ampm = hour >=12 ? 'PM' : 'AM';
    timeEl.innerHTML = (hoursIn12HrFormat < 10? '0'+hoursIn12HrFormat : hoursIn12HrFormat) + ':' + (minutes < 10? '0'+minutes: minutes)+ ' ' + `<span id="am-pm">${ampm}</span>`;
    dateEl.innerHTML = days[day] + ', ' + date+ ' ' + months[month];

}

getWeatherData()
function getWeatherData () {
    navigator.geolocation.getCurrentPosition((success) => {       
        let {latitude, longitude } = success.coords;
        fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${API_KEY}`).then(res => res.json()).then(data => {
        console.log(data)
        showWeatherData(data);
        })
    })
}


function showWeatherData (data){
    let {sunrise, sunset, wind_speed} = data.city;
    timezone.innerHTML = `Timezone ${data.city.timezone}`;
    //countryEl.innerHTML = data.lat + 'N ' + data.lon+'E'
    countryEl.innerHTML = `Country ${data.city.country}`;

    currentWeatherItemsEl.innerHTML = 
    `<div class="weather-item">
        <div><br>Sunrise -${convertMsToTime(sunrise)} am </div>
        <div></div>
    </div>
    <div>
    <div>City -${data.city.name}</div>
    </div>
    <div class="weather-item">
        <div>Sunset -${convertMsToTime(sunset)} pm </div>
        <div></div>
    </div>
    </div>
    `;

    
    let otherDayForcast = ''
    data.list.forEach((day, idx) => {
        if(idx == 0){
            currentTempEl.innerHTML = `
            <img src="http://openweathermap.org/img/wn//${day.weather[0].icon}@2x.png" alt="weather icon" class="w-icon">
            <div class="other">
                <br></br>
                <div><b>Date : </b>  ${convertDigitIn(day.dt_txt)}</div>
                <div class="temp"><b>Temperature : </b> ${day.main.temp}&#176;C<br></div>
                <div class="temp"><b>Pressure : </b> ${day.main.pressure} hPa  <b>Humidity : </b>  ${day.main.humidity} </div>
                <div><b>Temperature-max : </b>  ${day.main.temp_max}&#176;C</div>
            </div>
            
            `
        }else{
            otherDayForcast += `
            <div class="weather-forecast-item" >
                <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="weather icon" class="w-icon">
                <div ><b>Date : </b>${convertDigitIn(day.dt_txt)}</div>
                <div></div>
                <div cla    ss="temp" align="right" ><b>Temperature : </b>${day.main.temp}&#176;C<br></div>
                <div class="temp"><b>Pressure : </b> ${day.main.pressure} hPa</div>
                <div><b>Humidity : </b>  ${day.main.humidity}</div>
                <div></div>
                <div><b>Temperature-max : </b>  ${day.main.temp_max}&#176;C</div>
                <div></div>
            </div>           `
        }
    })
    weatherForecastEl.innerHTML = otherDayForcast;
}



function convertMsToTime(milliseconds) {
    let seconds = Math.floor(milliseconds / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);
    seconds = seconds % 60;
    minutes = minutes % 60;
    hours = hours % 24;
    return `${padTo2Digits(hours)}:${padTo2Digits(minutes)}:${padTo2Digits(
      seconds,
    )}`;
  }

  function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
  }


function convertDigitIn(str){

return str.split('/').reverse().join('/');
}


