<template>
  <div class="warning-message-container">
    <div class="warning-message-inner">
      <button @click="close">X</button>

      <div class="warning-message-edit" v-if="isConfirmRemove">
        <p class="warning-message-text">
          Please confirm that you want remove location
        </p>

        <div class="button-wrapper">
          <button class="button button-confirm" @click="confirmRemoving">
            Confirm
          </button>
          <button class="button button-confirm" @click="close">Close</button>
        </div>
      </div>

      <p class="warning-message-text" v-if="!isCanAddCount">
        For add another location, please, remove one of the location from the
        stored list.
      </p>

      <p class="warning-message-text" v-if="!isCanAddDuplicate">
        You already have this location in list. Please try to add another
        location.
      </p>

      <p class="warning-message-text" v-if="isAddedToFavourites">
        Great! The location added to Favourites.
      </p>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "WarningMessage",

  computed: {
    ...mapState([
      "isConfirmRemove",
      "isCanAddCount",
      "isCanAddDuplicate",
      "isAddedToFavourites",
    ]),
  },

  methods: {
    ...mapActions([
      "handlerCloseWarningMessage",
      "confirmRemoveLocationFromList",
    ]),
    close() {
      const payload = {
        isShowWarning: false,
        isAddedToFavourites: false,
      };

      this.handlerCloseWarningMessage(payload);
    },

    confirmRemoving() {
      const payload = {
        isShowWarning: false,
        isConfirmRemove: false,
        listLocation:
          this.$route.path === "/favourite-locations" ? "favourite" : "default",
      };

      this.confirmRemoveLocationFromList(payload);
    },
  },
};
</script>

<style></style>
