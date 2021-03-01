
const key = "f33cb88be12584833951fc21673d4cde";


const requestedCity = async (city) => {
    const callUrl = "http://api.openweathermap.org/data/2.5/weather";
    const query1 = `?q=${city}&units=imperial&appid=${key}`;
    
    const response = await fetch(callUrl + query1);

    const data = await response.json();
    return data;
    

}

const updateForecast = async (city) => {
    const callUrl2 = "http://api.openweathermap.org/data/2.5/forecast";
    const query2 = `?q=${city}&units=imperial&appid=${key}`;

    const responseFore = await fetch(callUrl2 + query2);

    const fore = await responseFore.json();
    return fore;

}

// const forecastQuery = "http://api.openweathermap.org/data/2.5/forecast" + `?q=${city}&units=imperial&appid=${key}`;