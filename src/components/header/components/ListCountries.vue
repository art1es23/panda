<template>
  <ul class="list-cities">
    <li
      class="list-cities__item"
      v-for="city in filterCities"
      :key="city.lng"
      @click="chooseCity(city.city)"
    >
      {{ city.city }}
    </li>
  </ul>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
export default {
  name: "ListCountries",

  computed: {
    ...mapState(["searchLocationValue"]),
    ...mapGetters(["filterCities"]),
  },

  methods: {
    ...mapActions([
      "getLocation",
      "changeStateAddContainer",
      "GET_CURRENT_FORECAST_DATA",
    ]),
    chooseCity(city) {
      const payload = {
        isShowAddContainer: true,
        isShowEditLocationListContainer: false,
        isShowAdditionalButtonsDropdown: false,
        isShowCitiesDropdown: false,
        searchLocationValue: city,
      };
      this.changeStateAddContainer(payload);
      this.getLocation();
      this.GET_CURRENT_FORECAST_DATA();
      console.log("lll");
    },
  },
};
</script>

<style></style>
