<template>
  <label for="" class="input-search-wrapper">
    <input
      type="text"
      v-model="location"
      placeholder="Search location"
      @input="update"
      @keydown.enter="showAddForm"
      class="input-search"
    />
  </label>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "SearchLocationInput",

  data() {
    return {
      location: "",
    };
  },

  computed: {
    ...mapState(["searchLocationValue"]),
  },

  methods: {
    ...mapActions([
      "handlerSetLocation",
      "getLocation",
      "changeStateAddContainer",
    ]),
    update() {
      const isShowCitiesDropdown = this.location.length > 0 ? true : false;
      const payload = {
        searchLocationValue: this.location,
        isShowCitiesDropdown,
      };

      this.handlerSetLocation(payload);
    },

    showAddForm() {
      const payload = {
        isShowAddContainer: true,
        isShowEditLocationListContainer: false,
        isShowAdditionalButtonsDropdown: false,
        searchLocationValue: this.location,
        isShowCitiesDropdown: false,
      };

      this.location = "";
      this.changeStateAddContainer(payload);
      this.getLocation();
    },
  },
  mounted() {
    this.location = this.searchLocationValue;
  },
};
</script>

<style></style>
