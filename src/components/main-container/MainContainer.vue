<template>
  <main class="main-container">
    <list-stored-locations />

    <edit-location-list-container v-if="isShowEditLocationListContainer" />

    <add-location-container v-if="isShowAddContainer" />
    <warning-message v-if="isShowWarning" />
  </main>
</template>

<script>
import { mapActions, mapState } from "vuex";
import AddLocationContainer from "../add-location-container/AddLocationContainer.vue";
import WarningMessage from "../warning-message/WarningMessage.vue";
import EditLocationListContainer from "../edit-location-list/EditLocationListContainer.vue";
import ListStoredLocations from "./components/list-stored-locations/ListStoredLocations.vue";
export default {
  components: {
    ListStoredLocations,
    AddLocationContainer,
    WarningMessage,
    EditLocationListContainer,
  },
  name: "MainContainer",
  computed: {
    ...mapState([
      "isShowAddContainer",
      "isShowWarning",
      "isShowEditLocationListContainer",
    ]),
  },
  methods: {
    ...mapActions(["GET_CURRENT_POSITION_DATA"]),
  },

  mounted() {
    this.GET_CURRENT_POSITION_DATA();
  },
};
</script>

<style></style>
