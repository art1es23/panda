<template>
  <div
    class="list-stored-locations"
    :class="[isSingleDisplay ? 'more' : 'one']"
  >
    <list-stored-locations-item
      v-for="(location, idx) in locationList"
      :key="location.id"
      :location="location"
      :listID="idx"
    />
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import ListStoredLocationsItem from "../list-stored-locations/components/ListStoredLocationsItem.vue";
export default {
  components: { ListStoredLocationsItem },
  name: "ListStoredLocations",

  data() {
    return {};
  },

  computed: {
    ...mapState(["isSingleDisplay"]),
    ...mapGetters(["GET_LOCATION_LIST", "getFavouriteLocations"]),

    locationList() {
      return this.$route.path === "/"
        ? this.GET_LOCATION_LIST
        : this.favouritesData;
    },

    favouritesData() {
      return this.getFavouriteLocations
        ? this.getFavouriteLocations
        : JSON.parse(localStorage.getItem("favouritesData"));
    },
  },

  // mounted () {
  //   const savedFavourites = localStorage.getItem('favouritesData')

  //   if (savedFavourites) {
  //     this.
  //   }
  // },

  // watch: {
  //   getFavouriteLocations () {
  //     localStorage.setItem(
  //     "favouritesData",
  //     JSON.stringify(this.getFavouriteLocations)
  //   );
  //   }
  // }
  // updated() {
  //   localStorage.setItem(
  //     "favouritesData",
  //     JSON.stringify(this.getFavouriteLocations)
  //   );
  // },
};
</script>

<style></style>
