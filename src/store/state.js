// import cities from "cities.json";

import cities from "@/data/cities";

export default {
  CURRENT_WEATHER_DATA: [],
  COUNTRY_NAMES_LIST: cities,

  CURRENT_FORECAST_DATA: [],
  // HOURLY_FORECAST_DATA: null,

  listWeatherLocations: [],
  searchLocationValue: "",

  isShowCitiesDropdown: false,
  isShowAddContainer: false,

  isShowWarning: false,
  isShowAdditionalButtonsDropdown: false,
  isShowEditLocationListContainer: false,

  removeLocationId: null,
  isConfirmRemove: false,
  isCanAddCount: true,
  isCanAddDuplicate: true,

  favouriteLocationsList: [],

  isLocationView: false,

  isAddedToFavourites: false,

  isFahrenheit: false,
  isSingleDisplay: true,

  isLocationAddedToFavourites: false,

  weatherStatus: [
    {
      title: "Clouds",
      imgSrc: require("@/assets/images/svg-weather-icons/cloudy.svg"),
      // bgColor: "rgb(21 97 237 / 72%)",
      textColor: "#ffffff",
    },
    {
      title: "Clear",
      imgSrc: require("@/assets/images/svg-weather-icons/cloudy-day-1.svg"),
      // bgColor: "rgb(212 250 237 / 72%)",
      textColor: "#000000",
    },
    {
      title: "Snow",
      imgSrc: require("@/assets/images/svg-weather-icons/snowy-6.svg"),
      // bgColor: "rgb(255 255 255 / 72%)",
      textColor: "#000000",
    },
    {
      title: "Rain",
      imgSrc: require("@/assets/images/svg-weather-icons/thunder.svg"),
      // bgColor: "rgb(140 136 135 / 72%)",
      textColor: "#000000",
    },
    {
      title: "Sun",
      imgSrc: require("@/assets/images/svg-weather-icons/day.svg"),
      // bgColor: "rgb(255 229 57 / 72%)",
      textColor: "#000000",
    },
  ],
};
