<template>
  <div class="location-container">
    <action-buttons :currentLocationData="weatherData" />
    <!-- {{ weatherData }} -->

    <h2 class="location-title">
      {{ isSingle ? "Forecast for Now" : "Forecast for 5 days" }}
    </h2>

    <div class="location">
      <location-info :currentLocationData="weatherData" v-if="isSingle" />
      <location-month-weather-graph
        :forecastData="forecastData"
        v-if="!isSingle"
      />

      <button class="button button-handler-counts" @click="handlerCounts">
        {{ isSingle ? "Change to 5 days Forecast" : "Change to Current day" }}
      </button>
    </div>

    <!-- <temperature-graph /> -->

    <warning-message v-if="isAddedToFavourites || isShowWarning" />
  </div>
</template>

<script>
import { mapGetters, mapState, mapActions } from "vuex";
import ActionButtons from "../action-buttons/ActionButtons.vue";
// import TemperatureGraph from "../temperature-graph/TemperatureGraph.vue";
import WarningMessage from "../warning-message/WarningMessage.vue";
import LocationInfo from "./components/location-info/LocationInfo.vue";
import LocationMonthWeatherGraph from "./components/location-month-weather/LocationMonthWeatherGraph.vue";
// import LocationWeekWeatherGraph from "./components/location-week-weather/LocationWeekWeatherGraph.vue";
export default {
  components: {
    ActionButtons,
    LocationInfo,
    // LocationWeekWeatherGraph,
    LocationMonthWeatherGraph,
    WarningMessage,
    // TemperatureGraph,
  },
  name: "LocationContainer",
  data() {
    return {
      isSingle: true,
      // forecastData: [],
      // weatherData: {},
    };
  },

  computed: {
    ...mapState([
      "CURRENT_WEATHER_DATA",
      "isAddedToFavourites",
      "isShowWarning",
      "listWeatherLocations",
      "searchLocationValue",
    ]),
    ...mapGetters(["GET_5_DAYS_FORECAST_DATA"]),
    location() {
      return this.$route.params.name;
    },

    weatherData() {
      return this.CURRENT_WEATHER_DATA
        ? this.CURRENT_WEATHER_DATA
        : JSON.parse(sessionStorage.getItem("weatherData"));
    },

    forecastData() {
      return this.GET_5_DAYS_FORECAST_DATA
        ? this.GET_5_DAYS_FORECAST_DATA
        : JSON.parse(sessionStorage.getItem("forecastData"));
    },
  },

  methods: {
    ...mapActions(["getLocation", "setLocationFromLocationView"]),

    handlerCounts() {
      this.isSingle = !this.isSingle;
    },

    handlerLocation() {
      const payload = {
        location: this.location,
      };

      this.setLocationFromLocationView(payload);
    },

    reloadPage() {
      // window.addEventListener()
      sessionStorage.setItem(
        "weatherData",
        JSON.stringify(this.CURRENT_WEATHER_DATA)
      );
      sessionStorage.setItem(
        "forecastData",
        JSON.stringify(this.GET_5_DAYS_FORECAST_DATA)
      );
    },
  },

  created() {
    this.handlerLocation();
    this.getLocation();
  },

  mounted() {
    this.handlerLocation();
    this.getLocation();
    // this.reloadPage();
    // this.weatherData = JSON.parse(sessionStorage.getItem("weatherData"));
    // this.forecastData = JSON.parse(sessionStorage.getItem("forecastData"));
    // this.weatherData = this.CURRENT_WEATHER_DATA
    //   ? JSON.parse(sessionStorage.getItem("weatherData"))
    //   : this.CURRENT_WEATHER_DATA;
    // this.forecastData = this.GET_5_DAYS_FORECAST_DATA
    //   ? JSON.parse(sessionStorage.getItem("forecastData"))
    //   : this.GET_5_DAYS_FORECAST_DATA;
  },

  updated() {
    this.reloadPage();
  },

  // beforeDestroy() {
  //   this.reloadPage();
  // },
};
</script>

<style></style>
