<template>
  <div class="footer-navigation">
    <footer-navigation-item :title="`Home`" :href="`/`" />
    <footer-navigation-item
      :title="`Favourites`"
      :href="`/favourite-locations`"
    />
  </div>
</template>

<script>
import FooterNavigationItem from "./FooterNavigationItem.vue";
export default {
  components: { FooterNavigationItem },
};
</script>

<style></style>
