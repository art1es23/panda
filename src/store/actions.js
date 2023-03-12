import axios from "axios";

export default {
  GET_CURRENT_POSITION_DATA: ({ commit, state }) => {
    if (state.listWeatherLocations.length <= 0) {
      const API_KEY = "bbfc439b3ebda2a738dfced8a4cccaa3";
      const BASE_URL = "https://api.openweathermap.org/data/2.5/";

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
          await axios
            .get(
              `${BASE_URL}weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&APPID=${API_KEY}&cnt=5`
            )
            .then((res) => {
              try {
                // console.log(res);
                commit("SET_CURRENT_POSITION", res);
              } catch (error) {
                console.log(error);
              }
              // return res.json();
            });
        });
      } else {
        console.log("Your browser does not support geolocation API");
      }
    }
  },

  GET_CURRENT_WEATHER_DATA: async ({ commit, getters }) => {
    const API_KEY = "bbfc439b3ebda2a738dfced8a4cccaa3";
    const BASE_URL = "https://api.openweathermap.org/data/2.5/";

    if (getters.GET_LOCATION) {
      await axios
        .get(
          `${BASE_URL}weather?q=${getters.GET_LOCATION}&appid=${API_KEY}&units=metric`
        )
        .then((res) => {
          try {
            commit("SET_CURRENT_WEATHER_DATA", res);
          } catch (error) {
            console.log(error);
          }
        })
        .catch((err) => console.log(err));
    }
  },

  GET_CURRENT_FORECAST_DATA: async ({ commit, getters }) => {
    const API_KEY = "bbfc439b3ebda2a738dfced8a4cccaa3";
    const BASE_URL = "https://api.openweathermap.org/data/2.5/";

    if (getters.GET_LOCATION) {
      await axios
        .get(
          `${BASE_URL}forecast?q=${getters.GET_LOCATION}&appid=${API_KEY}&units=metric`
        )
        .then((res) => {
          try {
            commit("SET_CURRENT_FORECAST_DATA", res);
          } catch (error) {
            console.log(error);
          }
        })
        .catch((err) => console.log(err));
    }
  },

  handlerSetLocation: ({ commit }, payload) => {
    commit("setSearchLocation", payload);
    // dispatch("GET_CURRENT_FORECAST_DATA");
  },

  getLocation: ({ dispatch }) => {
    dispatch({ type: "GET_CURRENT_WEATHER_DATA" });
    dispatch({ type: "GET_CURRENT_FORECAST_DATA" });
  },

  changeStateAddContainer: ({ commit }, payload) => {
    commit("showAddLocationContainer", payload);
  },

  addLocation: ({ commit }, payload) => {
    commit("addLocationToContainer", payload);
  },

  handlerCloseWarningMessage: ({ commit }, payload) => {
    commit("closeWarningMessage", payload);
  },

  showAdditionalButtonsDropdown: ({ commit }, payload) => {
    commit("showAdditionalButtons", payload);
  },

  showEditLocationListContainer: ({ commit }, payload) => {
    commit("showEditLocationList", payload);
  },

  removeLocationFromList: ({ commit }, payload) => {
    commit("showConfirmWindow", payload);
  },

  confirmRemoveLocationFromList: ({ commit }, payload) => {
    commit("removeLocation", payload);
  },

  addToFavouriteLocations: ({ commit }, payload) => {
    commit("addToFavouriteList", payload);
  },

  setLocationFromLocationView: ({ commit }, payload) => {
    commit("setLocation", payload);
  },

  resetStateAfterTransition: ({ commit }, payload) => {
    commit("resetStatePopup", payload);
  },

  handlerTemperatureDimension: ({ commit }, payload) => {
    commit("changeTemperatureDimension", payload);
  },

  changeDisplaying: ({ commit }, payload) => {
    commit("setDisplaying", payload);
  },
};
