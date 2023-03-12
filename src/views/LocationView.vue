<template>
  <div
    class="location-view-container"
    :class="[!isDay ? 'location-day' : 'location-night']"
  >
    <!-- <div class="preload" v-show="!GET_LOCATION">
      <icon-preloader />
    </div>
    <location-container v-show="GET_LOCATION" /> -->
    <location-container />
  </div>
</template>

<script>
import LocationContainer from "@/components/location-container/LocationContainer.vue";
// import IconPreloader from "@/components/svg-icons/IconPreloader.vue";
export default {
  components: {
    LocationContainer,
    // IconPreloader,
  },

  data() {
    return {
      isDay: false,
    };
  },
};
</script>

<style></style>
