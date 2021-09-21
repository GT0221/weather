# Weather App

## How it works

1. Search for a location by City, 2-letter country code (ISO3166). For example
   New York, US or New York, NY, US would also work. City name should be capitalized correctly,
   and 2-letter country or state code should be in all caps (don't forget the commas).

2. Location coordinates (for successful location inputs) gets fetched through [OpenWeatherMap API](https://developer.accuweather.com/?gclid=CjwKCAjwhaaKBhBcEiwA8acsHE9eqn0jLDzuIQb7WoUU99Y73JvRB3wVx80zIaMBfgPCkE0vpBojWhoC19sQAvD_BwE).

3. When coordinates are returned another API request is made once again through OpenWeatherMap, this time
   for weather data for the provided coordinates.

4. Once weather data is succesfully returned it is displayed to the user. The user has the option to view the weather forecast in Farenheit or Celcius. Current weather for the location is always provided and users
   have the choice to view hourly or daily forecast.

## Feature Ideas

Implement an autocomple feature for location input. While the user is typing in the search field, they can see a list of suggested locations.

### Packages Used

[date-fns](https://date-fns.org/) for formating dates.
[Swiper](https://swiperjs.com/get-started) mobile touch slider for displaying hourly and daily weather data.