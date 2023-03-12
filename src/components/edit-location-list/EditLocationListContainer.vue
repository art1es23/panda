<template>
  <div class="edit-location-list-container">
    <action-buttons />
    <list-stored-locations />
  </div>
</template>

<script>
import ActionButtons from "../action-buttons/ActionButtons.vue";
import ListStoredLocations from "../main-container/components/list-stored-locations/ListStoredLocations.vue";
export default {
  name: "EditLocationListContainer",
  components: {
    ListStoredLocations,
    ActionButtons,
  },
};
</script>

<style></style>
