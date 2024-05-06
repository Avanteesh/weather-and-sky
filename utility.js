// navbar buttons 
const locationNavbutton = document.querySelector(".location-button");  // location navigation button
const clockViewNavButton = document.querySelector(".clock-view-section-button");     // time-clock view navigation button 
const alarmSetterNavButton = document.querySelector(".alarm-setter-nav-button");     // alarm setting navigation button
const moonAndSunNavButton = document.querySelector(".moon-and-sun-tracker-nav");    // moon and sun tracker navigation button
const weatherNavButton = document.querySelector(".weather-nav-button");            // weather navigation button
const settingsNavButton = document.querySelector(".settings-nav-button");          // settings navigation button

/* containers and components divs*/
// location wrapper components
const searchInput = document.querySelector("#location-input");  // input field element
const searchIconButton = document.querySelector("#seach-button"); // search button
const locationAdderButton = document.querySelector(".add-the-location");  // save locations
const savedLocationBox = document.querySelector(".location-boxes");  // container to append saved locations
const setLocationTwo = document.querySelector("#set-location");   
const deleteLocation = document.querySelector("#put-location-to-trash");

/* time clock wapper-componets*/
const locationNameText = document.querySelector(".location-text");   // location text
const weekDayNodeList = document.querySelectorAll(".day");     // node list of days of week
const currentTimeText = document.querySelector(".time-text");
const currentDateText = document.querySelector(".date-text");

// moon-wrapper components
const locationLatLong = document.querySelector("#lat-long-text");    // location latitude and longitude text
const moonImage = document.querySelector(".moon-image");        // moon phase display picture
const fullMoonInfoButton = document.querySelector("#full-moon-info-button");    // full Moon-calendar info
const moonInfoText = document.querySelector("#moon-phase-text");      // moon-phase-text
const moonRiseTimeText = document.querySelector(".moon-rise-time-text");   // moon rise time text
const moonSetTimeText = document.querySelector(".moon-set-time-text");    // moon set time text
const sunRiseTimeText= document.querySelector(".sun-rise-text");     // sun rise time text
const sunSetTimeText = document.querySelector(".sun-set-text");       // sun set time text

/* weather */
const weatherLocationText = document.querySelector(".city-location-text");
const latLonghtmlText = document.querySelector(".lat-long-text");
const weatherIcon = document.querySelector(".weather-image");
const airQualityIndexText = document.querySelector(".Air-quality-index");
const aqiInfoButton = document.querySelector("#AQI-info-button");
const temperatureText = document.querySelector(".temperature-text");
const windspeedText = document.querySelector(".wind-speed");
const weatherConditionText = document.querySelector(".weather-condition-text");
const coverText = document.querySelector(".cloud-cover-text");
const pressureText = document.querySelector(".pressure-text");
const humidityText = document.querySelector(".humidity-text");
const uvindexText = document.querySelector(".UV-index-text");
const visibilityText = document.querySelector(".visibility-text");
const inputCityLocalTimeText = document.querySelector(".local-time-of-input-city");
const lastUpdatedTimeText = document.querySelector(".last-updated-time");

/* containers */
const locationWrapperDiv = document.querySelector(".location-wrapper");
const timeClockWrapperDiv = document.querySelector(".time-clock-wrapper");  // time container
const moonAndSunTrackerDiv = document.querySelector(".Moon-phase-wrapper");  // moon container
const weatherWrapperDiv = document.querySelector(".weather-forecast-div");   // weather-froecast-container

/* dialog pop-up boxes */
// const settingDialog = document.querySelector(".Settings-dialog-box");   // settings dialog box
const fullMoonNamesDialog = document.querySelector(".full-moon-names");  // full moon dialog box
const fullMoonDialogCloseButton = document.querySelector("#close-fullMoon-dialog");   // close dialog buttton


// APIs
let now = new Date();    // import date object

