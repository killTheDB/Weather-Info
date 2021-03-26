var geoLat;
var geoLng;
var geoAcc;
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
            showWeather(response2);
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
        secondDiv.text(Math.ceil(response.main.temp) + "°")

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
        time.text(response.time_12)
    }
});

document.addEventListener("DOMContentLoaded", function () {

    var cityInput = $("#city");
    var cityButton = $("#button");

    cityButton.on("click", loadWeather);
    // cityButton.on("click", loadPhoto);

    function loadWeather() {
        var cityName = cityInput.val();

        var weatherUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&units=metric&appid=967ceca5dfb9d8a4dba23010c6e885a3';

        $.ajax({
            url: weatherUrl
        }).done(function (response) {
            console.log(response)
            showWeather(response);
        }).fail(function (error) {
            alert("Enter valid city name")
        })

    }

    // function loadPhoto() {
    //     var cityName = cityInput.val();
    //     var imageUrl = "https://pixabay.com/api/?key=6693953-e4507e0a76d195de0ac10cf8f&q=" + cityName + "&image_type=photo";
    //     $.ajax({
    //         url: imageUrl
    //     }).done(function (response) {
    //         console.log(response)
    //         showPhoto(response)
    //     }).fail(function (error) {
    //         console.log("Enter valid city name")
    //     })
    // }

    // function showPhoto(response) {
    //     $(".cityPhoto").html("<img src=" + response.hits[Math.floor(Math.random() * response.hits.length)].webformatURL + "/>")
    // }

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
            todayBg.css("background", "url('./images/clearday.jpg') no-repeat center/cover")
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
            console.log("no pic")
        }
        var secondDiv = $(".secondDiv").css("fontSize", "30");
        secondDiv.text(Math.ceil(response.main.temp) + "°")

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
    
    //      function viewWeather(elem) {
    //    for(var i = 0 ; i < elem; i++) {
    //        var li = $('<li>').text(elem.clouds);
    //        var h3 = $('<h3>').text(elem.name);
    //        addThis.append(li);
    //       addThis.append(h3);
    //    };
    //  }
    //    viewWeather();
})