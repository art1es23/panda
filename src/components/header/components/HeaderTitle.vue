<template>
  <h1 class="header-title">{{ title }}</h1>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "Panda Weather",
    },
  },
  name: "HeaderTitle",
};
</script>

<style></style>
