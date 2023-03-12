<template>
  <div class="location-month-temp" @mousedown="onMouseDown">
    <div class="preload" v-show="!forecastData">
      <icon-preloader />
    </div>

    <div
      class="location-month-tracklist day-month-wrapper"
      ref="scrollContent"
      :style="`grid-template-columns: repeat(${forecastData.length}, 1fr)`"
    >
      <swiper-cards
        class="day-month-wrapper"
        v-show="forecastData"
        v-for="(day, idx) in forecastData"
        :key="idx"
        :day="day"
      />
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import SwiperCards from "@/components/swiper-cards/SwiperCards.vue";
import IconPreloader from "@/components/svg-icons/IconPreloader.vue";

export default {
  components: { SwiperCards, IconPreloader },
  name: "LocationMonthWeatherGraph",
  props: {
    forecastData: Array,
  },
  computed: {
    ...mapState(["CURRENT_WEATHER_DATA", "isFahrenheit"]),
    ...mapGetters(["GET_5_DAYS_FORECAST_DATA"]),
  },

  methods: {
    onMouseDown(e) {
      this.$nextTick(() => {
        const startX = e.pageX;
        const scrollContent = this.$refs.scrollContent;
        const startScrollLeft = scrollContent.scrollLeft;

        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", onMouseUp);

        function onMouseMove(e) {
          const dx = e.pageX - startX;
          scrollContent.scrollLeft = startScrollLeft - dx;
        }

        function onMouseUp() {
          document.removeEventListener("mousemove", onMouseMove);
          document.removeEventListener("mouseup", onMouseUp);
        }
      });
    },
  },
};
</script>

<style></style>
