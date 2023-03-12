<template>
  <div class="location-week-temp">
    <button class="location-week-temp__button">
      <span>Weather on 7 days</span>
      <span>></span>
    </button>
  </div>
</template>

<script>
export default {
  name: "LocationWeekWeatherGraph",
  props: {
    location: {
      type: Object,
    },
  },
};
</script>

<style></style>
