


var searchVal = document.getElementById("search-value");
var searchBtn = document.getElementById("search-button");
var current = document.getElementById("today");
var cityName = document.getElementById("city");
var currentDate = document.getElementById("date");
var currentTemp = document.getElementById("temp");
var currentHumidity = document.getElementById("humidity");
var currentWind = document.getElementById("wind");
var searchedCityList = document.getElementById("searched-cities");
var tempMin = document.getElementById("temp-min");
var tempMax = document.getElementById("temp-max");
var imgIcon = document.getElementById("icon");


var searchedCities = JSON.parse(localStorage.getItem("savedContent")) || [];

var currentDate = new Date().toLocaleDateString("en-US");


// $(searchBtn).on("click", (event) => {
//     event.preventDefault();
//     const searchedCity = searchVal.value.trim();
//     console.log(searchedCity);

//     $(searchVal).val("");

//     requestedCity(searchedCity)
//         .then((data) => {
//             updateWeather(data);
//             console.log(data);
//         })

//         .catch((err) => {
//             console.log(err);
//         });
        
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



updateWeather = (city) => {
    cityName.textContent = city.name + " (" + currentDate + ")";
    const iconName = city.weather[0].icon;
    const appIcon = `<img src="http://openweathermap.org/img/wn/${iconName}@2x.png"id="icons">`;
    currentTemp.textContent = ("Temperature:  " + city.main.temp + ("º F"));
    currentHumidity.textContent = ("Humidity:  " + city.main.humidity + ("%"));
    currentWind.textContent = ("Wind Speed:  " + city.wind.speed + (" mph"));
    tempMin.textContent = ("Low:  " + city.main.temp_min + ("º F"));
    tempMax.textContent = ("High:  " + city.main.temp_max + ("º F"));
    $(cityName).append(appIcon);

    console.log(iconName);

}




function updatedForecast(searchedCity) {

    $.ajax({
        type: "GET",
        url: "http://api.openweathermap.org/data/2.5/forecast?q=" + searchedCity + "&units=imperial&appid=f33cb88be12584833951fc21673d4cde",
        dataType: "json"
    }).then(function(data) {

                //loop over foreacsted array
                for (var i = 0; i < data.list.length; i++) {
                            console.log("After array");
                    if (data.list[i].dt_text.indexOf("12:00:00") !== -1) {

                        //creating html elements
                        const col = $("div>").addClass("col-md-2");
                        const card = $("<div>").addClass("card bg-primary text-white");
                        const cardBody = $("<div>").addClass("card-body p-2");
                        const city = $("<div>").addClass("card-title").text(currentDate(data.list[i].dt_text).toLocaleDateString());
                        const weatherIcon = $("<img>").attr("src", "http://openweathermap.org/img/wn/" + data.list[i].weather[0].icon + "@2x.png");
                        const temp = $("<p>").addClass("card-text").text("Temperature: " + data.list[i].main.temp + "º F");
                        const humidity = $("<p>").addClass("card-text").text("Humidity: " + data.list[i].main.humidity + ("%"));

                        //add to page
                        col.append(card.append(cardBody.append(city, weatherIcon, temp, humidity)));
                        $(".row").append(col);
                    }
                }
                console.log(searchVal);
            });
        }
        
updatedForecast();









