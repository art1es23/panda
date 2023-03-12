export default {
  SET_CURRENT_POSITION: (state, { data }) => {
    state.CURRENT_WEATHER_DATA = data;
    state.listWeatherLocations.push(data);
  },
  SET_CURRENT_WEATHER_DATA: (state, { data }) => {
    state.CURRENT_WEATHER_DATA = data;
  },

  SET_CURRENT_FORECAST_DATA: (state, { data }) => {
    state.CURRENT_FORECAST_DATA = data;
  },

  // SET_HOURLY_FORECAST_DATA: (state, { data }) => {
  //   state.HOURLY_FORECAST_DATA = data;
  // },

  setSearchLocation: (
    state,
    {
      searchLocationValue,
      isShowCitiesDropdown,
      isShowAdditionalButtonsDropdown,
    }
  ) => {
    state.searchLocationValue = searchLocationValue;
    state.isShowCitiesDropdown = isShowCitiesDropdown;
    state.isShowAdditionalButtonsDropdown = isShowAdditionalButtonsDropdown;
  },

  showAddLocationContainer: (
    state,
    {
      isShowAddContainer,
      isShowEditLocationListContainer,
      isShowAdditionalButtonsDropdown,
      searchLocationValue,
      isShowCitiesDropdown,
      isShowWarning,
      isAddedToFavourites,
      removeLocationId,
    }
  ) => {
    state.isShowCitiesDropdown = isShowCitiesDropdown;
    state.searchLocationValue = searchLocationValue;
    state.isShowAddContainer = isShowAddContainer;
    state.isLocationView = false;
    state.removeLocationId = removeLocationId;

    state.isShowWarning = isShowWarning;
    state.isAddedToFavourites = isAddedToFavourites;

    state.isShowEditLocationListContainer = isShowEditLocationListContainer;
    state.isShowAdditionalButtonsDropdown = isShowAdditionalButtonsDropdown;
  },

  addLocationToContainer: (state, { currentLocationData, listLocation }) => {
    let list =
      listLocation === "favourite"
        ? state.favouriteLocationsList
        : state.listWeatherLocations;

    if (list.length === 0) {
      list.push(currentLocationData);
      if (listLocation === "favourite") {
        state.isLocationAddedToFavourites = true;
        state.isAddedToFavourites = true;
      }
    } else if (list.length > 0 && list.length < 5) {
      let isLocationExist = false;

      list.forEach(
        (item) =>
          (isLocationExist =
            item.name === currentLocationData.name ? true : false)
      );

      if (!isLocationExist) {
        list.push(currentLocationData);
        if (listLocation === "favourite") {
          state.isLocationAddedToFavourites = true;
          state.isAddedToFavourites = true;
        }
      } else {
        state.isCanAddDuplicate = false;
        state.isShowWarning = true;
        state.isAddedToFavourites = false;
      }
    } else {
      state.isCanAddCount = false;
      state.isShowWarning = true;
    }
  },

  // checkIfExist: (state, { isLocationAddedToFavourites }) => {
  //   state.isLocationAddedToFavourites = isLocationAddedToFavourites;
  // },

  closeWarningMessage: (state, { isShowWarning, isAddedToFavourites }) => {
    state.isShowWarning = isShowWarning;
    state.isAddedToFavourites = isAddedToFavourites;
  },

  showAdditionalButtons: (state, { isShowAdditionalButtonsDropdown }) => {
    state.isShowAdditionalButtonsDropdown = isShowAdditionalButtonsDropdown;
  },

  showEditLocationList: (
    state,
    {
      isShowEditLocationListContainer,
      isShowAdditionalButtonsDropdown,
      isShowAddContainer,
    }
  ) => {
    state.isShowAddContainer = isShowAddContainer;
    state.isShowEditLocationListContainer = isShowEditLocationListContainer;
    state.isShowAdditionalButtonsDropdown = isShowAdditionalButtonsDropdown;
  },

  showConfirmWindow: (
    state,
    { isShowWarning, isConfirmRemove, removeLocationId }
  ) => {
    state.removeLocationId = removeLocationId;
    state.isShowWarning = isShowWarning;
    state.isConfirmRemove = isConfirmRemove;
  },

  removeLocation: (state, { isShowWarning, isConfirmRemove, listLocation }) => {
    state.isShowWarning = isShowWarning;
    state.isConfirmRemove = isConfirmRemove;
    state.isAddedToFavourites = false;

    listLocation =
      listLocation === "favourite"
        ? "favouriteLocationsList"
        : "listWeatherLocations";

    state[listLocation] = state[listLocation].filter(
      (item) => item.id !== state.removeLocationId
    );
  },

  setLocation: (state, { location }) => {
    state.searchLocationValue = location;
    state.isLocationView = true;
  },

  resetStatePopup: (
    state,
    {
      isShowAddContainer,
      isShowWarning,
      isAddedToFavourites,
      searchLocationValue,
      isShowCitiesDropdown,
      isShowAdditionalButtonsDropdown,
      isShowEditLocationListContainer,
      removeLocationId,
    }
  ) => {
    state.isShowEditLocationListContainer = isShowEditLocationListContainer;
    state.isShowAddContainer = isShowAddContainer;
    state.isShowAddContainer = isShowAddContainer;
    state.isShowWarning = isShowWarning;
    state.isAddedToFavourites = isAddedToFavourites;
    state.searchLocationValue = searchLocationValue;
    state.isShowCitiesDropdown = isShowCitiesDropdown;
    state.isShowAdditionalButtonsDropdown = isShowAdditionalButtonsDropdown;
    state.isShowEditLocationListContainer = isShowEditLocationListContainer;
    state.removeLocationId = removeLocationId;
  },

  changeTemperatureDimension: (state, { isFahrenheit }) => {
    state.isFahrenheit = isFahrenheit;
  },

  setDisplaying: (state, { isSingleDisplay }) => {
    state.isSingleDisplay = isSingleDisplay;
  },
};
