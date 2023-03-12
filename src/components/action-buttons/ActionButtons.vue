<template>
  <div
    class="add-actions-buttons add-actions-buttons--edit"
    v-if="isShowAddContainer || isShowEditLocationListContainer"
  >
    <button class="button button-back" @click="handlerBack">
      <icon-back />
    </button>
    <button
      class="button button-add"
      @click="handlerAddToList"
      v-if="isShowAddContainer"
    >
      <icon-add />
    </button>
  </div>
  <div class="add-actions-buttons" v-else>
    <router-link to="/" class="button button-back"
      ><button @click="handlerBack">
        <icon-back /></button
    ></router-link>
    <button
      class="button button-add-favourites"
      @click="handlerAddToFavourites"
    >
      <icon-favourites :currentData="CURRENT_WEATHER_DATA" />
    </button>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import IconAdd from "../svg-icons/IconAdd.vue";
import IconBack from "../svg-icons/IconBack.vue";
import IconFavourites from "../svg-icons/IconFavourites.vue";
export default {
  name: "ActionButtons",

  components: {
    IconAdd,
    IconFavourites,
    IconBack,
  },

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
      "getFavouriteLocations",
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
        isLocationAddedToFavourites: true,
        listLocation: "favourite",
      };

      this.addLocation(payload);
    },
  },
};
</script>

<style></style>
