<template>
  <div class="location-info">
    <!-- {{ currentLocationData }} -->
    <h3 class="location-info__title">{{ currentLocationData?.name }}</h3>
    <span class="location-info__status"
      >{{ currentLocationData?.weather[0].main }} -
      {{ currentLocationData?.weather[0].description }}</span
    >

    <div class="day-weather__thumb">
      <img :src="imgSrc" alt="" />
    </div>

    <div class="location-info__temperature">
      <span class="location-info__temperature--min"
        >Min:{{
          isFahrenheit
            ? `${
                Math.round(currentLocationData?.main.temp_min) * 1.8 + 32
              }&#8457;`
            : `${Math.round(currentLocationData?.main.temp_min)}&#8451;`
        }}</span
      >
      <span class="location-info__temperature--max"
        >Max:
        {{
          isFahrenheit
            ? `${
                Math.round(currentLocationData?.main.temp_max) * 1.8 + 32
              }&#8457;`
            : `${Math.round(currentLocationData?.main.temp_max)}&#8451;`
        }}</span
      >
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "LocationInfo",
  props: {
    currentLocationData: {
      type: Object,
    },
  },

  computed: {
    ...mapState(["isFahrenheit", "weatherStatus"]),

    imgSrc() {
      let src = "";
      this.weatherStatus.forEach(({ title, imgSrc }) => {
        if (this.currentLocationData?.weather[0].main === title) src = imgSrc;
      });
      return src;
    },
  },
};
</script>

<style></style>
