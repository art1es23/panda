<template>
  <div class="home">
    <header-container :title="`Favourite Locations`" />
    <main-container />
    <footer-container />
  </div>
</template>

<script>
import HeaderContainer from "@/components/header/HeaderContainer.vue";
import MainContainer from "@/components/main-container/MainContainer.vue";
import FooterContainer from "@/components/footer/FooterContainer.vue";
// @ is an alias to /src

export default {
  name: "FavouriteLocationsView",
  components: { HeaderContainer, MainContainer, FooterContainer },
};
</script>
