<template>
  <div class="additional-buttons-dropdown">
    <!-- v-click-outside="onClose" -->
    <button class="button button-edit-list" @click="handlerEditLocationList">
      Edit list
    </button>
    <hr />
    <button class="button button-swap" @click="handlerDimension('c')">
      Celsius
    </button>
    <button class="button button-swap" @click="handlerDimension('f')">
      Farengeit
    </button>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "AdditionalButtonsDropdown",

  computed: {
    ...mapState(["isShowEditLocationListContainer"]),
  },

  methods: {
    ...mapActions([
      "showEditLocationListContainer",
      "showAdditionalButtonsDropdown",
      "handlerTemperatureDimension",
    ]),
    handlerEditLocationList() {
      const payload = {
        isShowAddContainer: false,
        isShowAdditionalButtonsDropdown: false,
        isShowEditLocationListContainer: !this.isShowEditLocationListContainer,
      };

      this.showEditLocationListContainer(payload);
    },

    onClose(e) {
      if (
        !(
          (e.target === document.querySelector(".additional-buttons-trigger"))
          // || e.target === document.querySelector(".v-icon-menu")
        )
      ) {
        const payload = {
          isShowAdditionalButtonsDropdown: false,
        };
        this.showAdditionalButtonsDropdown(payload);
      }
    },

    handlerDimension(dimension) {
      console.log(dimension);

      const payload = {
        isFahrenheit: dimension === "f" ? true : false,
      };

      this.handlerTemperatureDimension(payload);
    },
  },

  directives: {
    "click-outside": {
      bind: function (el, binding, vnode) {
        el.clickOutsideEvent = (event) => {
          console.log(event.target);
          console.log(el);
          if (
            !(
              el === event.target ||
              el.contains(event.target) ||
              el === document.querySelector(".additional-buttons-trigger") ||
              el === document.querySelector(".v-icon-more")
            ) &&
            !event.target.classList.contains("additional-buttons-dropdown")
          ) {
            vnode.context[binding.expression](event);
          }
        };
        document.body.addEventListener("click", el.clickOutsideEvent);
      },
      unbind: function (el) {
        document.body.removeEventListener("click", el.clickOutsideEvent);
      },
    },
  },
};
</script>

<style></style>
