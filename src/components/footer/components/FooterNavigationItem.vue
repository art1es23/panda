<template>
  <router-link
    :to="`${href}`"
    class="footer-navigation-button"
    :class="[isActive ? 'active' : '']"
  >
    <button class="button" @click="handlerTransition">{{ title }}</button>
  </router-link>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "FooterNavigationItem",
  props: {
    href: {
      type: String,
    },
    title: {
      type: String,
    },
  },

  computed: {
    isActive() {
      return this.href === this.$route.path ? true : false;
    },
  },

  methods: {
    ...mapActions(["resetStateAfterTransition"]),
    handlerTransition() {
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

      this.resetStateAfterTransition(payload);
    },
  },
};
</script>

<style></style>