let dateAndTimeValues = {
    year: now.getFullYear(),
    month: (now.getMonth()+1 < 10) ? `0${now.getMonth()+1}` : `${now.getMonth()+1}`,
    days:  (now.getDate() < 10) ? `0${now.getDate()}` : `${now.getDate()}`,
    hours: (now.getHours() < 10) ? `0${now.getHours()}`:`${now.getHours()}`,
    minutes: (now.getMinutes() < 10) ? `0${now.getMinutes()}` : `${now.getMinutes()}`,
    seconds: (now.getSeconds() < 10) ? `0${now.getSeconds()}` : `${now.getSeconds()}`,
};

const APIkey = `48278ae16970414d80043811240605`;         // API key     
const URLMoon = `http://api.weatherapi.com/v1/astronomy.json?key=${APIkey}&q=${searchInput.value}&dt=${now}`;  
const URLweather = `http://api.weatherapi.com/v1/current.json?key=${APIkey}&q=${searchInput.value}&aqi=yes`; 

async function getWeatherData(url) {
    const data = await fetch(url);
    return await data.json();       // return json response
}


locationAdderButton.addEventListener("click", () => {
    const locationName = searchInput.value;
    localStorage.setItem("city-name", locationName);
    const htmlcomponent =  ` <div class="location">
                                <div class="location-name">${locationName}</div><br>
                                    <div class="buttons">
                                        <i class="bi bi-eye" id="set-location"></i>
                                        <i class="bi bi-trash" id="put-location-to-trash"></i>
                                    </div>
                            </div>`;          // html component
    savedLocationBox.insertAdjacentHTML('beforeend', htmlcomponent);        // append the html component into the div
})

