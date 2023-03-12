<template>
  <div
    v-if="isShowEditLocationListContainer"
    class="list-stored-locations__item stored-location"
    :class="[
      listID !== 0 || $route.path !== '/' ? 'stored-location--edit' : '',
      isDay ? 'location-day' : 'location-night',
    ]"
  >
    <button
      class="button button-remove-location"
      @click="handlerRemoveLocation"
      v-if="listID !== 0 || $route.path !== '/'"
    >
      x
    </button>
    <div class="stored-location__title">{{ location.name }}</div>
    <div class="stored-location__temp">
      {{
        isFahrenheit
          ? `${Math.round(location.main.temp) * 1.8 + 32}&#8457;`
          : `${Math.round(location.main.temp)}&#8451;`
      }}
    </div>
    <div class="stored-location__weather">{{ location.weather[0].main }}</div>
    <div class="stored-location__legend">
      {{ location.weather[0].description }}
    </div>
  </div>

  <router-link
    v-else
    :to="`/location/${location.name}`"
    class="list-stored-locations__item stored-location-wrapper"
    :class="[
      listID === 0 && $route.path === '/'
        ? 'stored-location-wrapper-default-first'
        : '',
      isDay ? 'location-day' : 'location-night',
    ]"
    replace
  >
    <div class="stored-location" @click="showLocation(location.name)">
      <div class="stored-location__title">{{ location.name }}</div>
      <div class="stored-location__temp">
        {{
          isFahrenheit
            ? `${Math.round(location.main.temp) * 1.8 + 32}&#8457;`
            : `${Math.round(location.main.temp)}&#8451;`
        }}
      </div>
      <div class="stored-location__weather">{{ location.weather[0].main }}</div>
      <div class="stored-location__legend">
        {{ location.weather[0].description }}
      </div>
    </div>
  </router-link>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "ListStoredLocationsItem",

  props: {
    location: {
      type: Object,
    },

    listID: {
      type: Number,
    },
  },

  data() {
    return {
      isDay: false,
    };
  },

  computed: {
    ...mapState(["isShowEditLocationListContainer", "isFahrenheit"]),
  },

  methods: {
    ...mapActions([
      "removeLocationFromList",
      "GET_CURRENT_FORECAST_DATA",
      "handlerSetLocation",
    ]),
    handlerRemoveLocation() {
      const payload = {
        removeLocationId: this.location.id,
        isShowWarning: true,
        isConfirmRemove: true,
      };

      this.removeLocationFromList(payload);
    },

    checkPartOfDay() {
      if (this.location.weather[0].icon.includes("n")) {
        this.isDay = true;
      } else {
        this.isDay = false;
      }
    },

    async showLocation(location) {
      const payload = {
        searchLocationValue: location,
      };

      // console.log("s", location);

      // await this.GET_CURRENT_FORECAST_DATA();
      this.handlerSetLocation(payload);
    },
  },
};
</script>

<style></style>
