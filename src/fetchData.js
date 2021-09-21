function processWeatherData(weatherData) {
    const currentForecastObj = {
      dt: weatherData.current.dt,
      temperature: weatherData.current.temp,
      feels_like: weatherData.current.feels_like,
      weather: weatherData.current.weather[0].description,
      icon: weatherData.current.weather[0].icon,
    };
  
    const hourlyForecastArray = [];
    let dailyForecastArray = [];
  
    weatherData.hourly.slice(1, 25).forEach(function (hour) {
      const hourlyForecastObj = {
        dt: hour.dt,
        temperature: hour.temp,
        feels_like: hour.feels_like,
        weather: hour.weather[0].description,
        icon: hour.weather[0].icon,
      };
      hourlyForecastArray.push(hourlyForecastObj);
    });
    
    weatherData.daily.slice(1, -1).forEach(function (day) {
      const dailyWeatherObj = {
        dt: day.dt,
        icon: day.weather[0].icon,
        maxMinTemp: [day.temp.max, day.temp.min],
        weather: day.weather[0].description,
      };
      dailyForecastArray.push(dailyWeatherObj);
    });
    
    return {
      currentWeatherObj: currentForecastObj,
      hourlyWeatherArray: hourlyForecastArray,
      dailyWeatherArray: dailyForecastArray,
    };
  }
  
  async function getLocationCoords(locationValue) {
    const response = await fetch(
      `HTTPS://api.openweathermap.org/data/2.5/weather?q=${locationValue}&appid=ff5a098ab554cde22636b78742ad9f39`,
      {
        mode: "cors",
      }
    );
    const weatherData = await response.json();
  
    /* eslint-disable no-unused-vars */
    const name = weatherData.name;
    const lat = weatherData.coord.lat;
    const lon = weatherData.coord.lon;
  
    return {
      location: `${weatherData.name}, ${weatherData.sys.country}`,
      lat: lat,
      lon: lon,
    };
  }
  
  async function getWeatherData(lat, lon) {
    let response = await fetch(
      `HTTPS://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely&units=metric&appid=ff5a098ab554cde22636b78742ad9f39`,
      {
        mode: "cors",
      }
    );
    const weatherData = await response.json();
    return processWeatherData(weatherData);
  }
  
  export { getLocationCoords, getWeatherData };