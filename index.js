


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

// function load() {

// }


$(document).ready(function () {

    
    $(searchBtn).on("click", function (event) {
        const searchVal = document.getElementById("search-value");
        event.preventDefault();
        const searchedCity = $(searchVal).val();
        console.log(searchedCity);

        $(searchVal).val("");


        getWeather(searchedCity);
    });
       




        function getWeather(searchVal) {
            $.ajax({
                type: "GET",
                url: callUrl + searchVal + `&units=imperial&appid=${key}`,
                dataType: "json"
            }).then(function (city) {
                cityName.textContent = city.name + "(" + currentDate + ")";
                
                const iconName = city.weather[0].icon;
                const appIcon = `<img src="http://openweathermap.org/img/wn/${iconName}@2x.png"id="icons">`;
                
                currentTemp.textContent = ("Temperature:  " + city.main.temp + ("º F"));
                currentHumidity.textContent = ("Humidity:  " + city.main.humidity + ("%"));
                currentWind.textContent = ("Wind Speed:  " + city.wind.speed + (" mph"));
                tempMin.textContent = ("Low:  " + city.main.temp_min + ("º F"));
                tempMax.textContent = ("High:  " + city.main.temp_max + ("º F"));
                $(cityName).append(appIcon);

                console.log(city);
                updatedForecast(searchVal);

            })
        }

        // requestedCity(searchedCity)
        //     .then((data) => {
        //         updateWeather(data);
        //         console.log(data);
        //     })

        //     .catch((err) => {
        //         console.log(err);
        //     });
        // })

        //         $(searchBtn).on("click", (event) => {
        //             event.preventDefault();
        //             const searchedCity = searchVal.value.trim();
        //             console.log(searchedCity);

        //             $(searchVal).val("");

        //         updateForecast(searchedCity)
        //         .then((fore) => {
        //             appendForecast(fore);
        //             console.log(fore);
        //         })  

        //     .catch((err) => {
        //         console.log(err);
        //     });

        // })
        // })



        // updateWeather = (city) => {
        //     cityName.textContent = city.name + " (" + currentDate + ")";
        //     const iconName = city.weather[0].icon;
        //     const appIcon = `<img src="http://openweathermap.org/img/wn/${iconName}@2x.png"id="icons">`;
        //     currentTemp.textContent = ("Temperature:  " + city.main.temp + ("º F"));
        //     currentHumidity.textContent = ("Humidity:  " + city.main.humidity + ("%"));
        //     currentWind.textContent = ("Wind Speed:  " + city.wind.speed + (" mph"));
        //     tempMin.textContent = ("Low:  " + city.main.temp_min + ("º F"));
        //     tempMax.textContent = ("High:  " + city.main.temp_max + ("º F"));
        //     $(cityName).append(appIcon);

        //     console.log(iconName);

        // }




        function updatedForecast(searchVal) {

            $.ajax({
                type: "GET",
                url: callUrl2 + searchVal + `&units=imperial&appid=${key}`,
                dataType: "json",
                success: function (data) {

                //loop over forecasted array
                for (var i = 0; i < data.list.length; i++) {
                    console.log(data);
                    if (data.list[i].dt_text.indexOf("12:00:00") !== -1) {

                        //creating html elements
                        const col = $("div>").addClass("col-md-2");
                        const card = $("<div>").addClass("card bg-primary text-white");
                        const cardBody = $("<div>").addClass("card-body p-2");
                        const city = $("<div>").addClass("card-title").text(data.list[i].dt_text).toLocaleDateString();
                        const weatherIcon = $("<img>").attr("src", "http://openweathermap.org/img/wn/" + data.list[i].weather[0].icon + "@2x.png");
                        const temp = $("<p>").addClass("card-text").text("Temperature: " + data.list[i].main.temp + "º F");
                        const humidity = $("<p>").addClass("card-text").text("Humidity: " + data.list[i].main.humidity + ("%"));

                        //add to page
                        col.append(card.append(cardBody.append(city, weatherIcon, temp, humidity)));
                        $("#forecast .row").append(col);

                        
                    }
                    
                }
                
            }
        });
        }

    
})






