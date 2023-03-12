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
    return {
      // locationList: [],
    };
  },

  computed: {
    ...mapState(["isSingleDisplay"]),
    ...mapGetters(["GET_LOCATION_LIST", "getFavouriteLocations"]),

    locationList() {
      return this.$route.path === "/"
        ? this.GET_LOCATION_LIST
        : this.favouritesData;
    },

    // favouritesData() {
    //   return JSON.parse(localStorage.getItem("favourites"));
    // },

    favouritesData() {
      return JSON.parse(localStorage.getItem("favourites"));
    },
  },

  created() {
    // if (this.$route.path === "/favourite-locations") {
    //   this.locationList = this.favouritesData;
    // } else {
    //   this.locationList = this.GET_LOCATION_LIST;
    // }
    // this.locationList = this.$route.path === "/"
    //     ? this.GET_LOCATION_LIST
    //     : this.favouritesData;
  },

  updated() {
    // if (this.$route.path === "/favourite-locations")
    //   this.locationList = this.favouritesData;
  },

  mounted() {
    console.log(this.favouritesData);
  },
};
</script>

<style></style>