searchIconButton.addEventListener("click", async function()   {


    const completedataObject = {
        weatherdata: await getWeatherData(URLweather),
        lunardata: await getWeatherData(URLMoon)
    };     // json respone
    const { weatherdata, lunardata } = completedataObject;   // destructuring
    // weather data
    const resultString = JSON.stringify(weatherdata);
    const weatherObject = JSON.parse(resultString);     // javascript object
        // moon data
    const resultStringForMoon = JSON.stringify(lunardata);
    const lunardataobject = JSON.parse(resultStringForMoon);    

    // variables from extracted data
    const weatherData = {
        locationName: `${weatherObject["location"]["name"]} ${weatherObject["location"]["region"]}`,
        cityLatLong: `${weatherObject["location"]["lat"]}&deg;  ${weatherObject["location"]["lon"]}&deg;`,
        locationTime: `${weatherObject["location"]["localtime"]}`,
        weatherConditionImage: weatherObject["current"]["condition"]["icon"],
        weatherConditionVal: `${weatherObject["current"]["condition"]["text"]}`,
        windSpeedText: `${weatherObject["current"]["wind_kph"]}`,
        visibility: `${weatherObject["current"]["vis_km"]}`,
        cloudCoverPercent: `${weatherObject["current"]["cloud"]}`,
        uvindex: `${weatherObject["current"]["uv"]}`,
        aqival: `${weatherObject["current"]["air_quality"]["pm2_5"]}`,
        temperatureVal: `${weatherObject["current"]["temp_c"]}`,
        lastUpdateVal: `${weatherObject["current"]["last_updated"]}`,
        pressureVal:`${weatherObject["current"]["pressure_mb"]}`,
        humidityVal: `${weatherObject["location"]["humidity"]}`
    };

    const lunarData = {
        locationLatLon: `${lunardataobject["location"]["lat"]}&deg;/${lunardataobject["location"]["lon"]}&deg;`,
        ilumination: `${lunardataobject["astronomy"]["astro"]["moon_phase"]} (${lunardataobject["astronomy"]["astro"]["moon_illumination"]}%)`,
        sunriseTimeValue: `${lunardataobject["astronomy"]["astro"]["sunrise"]}`,
        sunsetTimeValue: `${lunardataobject["astronomy"]["astro"]["sunset"]}`,
        moonPhaseImage:  function (phaseName)  {
            let phase;
            switch(phaseName)     {
                case "New Moon":
                    phase = "/moon-phase/new-moon-96.png";       // new moon photo
                    break
                case "Waxing Crescent":
                    phase = "/moon-phase/waxing-cresent-moon-96.png";    // cresent moon
                    break;
                case "First Quarter":
                    phase = "/moon-phase/first-quarter-moon-96.png";    // first quarter moon
                    break;
                case "Waxing Gibbous":
                    phase = "/moon-phase/waxing-gibbous-moon-96.png";   // waxing gibbous moon
                    break;
                case "Full Moon":
                    phase = "/moon-phase/full-moon-96.png";         // full moon
                    fullMoonInfoButton.style.display = "block";
                    break;
                case "Waning Gibbous":
                    phase = "/moon-phase/waning-gibbous-96.png";      // wanning gibbous
                    break;
                case "Last Quarter":
                    phase = "/moon-phase/first-quarter-moon-96.png";    // last quarter moon
                    break;
                case "Waning Crescent":
                    phase = "/moon-phase/waning-crescent-moon-96.png";
                    break;
            }

            return phase;
        },
        moonriseValue: `${lunardataobject["astronomy"]["astro"]["moonrise"]}`,
        moonsetValue: `${lunardataobject["astronomy"]["astro"]["moonset"]}`
    };

    // destructuring object of weather
    const { locationName, cityLatLong, locationTime, 
        weatherConditionImage, weatherConditionVal, windSpeedText, 
        visibility, cloudCoverPercent, uvindex,
        aqival, temperatureVal, lastUpdateVal, pressureVal, humidityVal } = weatherData;

    // destructure lunar object
    const { locationLatLon, ilumination, 
        sunriseTimeValue, sunsetTimeValue, moonPhaseImage,
        moonriseValue, moonsetValue } = lunarData;   // destructuring lunar object

    /* weather info */
    weatherLocationText.innerText = `${locationName}`;
    latLonghtmlText.innerHTML = `${cityLatLong}`;
    /* background weather icon settings*/
    weatherIcon.style.background = `url(${weatherConditionImage})`;
    weatherIcon.style.backgroundRepeat = 'no-repeat';
    weatherIcon.style.backgroundPosition = 'center';
    weatherIcon.style.backgroundSize = '160px 160px';
    /* weather icon settings */
    airQualityIndexText.innerText = `AQI: ${aqival}`;
    temperatureText.innerHTML = `temperature: ${temperatureVal}&deg;C`;
    weatherConditionText.innerText = `${weatherConditionVal}`;
    coverText.innerHTML = `Cloud Cover: ${cloudCoverPercent}&percnt;`;
    uvindexText.innerHTML = `UV Index: ${uvindex}`;
    visibilityText.innerHTML = `Visibility: ${visibility} km`;
    lastUpdatedTimeText.innerText = `${lastUpdateVal}`;
    inputCityLocalTimeText.innerText = `${locationTime}`;
    windspeedText.innerText =  `wind speed: ${windSpeedText} km/h`;
    pressureText.innerText = `Pressure: ${pressureVal} mb`;
    humidityText.innerText =  `Humidity: ${humidityVal}%`;
    
    /* moon */
    locationLatLong.innerHTML = `${locationLatLon}`;
    moonInfoText.innerText = `${ilumination}`;
    sunRiseTimeText.innerText = `Sunrise: ${sunriseTimeValue}`;
    sunSetTimeText.innerText = `Sunset: ${sunsetTimeValue}`;
    moonRiseTimeText.innerText = `Moonrise: ${moonriseValue}`;
    moonSetTimeText.innerText = `Moonset: ${moonsetValue}`;
    moonImage.style.background = `url(${moonPhaseImage(lunardataobject["astronomy"]["astro"]["moon_phase"])})`;
    moonImage.style.backgroundSize = '210px';
    moonImage.style.backgroundPosition = 'center';

    // function end
});

// filter weeks opacity 
function shadeWeekDays()      {
    let array = Array.from(weekDayNodeList);   // convert node list into array
    switch(now.getDay())    {
        case 0:     
            array[0].style.opacity = "1";
            break;
        case 1:
            array[1].style.opacity = "1";
            break;
        case 2:
            array[2].style.opacity = "1";
            break;
        case 3:
            array[3].style.opacity = "1";
            break;
        case 4:
            array[4].style.opacity = "1";
            break;
        case 5:
            array[5].style.opacity = "1";
            break;
        case 6:
            array[6].style.opacity = "1";
            break;
    }
}

