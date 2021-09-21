import { format, fromUnixTime } from "date-fns";
import Swiper from "swiper/bundle";
import "swiper/css/bundle";

const swiper = new Swiper(".swiper", {
  // Optional parameters
  direction: "horizontal",
  centerSlides: true,
  slidesPerView: 1,
  breakpoints: {
    // when window width is >= 320px
    375: {
      slidesPerView: 2,
      slidesPerGroup: 2,
      spaceBetween: 20,
    },
    // when window width is >= 480px
    480: {
      slidesPerView: 3,
      slidesPerGroup: 3,
      spaceBetween: 30,
    },
    // when window width is >= 640px
    640: {
      slidesPerView: 3,
      slidesPerGroup: 3,
      spaceBetween: 40,
    },
    800: {
      slidesPerView: 4,
      slidesPerGroup: 4,
      spaceBetween: 50,
    },
  },
  // Navigation arrows
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

function displayCurrentForecast(cityCountry, currentWeather, units) {
  const currentForecast = document.querySelector(".current-forecast");
  const h2 = document.createElement("h2");
  const img = document.createElement("img");
  const pDate = document.createElement("p");
  const pTemperature = document.createElement("p");
  const pFeelsLike = document.createElement("p");
  const pWeather = document.createElement("p");

  h2.textContent = cityCountry;
  pDate.textContent = format(
    fromUnixTime(currentWeather.dt),
    `eeee dd, hh:mm a`
  );
  img.src = `http://openweathermap.org/img/wn/${currentWeather.icon}@2x.png`;
  pWeather.textContent = `Weather: ${currentWeather.weather}`;

  if (units === "metric") {
    pTemperature.textContent = `${currentWeather.temperature.toFixed(0)} °C`;
    pFeelsLike.textContent = `Feels like: ${currentWeather.feels_like.toFixed(
      0
    )} °C`;
  } else {
    pTemperature.textContent = `${(
      (currentWeather.temperature * 9) / 5 +
      32
    ).toFixed(0)} °F`;
    pFeelsLike.textContent = `Feels like: ${(
      (currentWeather.feels_like * 9) / 5 +
      32
    ).toFixed(0)} °F`;
  }

  currentForecast.append(h2, pDate, img, pTemperature, pFeelsLike, pWeather);
}

function displayHourlyForecast(hourlyWeather, units) {
  hourlyWeather.forEach((hour) => {
    const swiperSlide = document.createElement("div");
    const h3 = document.createElement("h3");
    const pTemperature = document.createElement("p");
    const pWeather = document.createElement("p");
    const img = document.createElement("img");

    swiperSlide.classList.add("swiper-slide");
    h3.textContent = format(fromUnixTime(hour.dt), `eee, hh a`);
    pWeather.textContent = `${hour.weather}`;
    img.src = `http://openweathermap.org/img/wn/${hour.icon}@2x.png`;

    if (units === "metric") {
      pTemperature.textContent = `${hour.temperature.toFixed(0)} °C`;
    } else {
      pTemperature.textContent = `${((hour.temperature * 9) / 5 + 32).toFixed(
        0
      )} °F`;
    }

    swiperSlide.append(h3, img, pTemperature, pWeather);
    swiper.appendSlide(swiperSlide);
  });
}

function displayDailyForecast(dailyWeather, units) {
  dailyWeather.forEach((day) => {
    const swiperSlide = document.createElement("div");
    const h3 = document.createElement("h3");
    const img = document.createElement("img");
    const pTemp = document.createElement("p");
    const pWeather = document.createElement("p");

    swiperSlide.classList.add("swiper-slide");

    h3.textContent = format(fromUnixTime(day.dt), "eeee");
    img.src = `http://openweathermap.org/img/wn/${day.icon}@2x.png`;
    pWeather.textContent = day.weather;

    if (units === "metric") {
      pTemp.textContent = `${day.maxMinTemp[0].toFixed(
        0
      )}/${day.maxMinTemp[1].toFixed(0)} °C`;
    } else {
      pTemp.textContent = `${day.maxMinTemp[0].toFixed(
        0
      )}/${day.maxMinTemp[1].toFixed(0)} °F`;
    }

    swiperSlide.append(h3, img, pTemp, pWeather);
    swiper.appendSlide(swiperSlide);
  });
}

function clearCurrentForecast() {
  const currentForecast = document.querySelector(".current-forecast");

  while (currentForecast.hasChildNodes()) {
    currentForecast.removeChild(currentForecast.firstChild);
  }
}

function clearSwiper() {
  swiper.removeAllSlides();
}

export {
  displayCurrentForecast,
  displayHourlyForecast,
  displayDailyForecast,
  clearCurrentForecast,
  clearSwiper,
};