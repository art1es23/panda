import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import LocationView from "../views/LocationView.vue";
import FavouriteLocationsView from "../views/FavouriteLocationsView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/favourite-locations",
    name: "favourite-locations",
    component: FavouriteLocationsView,
  },
  {
    path: "/location/:name",
    name: "location",
    component: LocationView,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
