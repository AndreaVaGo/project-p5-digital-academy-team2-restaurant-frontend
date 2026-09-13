import { createRouter, createWebHistory } from "vue-router";
import Home from "../components/Home.vue";
import LoginView from "../Views/LoginView.vue";
import RegisterView from "../Views/RegisterView.vue";
import CartView from "../Views/CartView.vue";

const routes = [
  { path: "/", name: "home", component: Home, alias: "/home" },
  { path: "/login", name: "login", component: LoginView, alias: "/login" },
  { path: "/register", name: "register", component: RegisterView },
  { path: "/cart",name: "cart", component: CartView, alias: "/cart"  },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
