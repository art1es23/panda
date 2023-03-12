<template>
  <div
    class="add-actions-buttons add-actions-buttons--edit"
    v-if="isShowAddContainer || isShowEditLocationListContainer"
  >
    <button class="button button-back" @click="handlerBack">Back</button>
    <button
      class="button button-add"
      @click="handlerAddToList"
      v-if="isShowAddContainer"
    >
      {{ "Add" }}
    </button>
  </div>
  <div class="add-actions-buttons" v-else>
    <router-link to="/" class="button button-back"
      ><button @click="handlerBack">Back</button></router-link
    >
    <button
      class="button button-add-favourites"
      @click="handlerAddToFavourites"
    >
      {{ "Add to Favourites" }}
    </button>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "ActionButtons",

  props: {
    currentLocationData: {
      type: Object,
    },
  },
  computed: {
    ...mapState([
      "CURRENT_WEATHER_DATA",
      "isShowAddContainer",
      "isShowEditLocationListContainer",
      // "getFavouriteLocations",
    ]),
  },

  methods: {
    ...mapActions([
      "changeStateAddContainer",
      "handlerSetLocation",
      "addLocation",
      "getLocation",
      "addToFavouriteLocations",
    ]),
    handlerBack() {
      const payload = {
        isShowAddContainer: false,

        isShowWarning: false,
        isAddedToFavourites: false,
        searchLocationValue: "",
        isShowCitiesDropdown: false,
        isShowAdditionalButtonsDropdown: false,
        isShowEditLocationListContainer: false,
        removeLocationId: "",
      };

      this.changeStateAddContainer(payload);
    },
    handlerAddToList() {
      this.getLocation();

      const payload = {
        searchLocationValue: "",
        isShowAddContainer: false,
        currentLocationData: this.currentLocationData,
        listLocation: "default",
      };

      this.changeStateAddContainer(payload);
      this.addLocation(payload);
      this.handlerSetLocation(payload);
    },

    handlerAddToFavourites() {
      const payload = {
        currentLocationData: this.currentLocationData,
        listLocation: "favourite",
      };

      // if (
      //   !localStorage.getItem("favouritesData") ||
      //   localStorage.getItem("favouritesData") == undefined
      // ) {
      //   localStorage.setItem("favouritesData", this.currentLocationData);
      // } else {
      //   localStorage.getItem("favouritesData");
      //   localStorage.setItem("favouritesData", this.getFavouriteLocations);
      // }

      this.addLocation(payload);
    },
  },
};
</script>

<style></style>
