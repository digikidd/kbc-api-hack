/**
 * Created by kellycarmichael on 6/29/16.
 */
$(document).ready(function () {

    var tempUnit = false;
    //function to evaluate
    $('.tabs').click(function () {
        if($('#farenheit').css('display') == 'none')
        {
           tempUnit = true;
            console.log("farenheit is hidden");
        }
        else {
            console.log("celsius is hidden");
        }
    });

    //Getting user input and making AJAX GET.
    $('.waves-effect').click(function () {
        var tempFarenheit = "&units=imperial";
        var tempCelsius = "&units=metric";
        var title = $('.titleText').val ();
        var completeUrl = "";
        var baseURL = "http://api.openweathermap.org/data/2.5/weather?q=";
        var APIKEY = "&APPID=5b899b2dfcd111486e801f05f6530611";
        if (tempUnit) {
            completeUrl = baseURL + title + tempCelsius + APIKEY;
        }
        else {
            completeUrl = baseURL + title + tempFarenheit + APIKEY;
        }
        //var dayName = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        //var monthName = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        //AJAX GET in jQuery
        $.getJSON(completeUrl,function(data){
            var weatherArray = data.weather.main;

            //main.humidity
            //main.temp
            //
            //
            //
            //
            $('body').append('<div class="container"></div>');
            $('.container').append('<div class="row"></div>');
            $('.row').append('<div class="col s6">' + data.weather.main + '</div>');
            $('.row').append('<div class="col s6"></div>');


            //$('.film').last().append('<p>' + data.Country + '</p>');
        });
    });


});