// full moon info modal
fullMoonInfoButton.addEventListener("click", () => {
    fullMoonNamesDialog.showModal();    // open dialog
});

fullMoonDialogCloseButton.addEventListener("click", () => {
    fullMoonNamesDialog.close();        // close dialog
});

function renderTimeAndDate()    {

    now = new Date();    // import date object
    dateAndTimeValues = {
        year: now.getFullYear(),
        month: (now.getMonth()+1 < 10) ? `0${now.getMonth()+1}` : `${now.getMonth()+1}`,
        days:  (now.getDate() < 10) ? `0${now.getDate()}` : `${now.getDate()}`,
        hours: (now.getHours() < 10) ? `0${now.getHours()}`:`${now.getHours()}`,
        minutes: (now.getMinutes() < 10) ? `0${now.getMinutes()}` : `${now.getMinutes()}`,
        seconds: (now.getSeconds() < 10) ? `0${now.getSeconds()}` : `${now.getSeconds()}`,
    };

    const { year, month, days, hours, minutes, seconds } = dateAndTimeValues;   // object destructuring
    currentDateText.innerText = `${year}-${month}-${days}`;
    currentTimeText.innerText = `${hours}-${minutes}-${seconds}`;

    shadeWeekDays();        // calling display week functions
};     

setInterval(renderTimeAndDate, 900);       // call the function every 1 second

function getLocation()  {
    if (navigator.geolocation)  {
        navigator.geolocation.getCurrentPosition(renderCurrentLatLong);  // callback function
    }
    else {
        console.log("location could not be supported by the browser!!");
    }
}

function renderCurrentLatLong(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    let LAT, LONG;

          // if latitude  are less than 0 degrees than we are in the
        // southern hemisphere or else if greater than 0 we are in north
    if (latitude < 0 && longitude < 0)  {
        LAT = `${latitude.toFixed(4)}&deg; S`;
        LONG = `${longitude.toFixed(4)}&deg; W`;
    }
    else if (latitude < 0 && longitude > 0)    {
        LAT = `${latitude.toFixed(4)}&deg; S`;
        LONG = `${latitude.toFixed(4)}&deg; E`;
    }
    else if (latitude > 0 && longitude < 0)    {
        LAT = `${latitude.toFixed(4)}&deg; N`;
        LONG = `${longitude.toFixed(4)}&deg; W`;
    }
    else if (latitude > 0 && longitude > 0)     {
        LAT = `${latitude.toFixed(4)}&deg; N`;
        LONG = `${longitude.toFixed(4)}&deg; E`;
    }

    const latlong_text = `${LAT} ${LONG}`;
    locationNameText.innerHTML = `Local time at ${latlong_text}`;
}

locationNavbutton.addEventListener("click", () => {
    locationWrapperDiv.style.display = "grid";
    timeClockWrapperDiv.style.display = "none";
    moonAndSunTrackerDiv.style.display = "none";
    weatherWrapperDiv.style.display = "none";
});

clockViewNavButton.addEventListener("click", () => {
    locationWrapperDiv.style.display = "none";
    timeClockWrapperDiv.style.display = "grid";
    moonAndSunTrackerDiv.style.display = "none";
    weatherWrapperDiv.style.display = "none";
});

weatherNavButton.addEventListener("click", () => {
    locationWrapperDiv.style.display = "none";
    timeClockWrapperDiv.style.display = "none";
    moonAndSunTrackerDiv.style.display = "none";
    weatherWrapperDiv.style.display = "block";
});

moonAndSunNavButton.addEventListener("click", () => {
    locationWrapperDiv.style.display = "none";
    timeClockWrapperDiv.style.display = "none";
    moonAndSunTrackerDiv.style.display = "grid";
    weatherWrapperDiv.style.display = "none";
});

getLocation();





