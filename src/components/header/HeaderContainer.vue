<template>
  <header class="header-container">
    <header-title :title="title" />

    <additional-buttons-container />

    <search-location-input v-if="this.$route.path === '/'" />

    <list-countries v-if="isShowCitiesDropdown" />
  </header>
</template>

<script>
import { mapState } from "vuex";
import AdditionalButtonsContainer from "./components/additional-buttons/AdditionalButtonsContainer.vue";
import HeaderTitle from "./components/HeaderTitle.vue";
import ListCountries from "./components/ListCountries.vue";
import SearchLocationInput from "./components/SearchLocationInput.vue";
export default {
  components: {
    HeaderTitle,
    SearchLocationInput,
    AdditionalButtonsContainer,
    ListCountries,
  },
  name: "HeaderContainer",
  props: {
    title: {
      type: String,
    },
  },

  computed: {
    ...mapState(["isShowCitiesDropdown"]),
  },
};
</script>

<style></style>
