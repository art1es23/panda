<template>
  <div
    class="location-view-container"
    :class="[!isDay ? 'location-day' : 'location-night']"
  >
    <!-- <div class="preload" v-show="!CURRENT_WEATHER_DATA">
      <icon-preloader />
    </div> -->
    <!-- <location-container v-show="CURRENT_WEATHER_DATA" /> -->
    <location-container />
  </div>
</template>

<script>
import LocationContainer from "@/components/location-container/LocationContainer.vue";
// import IconPreloader from "@/components/svg-icons/IconPreloader.vue";
export default {
  components: {
    LocationContainer,
    //  IconPreloader
  },

  data() {
    return {
      isDay: false,
    };
  },
};
</script>

<style></style>
