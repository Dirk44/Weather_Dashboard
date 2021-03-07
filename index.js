
$(document).ready(function () {

    const searchBtn = document.getElementById("search-button");
    const current = document.getElementById("today");
    const cityName = document.getElementById("city");
    const date = document.getElementById("date");
    const currentTemp = document.getElementById("temp");
    const currentHumidity = document.getElementById("humidity");
    const currentWind = document.getElementById("wind");
    const tempMin = document.getElementById("temp-min");
    const tempMax = document.getElementById("temp-max");
    const imgIcon = document.getElementById("icon");
    const history = document.getElementById("history");

    const searchedCities = JSON.parse(localStorage.getItem("savedContent")) || [];

    var currentDate = new Date().toLocaleDateString("en-US");

    const key = "f33cb88be12584833951fc21673d4cde";
    const callUrl = "http://api.openweathermap.org/data/2.5/weather?q=";
    const callUrl2 = "http://api.openweathermap.org/data/2.5/forecast?q=";
    const callUrl3 = "http://api.openweathermap.org/data/2.5/uvi?"
    // function load() {

    // }

    $("#history").on("click", "li", function () {
        getWeather($(searchVal).text())
    });

    function makeRow(text) {
        var li = $("<li>").addClass("list-group-item list-group-item-action").text(text);
        $(".history").append(li);
    }






    $(searchBtn).on("click", function (event) {
        event.preventDefault();
        const searchVal = document.getElementById("search-value");
        const searchedCity = $(searchVal).val();


        $(searchVal).val("");


        getWeather(searchedCity);


    });






    function getWeather(searchVal) {
        $.ajax({
            type: "GET",
            url: callUrl + searchVal + `&units=imperial&appid=${key}`,
        }).then(function (city) {

            makeRow(searchVal);

            cityName.textContent = city.name + "(" + currentDate + ")";

            const iconName = city.weather[0].icon;
            const appIcon = `<img src="http://openweathermap.org/img/wn/${iconName}@2x.png"id="icons">`;

            currentTemp.textContent = ("Temperature:  " + city.main.temp + ("º F"));
            currentHumidity.textContent = ("Humidity:  " + city.main.humidity + ("%"));
            currentWind.textContent = ("Wind Speed:  " + city.wind.speed + (" mph"));
            tempMin.textContent = ("Low:  " + city.main.temp_min + ("º F"));
            tempMax.textContent = ("High:  " + city.main.temp_max + ("º F"));
            $(cityName).append(appIcon);



            updatedForecast(searchVal);
            callUvIndex(city.coord.lat, city.coord.lon);

        })
    }






    function updatedForecast(searchVal) {

        $.ajax({
            type: "GET",
            url: callUrl2 + searchVal + `&units=imperial&appid=${key}`,
            success: function (data) {

                $("#forecast").html("<h4 class=\"mt-3\">5-Day Forecast:</h4>").append("<div class=\"row\">");

                //loop over forecasted array
                for (var i = 0; i < data.list.length; i++) {

                    if (data.list[i].dt_txt.indexOf("12:00:00") !== -1) {

                                 //creating html elements
                        var col = $("<div>").addClass("col-md-2");
                        var card = $("<div>").addClass("card bg-primary text-white");
                        var cardBody = $("<div>").addClass("card-body p-2");
                        var city = $("<div>").addClass("card-title").text(new Date(data.list[i].dt_txt).toLocaleDateString());
                        var weatherIcon = $("<img>").attr("src", "http://openweathermap.org/img/wn/" + data.list[i].weather[0].icon + "@2x.png");
                        var temp = $("<p>").addClass("card-text").text("Temperature: " + data.list[i].main.temp + "º F");
                        var humidity = $("<p>").addClass("card-text").text("Humidity: " + data.list[i].main.humidity + ("%"));

                        //add to page
                        col.append(card.append(cardBody.append(city, weatherIcon, temp, humidity)));
                        $("#forecast .row").append(col);


                    }
                }
            }
        });
    }

    function callUvIndex(lat, lon) {
        $.ajax({
            type: "GET",
            url: callUrl3 + `appid=${key}&lat=` + lat + "&lon=" + lon,
            success: function (data) {

                $("#uv-index").append(data.value);


            }
        })
    }

})






