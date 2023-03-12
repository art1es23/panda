<template>
  <!-- <swiper-slide
      class="day-track__item day-weather"
      v-for="(day, idx) in GET_5_DAYS_FORECAST_DATA"
      :key="idx"
    > -->
  <!-- <div :style="`grid-template-columns: repeat(${forecastData.length}, 1fr)`"> -->
  <div class="day-track__item day-weather">
    <!-- :style="`backgroundImage: url(${day?.weatherStatus.imgSrc}); color: ${day?.weatherStatus.textColor}`" -->
    <div class="day-weather--header">
      <span class="day-weather__day">{{ changeViewDate(day?.date) }}</span>
      <span class="day-weather__date">{{ day?.date }}</span>
    </div>

    <div class="day-weather__thumb">
      <img :src="day?.src" alt="" />
    </div>

    <div class="day-weather--footer">
      <span class="day-weather__temp">{{
        isFahrenheit
          ? `${Math.round(day?.averageTemp) * 1.8 + 32}&#8457;`
          : `${Math.round(day?.averageTemp)}&#8451;`
      }}</span>
      <span class="day-weather__status">{{ day?.weather }}</span>
    </div>
  </div>
  <!-- </div> -->
</template>
<script>
import { mapState } from "vuex";

export default {
  props: {
    // forecastData: Array,
    day: Object,
  },

  computed: {
    ...mapState(["isFahrenheit"]),
  },

  methods: {
    changeViewDate(value) {
      const date = new Date(value);
      return date.toLocaleDateString("en-US", { weekday: "long" });
    },
  },
};
</script>
