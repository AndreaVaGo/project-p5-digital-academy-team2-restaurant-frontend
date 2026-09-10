import { createRouter, createWebHistory } from "vue-router";
import LoginView from "../Views/LoginView.vue";
import RegisterView from "../Views/RegisterView.vue";
import ReservationView from "../Views/ReservationView.vue";

const routes = [
  { path: "/", name: "login", component: LoginView, alias: "/login" },
  { path: "/register", name: "register", component: RegisterView },
  {
    path: "/reservation",
    name: "reservation",
    component: ReservationView,
  },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
