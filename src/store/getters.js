export default {
  GET_LOCATION: (state) => {
    return state.searchLocationValue;
  },
  GET_LOCATION_LIST: (state) => {
    return state.listWeatherLocations;
  },

  filterCities: (state) => {
    state.searchLocationValue =
      state.searchLocationValue.charAt(0).toUpperCase() +
      state.searchLocationValue.slice(1);
    return state.COUNTRY_NAMES_LIST.filter(
      (item) => item.city.indexOf(state.searchLocationValue) > -1
    );
  },

  getFavouriteLocations: (state) => {
    return state.favouriteLocationsList;
  },

  unflat(state) {
    const forecastData = state.CURRENT_FORECAST_DATA;

    if (!forecastData) {
      return [];
    }

    return Object.entries(
      forecastData.list.reduce((acc, obj) => {
        const key = obj.dt_txt.slice(0, 10);
        if (!acc[key]) {
          acc[key] = [];
        }
        acc[key].push(obj);
        return acc;
      }, {})
    );
  },

  GET_5_DAYS_FORECAST_DATA: (state, getters) => {
    return getters.unflat.reduce((accumulator, item) => {
      // console.log("item: ", item);
      // Avarage temperature
      const averageTemp = Math.round(
        item[1].reduce((acc, { main: { temp } }) => acc + temp, 0) /
          item[1].length
      );

      // Avarage status of weather
      const valueCount = {};
      let maxCount = 0;
      let weather = "";

      item[1].forEach(({ weather }) => {
        const value = weather[0].main;

        if (valueCount[value]) {
          valueCount[value]++;
        } else {
          valueCount[value] = 1;
        }
      });

      for (const value in valueCount) {
        if (valueCount[value] > maxCount) {
          maxCount = valueCount[value];
          weather = value;
        }
      }

      // Set image src from the state static
      let src = "";
      state.weatherStatus.forEach(({ title, imgSrc }) => {
        if (weather === title) src = imgSrc;
      });

      let newObj = {
        date: item[0],
        weather,
        averageTemp,
        src,
      };
      accumulator.push(newObj);

      return accumulator;
    }, []);
  },
};
