var geoLat;
var geoLng;
var geoAcc;
$(document).ready(function () {
    $(document).bind("contextmenu", function (e) {
        alert('Contact me for source code')
        return false;
    });
});
document.onkeydown = function (e) {
        if (e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) {
        alert('Contact me for source code')
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) {
        alert('Contact me for source code')
        return false;
    }
    if (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) {
        alert('Contact me for source code')
        return false;
    }
}

$(document).ready(function () {
    if (navigator.geolocation) {
        // Request the current position
        // If successful, call getPosSuccess; On error, call getPosErr
        navigator.geolocation.getCurrentPosition(getPosSuccess, getPosErr);
    } else {
        alert('Geolocation not available!!');
        // IP address or prompt for city?
    }

    // getCurrentPosition: Successful return
    function getPosSuccess(pos) {
        // Get the coordinates and accuracy properties from the returned object
        geoLat = parseFloat(pos.coords.latitude.toFixed(5));
        geoLng = parseFloat(pos.coords.longitude.toFixed(5));
        geoAcc = pos.coords.accuracy.toFixed(1);
        console.log(geoLat)
        console.log(geoLng)

        var weatherUrl2 = 'https://api.openweathermap.org/data/2.5/weather?lat=' + geoLat + '&lon=' + geoLng + '&units=metric&appid=967ceca5dfb9d8a4dba23010c6e885a3';
        $.ajax({
            url: weatherUrl2
        }).done(function (response2) {
            console.log(response2)
            showWeather(response2)
            foreCast(response2)
        }).fail(function (error) {
            alert("Location Services currently not available")
        })

        var datetimeUrl = 'https://api.ipgeolocation.io/timezone?apiKey=e6c87eb235564535909983aa9fc6d07c&lat='+geoLat+'&long='+geoLng;
        $.ajax({
            url: datetimeUrl
        }).done(function (response3) {
            console.log(response3)
            showDateTime(response3);
        }).fail(function (error) {
            alert("Date and Time not available")
        })
    }

    // getCurrentPosition: Error returned
    function getPosErr(err) {
        switch (err.code) {
            case err.PERMISSION_DENIED:
                alert("User denied the request for Geolocation.");
                break;
            case err.POSITION_UNAVAILABLE:
                alert("Location information is unavailable.");
                break;
            case err.TIMEOUT:
                alert("The request to get user location timed out.");
                break;
            default:
                alert("An unknown error occurred.");
        }
    }

    function showWeather(response) {

        var firstDiv = $(".firstDiv h1");
        firstDiv.text(response.name)

        var weatherIcon = $(".weatherIcon");
        var todayBg = $(".todayBox");

        if (response.weather[0].description == "broken clouds") {
            weatherIcon.html('<img id="theImg" src="images/weather.png" />')
            todayBg.css("background", "url('./images/partlycloud.jpg') no-repeat center/cover")

        }

        else if (response.weather[0].description == "scattered clouds") {
            weatherIcon.html('<img id="theImg" src="images/weather.png" />')
            todayBg.css("background", "url('./images/partlycloud.jpg') no-repeat center/cover")
        }

        else if (response.weather[0].description == "light intensity shower rain") {
            weatherIcon.html('<img id="theImg" src="images/storm.jpg" />')
            todayBg.css("background", "url('./images/rain.jpg') no-repeat center/cover")
        }

        else if (response.weather[0].description == "clear sky") {
            weatherIcon.html('<img id="theImg" src="images/sunrise.png" />')
            todayBg.css("background", "url('./images/clearday.jpg') no-repeat center/cover")
        }

        else if (response.weather[0].description == "light rain") {
            weatherIcon.html('<img id="theImg" src="images/storm.jpg" />')
            todayBg.css("background", "url('./images/rain.jpg') no-repeat center/cover")
        }

        else if (response.weather[0].description == "few clouds") {
            weatherIcon.html('<img id="theImg" src="images/weather.jpg" />')
        }

        else if (response.weather[0].description == "mist") {
            weatherIcon.html('<img id="theImg" src="images/weather.png" />')
            todayBg.css("background", "url('./images/mistAnimation.png') no-repeat center/cover")
            firstDiv.css("color", "darkblue")
            todayBg.css("opacity", "0.8")
        }
        else if (response.weather[0].description == "fog") {
            weatherIcon.html('<img id="theImg" src="images/weather.png" />')
            todayBg.css("background", "url('./images/fog.jpg') no-repeat center/cover")
            firstDiv.css("color", "#404040")
            todayBg.css("opacity", "0.9")
        }
        else if (response.weather[0].description == "rain") {
            weatherIcon.html('<img id="theImg" src="images/weather.png" />')
            todayBg.css("background", "url('./images/rain.jpg') no-repeat center/cover")
        }
        else if (response.weather[0].description == "haze") {
            weatherIcon.html('<img id="theImg" src="images/weather.png" />')
            todayBg.css("background", "url('./images/sunset.jpg') no-repeat center/cover")
        }
        else {
            console.log("no pic")
        }
        var secondDiv = $(".secondDiv").css("fontSize", "30");
        secondDiv.text(Math.ceil(response.main.temp) + "°C")

        var aboutbox = $(".aboutTitle")
        aboutbox.text(response.name)

        var weatherDesc = $(".weatherDescription")
        weatherDesc.html('<img id="theImg" src="./images/weather.png" />' + response.weather[0].description)

        var hum = $(".humidity")
        hum.html('<img id="theImg" src="./images/humidity.png" />' + response.main.humidity + " %")

        var wind = $(".wind")
        wind.html('<img id="theImg" src="./images/windy.png" />' + response.wind.speed + " m/s")

        var press = $(".pressure")
        press.html('<img id="theImg" src="./images/pressure.png" />' + response.main.pressure + " hPa")
    }

    function showDateTime(response){
        var date = $(".date h4")
        var time = $(".time h4")

        date.text(response.date)
        date.css("color","whitesmoke")
        time.text(response.time_12)
        time.css("color", "whitesmoke")
    }

    function foreCast(response) {
        var geoLon = response.coord.lon;
        var geoLat = response.coord.lat;
        var forecastUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + geoLat + '&lon=' + geoLon + '&exclude=hourly,minutely,alerts,current&units=metric&appid=967ceca5dfb9d8a4dba23010c6e885a3';

        $.ajax({
            url: forecastUrl
        }).done(function (forecastresponse) {
            console.log(forecastresponse)
            displayForecast(forecastresponse);
        }).fail(function (error) {
            alert("Forecast unavailable")
        })
    }

    function displayForecast(forecastresponse) {

        var unixTimeStamp = forecastresponse.daily[1].dt;
        document.getElementById('day1').innerHTML = displayDate(forecastresponse.daily[1].dt);
        document.getElementById('day2').innerHTML = displayDate(forecastresponse.daily[2].dt);
        document.getElementById('day3').innerHTML = displayDate(forecastresponse.daily[3].dt);
        document.getElementById('day4').innerHTML = displayDate(forecastresponse.daily[4].dt);
        document.getElementById('day5').innerHTML = displayDate(forecastresponse.daily[5].dt);
        document.getElementById('day6').innerHTML = displayDate(forecastresponse.daily[6].dt);
        document.getElementById('day7').innerHTML = displayDate(forecastresponse.daily[7].dt);

        document.getElementById('cell1-1').innerHTML = forecastresponse.daily[1].temp.min + " °C";
        document.getElementById('cell2-1').innerHTML = forecastresponse.daily[1].temp.max + " °C";
        document.getElementById('cell3-1').innerHTML = forecastresponse.daily[1].humidity + " %";
        document.getElementById('cell4-1').innerHTML = forecastresponse.daily[1].pressure + " hPa";

        document.getElementById('cell1-2').innerHTML = forecastresponse.daily[2].temp.min + " °C";
        document.getElementById('cell2-2').innerHTML = forecastresponse.daily[2].temp.max + " °C";
        document.getElementById('cell3-2').innerHTML = forecastresponse.daily[2].humidity + " %";
        document.getElementById('cell4-2').innerHTML = forecastresponse.daily[2].pressure + " hPa";

        document.getElementById('cell1-3').innerHTML = forecastresponse.daily[3].temp.min + " °C";
        document.getElementById('cell2-3').innerHTML = forecastresponse.daily[3].temp.max + " °C";
        document.getElementById('cell3-3').innerHTML = forecastresponse.daily[3].humidity + " %";
        document.getElementById('cell4-3').innerHTML = forecastresponse.daily[3].pressure + " hPa";

        document.getElementById('cell1-4').innerHTML = forecastresponse.daily[4].temp.min + " °C";
        document.getElementById('cell2-4').innerHTML = forecastresponse.daily[4].temp.max + " °C";
        document.getElementById('cell3-4').innerHTML = forecastresponse.daily[4].humidity + " %";
        document.getElementById('cell4-4').innerHTML = forecastresponse.daily[4].pressure + " hPa";

        document.getElementById('cell1-5').innerHTML = forecastresponse.daily[5].temp.min + " °C";
        document.getElementById('cell2-5').innerHTML = forecastresponse.daily[5].temp.max + " °C";
        document.getElementById('cell3-5').innerHTML = forecastresponse.daily[5].humidity + " %";
        document.getElementById('cell4-5').innerHTML = forecastresponse.daily[5].pressure + " hPa";

        document.getElementById('cell1-6').innerHTML = forecastresponse.daily[6].temp.min + " °C";
        document.getElementById('cell2-6').innerHTML = forecastresponse.daily[6].temp.max + " °C";
        document.getElementById('cell3-6').innerHTML = forecastresponse.daily[6].humidity + " %";
        document.getElementById('cell4-6').innerHTML = forecastresponse.daily[6].pressure + " hPa";

        document.getElementById('cell1-7').innerHTML = forecastresponse.daily[7].temp.min + " °C";
        document.getElementById('cell2-7').innerHTML = forecastresponse.daily[7].temp.max + " °C";
        document.getElementById('cell3-7').innerHTML = forecastresponse.daily[7].humidity + " %";
        document.getElementById('cell4-7').innerHTML = forecastresponse.daily[7].pressure + " hPa";
    }

    function displayDate(unixTimeStamp) {
        var date = parseInt(unixTimeStamp) * 1000;
        const dateObject = new Date(date)
        var humanDay = dateObject.toLocaleString("en-US", { day: "2-digit" })
        var humanMonth = dateObject.toLocaleString("en-US", { month: "2-digit" })
        var humanYear = dateObject.toLocaleString("en-US", { year: "numeric" })
        var humanWeek = dateObject.toLocaleString("en-US", { weekday: "short" })
        // console.log(typeof(humanYear))

        return humanDay + "/" + humanMonth + "/" + humanYear + " " + humanWeek

    }
});

