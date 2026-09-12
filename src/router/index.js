import { createRouter, createWebHistory } from "vue-router";
import Home from "../components/Home.vue";
import LoginView from "../Views/LoginView.vue";
import RegisterView from "../Views/RegisterView.vue";
import ReservationView from "../Views/ReservationView.vue";

const routes = [
  { path: "/", name: "home", component: Home, alias: "/home" },
  { path: "/login", name: "login", component: LoginView, alias: "/login" },
  { path: "/register", name: "register", component: RegisterView },
  { path: "/reservation", name: "reservation", component: ReservationView, alias: "/reservation"},
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
