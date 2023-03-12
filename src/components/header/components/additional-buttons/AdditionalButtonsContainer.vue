<template>
  <div class="additional-buttons-container">
    <additonal-buttons-trigger />
    <additional-buttons-dropdown v-if="isShowAdditionalButtonsDropdown" />
  </div>
</template>

<script>
import { mapState } from "vuex";
import AdditionalButtonsDropdown from "./AdditionalButtonsDropdown.vue";
import AdditonalButtonsTrigger from "./AdditonalButtonsTrigger.vue";
export default {
  name: "AdditionalButtonsContainer",
  components: { AdditionalButtonsDropdown, AdditonalButtonsTrigger },
  computed: {
    ...mapState(["isShowAdditionalButtonsDropdown"]),
  },
};
</script>

<style></style>