document.addEventListener("DOMContentLoaded", function () {

    var cityInput = $("#city");
    var cityButton = $("#button");
    var selectCelButton = $("#celsius");
    var selectFahrenButton = $("#fahrenheit");
    selectCelButton.on("click",selectCelUnits);
    function selectCelUnits(){
        console.log(selectCelButton.val());
        // cityButton.on("click", loadWeatherCel);
        loadWeatherCel();
    }
    selectFahrenButton.on("click",selectFahrenUnits);
    function selectFahrenUnits(){
        // cityButton.on("click", loadWeatherFahren);
        loadWeatherFahren();
    }
    cityButton.on("click", loadWeatherCel);
    cityButton.on("click", foreCast);
    // cityButton.on("click", loadPhoto);

    function loadWeatherCel() {
        var cityName = cityInput.val();
        var weatherUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&units=metric&appid=967ceca5dfb9d8a4dba23010c6e885a3';

        $.ajax({
            url: weatherUrl
        }).done(function (response) {
            console.log(response)
            dateTime(response)
            showWeather(response)
            foreCast(response)
        }).fail(function (error) {
            alert("Enter valid city name")
        })

    }

    function loadWeatherFahren() {
        var cityName = cityInput.val();
        var weatherUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&units=imperial&appid=967ceca5dfb9d8a4dba23010c6e885a3';

        $.ajax({
            url: weatherUrl
        }).done(function (response) {
            console.log(response)
            dateTime(response)
            showWeather(response)
            foreCast(response)
        }).fail(function (error) {
            alert("Enter valid city name")
        })

    }

    
    function dateTime(response) {
        var geoLat = response.coord.lat
        var geoLon = response.coord.lon
        var datetimeUrl = 'https://api.ipgeolocation.io/timezone?apiKey=e6c87eb235564535909983aa9fc6d07c&lat=' + geoLat + '&long=' + geoLon;
        $.ajax({
            url: datetimeUrl
        }).done(function (response3) {
            console.log(response3)
            showDateTime(response3)
        }).fail(function (error) {
            alert("Date and Time not available")
        })
    }

    function showDateTime(response) {
        var date = $(".date h4")
        var time = $(".time h4")

        date.text(response.date)
        date.css("color", "whitesmoke")
        time.text(response.time_12)
        time.css("color", "whitesmoke")
    }

    function showWeather(response) {

        var firstDiv = $(".firstDiv h1");
        firstDiv.text(response.name)

        

        var weatherIcon = $(".weatherIcon");
        var todayBg = $(".todayBox");

        if (response.weather[0].description == "broken clouds") {
            weatherIcon.html('<img id="theImg" src="images/weather.png" />')
            todayBg.css("background", "url('./images/partlycloud.jpg') no-repeat center/cover")
        }

        else if (response.weather[0].description == "scattered clouds") {
            weatherIcon.html('<img id="theImg" src="images/weather.png" />')
            todayBg.css("background", "url('./images/partlycloud.jpg') no-repeat center/cover")
        }

        else if (response.weather[0].description == "light intensity shower rain") {
            weatherIcon.html('<img id="theImg" src="images/storm.jpg" />')
            todayBg.css("background", "url('./images/rain.jpg') no-repeat center/cover")
        }

        else if (response.weather[0].description == "clear sky") {
            weatherIcon.html('<img id="theImg" src="images/sunrise.jpg" />')
            // todayBg.css("background", "url('./images/clearday.jpg') no-repeat center/cover")
        }

        else if (response.weather[0].description == "light rain") {
            weatherIcon.html('<img id="theImg" src="images/storm.jpg" />')
            todayBg.css("background", "url('./images/rain.jpg') no-repeat center/cover")
        }

        else if (response.weather[0].description == "few clouds") {
            weatherIcon.html('<img id="theImg" src="images/weather.jpg" />')
            todayBg.css("background", "url('./images/partlycloud.jpg') no-repeat center/cover")
        }

        else if (response.weather[0].description == "mist") {
            weatherIcon.html('<img id="theImg" src="images/weather.png" />')
            todayBg.css("background", "url('./images/mistAnimation.png') no-repeat center/cover")
            firstDiv.css("color", "darkblue")
            todayBg.css("opacity", "0.8")
        }
        else if (response.weather[0].description == "fog") {
            weatherIcon.html('<img id="theImg" src="images/weather.png" />')
            todayBg.css("background", "url('./images/fog.jpg') no-repeat center/cover")
            firstDiv.css("color", "#404040")
            todayBg.css("opacity", "0.9")
        }
        else if (response.weather[0].description == "rain") {
            weatherIcon.html('<img id="theImg" src="images/weather.png" />')
            todayBg.css("background", "url('./images/rain.jpg') no-repeat center/cover")
        }

        else {
            console.log("no pic");
            todayBg.css("background", "url('./images/bg.jpg') no-repeat center/cover")
        }
        var secondDiv = $(".secondDiv").css("fontSize", "30");
        secondDiv.text(Math.ceil(response.main.temp) + "°C")

        var aboutbox = $(".aboutTitle")
        aboutbox.text(response.name)

        var weatherDesc = $(".weatherDescription")
        weatherDesc.html('<img id="theImg" src="./images/weather.png" />' + response.weather[0].description)

        var hum = $(".humidity")
        hum.html('<img id="theImg" src="./images/humidity.png" />' + response.main.humidity + " %")

        var wind = $(".wind")
        wind.html('<img id="theImg" src="./images/windy.png" />' + response.wind.speed + " m/s")

        var press = $(".pressure")
        press.html('<img id="theImg" src="./images/pressure.png" />' + response.main.pressure + " hPa")
    }

    function foreCast(response){
        var geoLon = response.coord.lon;
        var geoLat = response.coord.lat;
        var forecastUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat='+geoLat+'&lon='+geoLon+'&exclude=hourly,minutely,alerts,current&units=metric&appid=967ceca5dfb9d8a4dba23010c6e885a3';

        $.ajax({
            url: forecastUrl
        }).done(function (forecastresponse) {
            console.log(forecastresponse)
            displayForecast(forecastresponse);
        }).fail(function (error) {
            alert("Forecast unavailable")
        })
    }

    function displayForecast(forecastresponse){

        var unixTimeStamp = forecastresponse.daily[1].dt;
        document.getElementById('day1').innerHTML = displayDate(forecastresponse.daily[1].dt);
        document.getElementById('day2').innerHTML = displayDate(forecastresponse.daily[2].dt);
        document.getElementById('day3').innerHTML = displayDate(forecastresponse.daily[3].dt);
        document.getElementById('day4').innerHTML = displayDate(forecastresponse.daily[4].dt);
        document.getElementById('day5').innerHTML = displayDate(forecastresponse.daily[5].dt);
        document.getElementById('day6').innerHTML = displayDate(forecastresponse.daily[6].dt);
        document.getElementById('day7').innerHTML = displayDate(forecastresponse.daily[7].dt);

        document.getElementById('cell1-1').innerHTML = forecastresponse.daily[1].temp.min +" °C";
        document.getElementById('cell2-1').innerHTML = forecastresponse.daily[1].temp.max +" °C";
        document.getElementById('cell3-1').innerHTML = forecastresponse.daily[1].humidity+" %";
        document.getElementById('cell4-1').innerHTML = forecastresponse.daily[1].pressure+" hPa";

        document.getElementById('cell1-2').innerHTML = forecastresponse.daily[2].temp.min +" °C";
        document.getElementById('cell2-2').innerHTML = forecastresponse.daily[2].temp.max +" °C";
        document.getElementById('cell3-2').innerHTML = forecastresponse.daily[2].humidity+" %";
        document.getElementById('cell4-2').innerHTML = forecastresponse.daily[2].pressure+" hPa";
        
        document.getElementById('cell1-3').innerHTML = forecastresponse.daily[3].temp.min +" °C";
        document.getElementById('cell2-3').innerHTML = forecastresponse.daily[3].temp.max +" °C";
        document.getElementById('cell3-3').innerHTML = forecastresponse.daily[3].humidity+" %";
        document.getElementById('cell4-3').innerHTML = forecastresponse.daily[3].pressure+" hPa";

        document.getElementById('cell1-4').innerHTML = forecastresponse.daily[4].temp.min +" °C";
        document.getElementById('cell2-4').innerHTML = forecastresponse.daily[4].temp.max +" °C";
        document.getElementById('cell3-4').innerHTML = forecastresponse.daily[4].humidity+" %";
        document.getElementById('cell4-4').innerHTML = forecastresponse.daily[4].pressure+" hPa";

        document.getElementById('cell1-5').innerHTML = forecastresponse.daily[5].temp.min +" °C";
        document.getElementById('cell2-5').innerHTML = forecastresponse.daily[5].temp.max +" °C";
        document.getElementById('cell3-5').innerHTML = forecastresponse.daily[5].humidity+" %";
        document.getElementById('cell4-5').innerHTML = forecastresponse.daily[5].pressure+" hPa";

        document.getElementById('cell1-6').innerHTML = forecastresponse.daily[6].temp.min +" °C";
        document.getElementById('cell2-6').innerHTML = forecastresponse.daily[6].temp.max +" °C";
        document.getElementById('cell3-6').innerHTML = forecastresponse.daily[6].humidity+" %";
        document.getElementById('cell4-6').innerHTML = forecastresponse.daily[6].pressure+" hPa";

        document.getElementById('cell1-7').innerHTML = forecastresponse.daily[7].temp.min +" °C";
        document.getElementById('cell2-7').innerHTML = forecastresponse.daily[7].temp.max +" °C";
        document.getElementById('cell3-7').innerHTML = forecastresponse.daily[7].humidity+" %";
        document.getElementById('cell4-7').innerHTML = forecastresponse.daily[7].pressure+" hPa";
    }

    function displayDate(unixTimeStamp){
        var date = parseInt(unixTimeStamp) * 1000;
        const dateObject = new Date(date)
        var humanDay = dateObject.toLocaleString("en-US", { day: "2-digit" })
        var humanMonth = dateObject.toLocaleString("en-US", { month: "2-digit" })
        var humanYear = dateObject.toLocaleString("en-US", { year: "numeric" })
        var humanWeek = dateObject.toLocaleString("en-US", { weekday: "short" })
        // console.log(typeof(humanYear))

        return humanDay+"/"+humanMonth+"/"+humanYear+" "+humanWeek

    }
})