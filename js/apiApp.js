/**
 * Created by kellycarmichael on 6/29/16.
 */
$ (document).ready (function () {

    $('.modal-trigger').leanModal();

    function userInput (theCity, tempUnit) {
        this.city = $ ('.titleText').val ();
        this.tempUnit = "&units=" + tempUnit;
        this.baseURL = "http://api.openweathermap.org/data/2.5/forecast?q=";
        this.APIKEY = "&APPID=5b899b2dfcd111486e801f05f6530611";
        this.completeUrl = this.baseURL + this.city + this.tempUnit + this.APIKEY;
        this.imperial = {"wind": " mph", "temp": " F°"};
        this.metric = {"wind": " mps", "temp": " C°"};
    }

    function weatherForecast () {
        this.forecastDate = [];
        this.forecastTemp = [];
        this.forecastMain = [];
        this.forecastIcon = [];
        this.forecastHumidity = [];
    }

    $ ('.waves-effect').click (function () {
        var theCity = $ ('.titleText').val ();
        var tempUnit = "";
        var preLi = '<li class="weather-list" style=transform:translateX(0px);opacity:0;><h5><p class="wInfo">';
        var postLi = '</p></h5></li>';
        var preIconLi = '<li class="weather-list" style=transform:translateX(0px);opacity:0;><h5><p class="wIcon">';
        var postIconLi = '</p></h5></li>';
        if (theCity == "") {
            alert("Please enter a city.");
        }
        if ($ ('#imperial').css ('display') == 'none') {
            tempUnit = "metric";
        }
        else {
            tempUnit = "imperial";
        }
        weatherInfo = new userInput (theCity, tempUnit);
        $.get (weatherInfo.completeUrl, function (json) {
            //console.log(json.list);
            var weatherIcon = '<img class="wPic" src=' + "http://openweathermap.org/img/w/" + json.list[0].weather[0].icon + ".png" + '>';
            var lis = document.querySelectorAll ('#currentWeather li');
            for (var i = 0; li = lis[i]; i++) {
                li.parentNode.removeChild (li);
            }

            document.getElementById ('cityName').innerText = "";
            $('.tdSpan').empty();

            var arrayLength = json.list.length;
            forecast = new weatherForecast ();
            //console.log (json.list);
            for (var idx = 0; idx < arrayLength; idx++) {
                //console.log (idx);
                newDate = new Date (json.list[idx].dt_txt);
                if (newDate.getHours () == 15) {
                    forecast.forecastDate.push (newDate);
                    forecast.forecastTemp.push (json.list[idx].main.temp);
                    forecast.forecastMain.push (json.list[idx].weather[0].main);
                    forecast.forecastIcon.push (json.list[idx].weather[0].icon);
                    forecast.forecastHumidity.push (json.list[idx].main.humidity);
                }
            }
            $ ('#cityName').append (json.city.name + ", " + json.city.country);
            $ ('#currentWeather').append (preIconLi + "Current Weather" + postIconLi);
            $ ('#currentWeather').append (preIconLi + weatherIcon + postIconLi);

            if (tempUnit == "imperial") {
                $ ('#currentWeather').append (preLi + "Temperature: " + Math.round (json.list[0].main.temp) + weatherInfo.imperial.temp + postLi);
                $ ('#currentWeather').append (preLi + "Wind Speed: " + json.list[0].wind.speed + weatherInfo.imperial.wind + postLi);
                $ ('#currentWeather').append (preLi + "Wind Direction: " + degToCard (json.list[0].wind.deg) + postLi);
                wForecast(tempUnit);
            }
            else {
                $ ('#currentWeather').append (preLi + "Temperature: " + Math.round (json.list[0].main.temp) + weatherInfo.metric.temp + postLi);

                $ ('#currentWeather').append (preLi + "Wind Speed: " + json.list[0].wind.speed + weatherInfo.metric.wind + postLi);
                 $ ('#currentWeather').append (preLi + "Wind Direction: " + degToCard (json.list[0].wind.deg) + postLi);
                wForecast(tempUnit);
            }
            $ ('#currentWeather').append (preLi + "Humidty: " + json.list[0].main.humidity + " %" + postLi);
            $("#forecast").show(1000);

            Materialize.showStaggeredList ('#currentWeather');

            function wForecast (tempunit) {

                var arrayLen = forecast.forecastDate.length - 1;
                var cntr = 1;

                for (var index = 0; index <= arrayLen; ++index) {
                    var tempDate = new Date(forecast.forecastDate[index]);
                    var newMonth = tempDate.getUTCMonth() + 1; //months from 1-12
                    var newDay = tempDate.getUTCDate();
                    var weekDay = tempDate.getUTCDay();
                    var daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
                    var newYear = tempDate.getUTCFullYear();
                    $('#day' + cntr).append('<td><span class="tdSpan">' + '<h5>' + daysOfWeek[weekDay] + '</h5>' + newMonth + '/' + newDay + '</span></td>');
                    $('#day' + cntr).append('<td><span class="tdSpan"><img class="wPic" src=' + "http://openweathermap.org/img/w/" + forecast.forecastIcon[index] + ".png" + '>' + '</span></td>');
                    $('#day' + cntr).append('<td><span class="tdSpan">' + '<h5>Description: </h5>' + forecast.forecastMain[index] + '</span></td>');
                    if (tempunit == "imperial") {
                        $('#day' + cntr).append('<td><span class="tdSpan">' + '<h5>Temp: </h5>' + Math.round(forecast.forecastTemp[index]) + weatherInfo.imperial.temp + '</span></td>');
                    }
                    else {
                        $('#day' + cntr).append('<td><span class="tdSpan">' + "Temp: " + Math.round(forecast.forecastTemp[index]) + weatherInfo.metric.temp + '</span></td>');
                    }
                    $('#day' + cntr).append('<td><span class="tdSpan">' + '<h5>Humidity: </h5>' + forecast.forecastHumidity[index] + "%" + '</span></td>');
                    ++cntr;
                }
            }

        });

    });


});

