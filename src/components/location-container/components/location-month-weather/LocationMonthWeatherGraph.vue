<template>
  <div class="location-month-temp" @mousedown="onMouseDown">
    <div class="preload" v-show="!forecastData">
      <icon-preloader />
    </div>

    <!-- {{ forecastData }} -->

    <div
      class="location-month-tracklist day-month-wrapper"
      ref="scrollContent"
      :style="`grid-template-columns: repeat(${forecastData.length}, 1fr)`"
    >
      <!-- :forecastData="forecastData" -->
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
// import { mapGetters } from "vuex";
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
        console.log(startX);
        console.log(scrollContent);
        console.log(startScrollLeft);

        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", onMouseUp);

        function onMouseMove(e) {
          const dx = e.pageX - startX;
          scrollContent.scrollLeft = startScrollLeft - dx;

          console.log("dx: ", dx);
          console.log("dx: ", startScrollLeft);
          console.log("sc: ", scrollContent.scrollLeft);
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
