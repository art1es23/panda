<template>
  <button class="button additional-buttons-trigger" @click="handlerDropdown">
    <icon-more />
  </button>
</template>

<script>
import IconMore from "@/components/svg-icons/IconMore.vue";
import { mapActions, mapState } from "vuex";
export default {
  components: { IconMore },
  name: "AdditionalButtonsTrigger",

  computed: {
    ...mapState(["isShowAdditionalButtonsDropdown"]),
  },

  methods: {
    ...mapActions(["showAdditionalButtonsDropdown"]),
    handlerDropdown() {
      const payload = {
        isShowAdditionalButtonsDropdown: !this.isShowAdditionalButtonsDropdown,
      };
      this.showAdditionalButtonsDropdown(payload);
    },
  },
};
</script>

<style></style>
