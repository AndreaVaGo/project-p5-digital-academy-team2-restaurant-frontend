import { createRouter, createWebHistory } from "vue-router";
import Home from "../components/Home.vue";
import LoginView from "../Views/LoginView.vue";
import RegisterView from "../Views/RegisterView.vue";
import CartView from "../Views/CartView.vue";
import MyAccountView from "../Views/MyAccountView.vue";
import CustomerProfileView from "../Views/CustomerProfileView.vue";
import AdminLayout from "../Views/AdminLayout.vue";
import AdminDashboardView from "../Views/AdminDashboardView.vue";
import AdminProductsView from "../Views/AdminProductsView.vue";
import AdminOrdersView from "../Views/AdminOrdersView.vue";
import AdminBillingView from "../Views/AdminBillingView.vue";
import AdminWelcomeView from "../Views/AdminWelcomeView.vue";
import ProductDetailView from "../Views/ProductDetailView.vue";
import ReservationView from "../Views/ReservationView.vue";
import CartaView from "../Views/CartaView.vue";
import KitchenDashboardView from "../Views/KitchenDashboardView.vue";
import SpecialOffersView from "../Views/SpecialOffersView.vue";
import EventsCalendarView from "../Views/EventsCalendarView.vue";
import PaymentView from "../Views/PaymentView.vue";
import DeliveryLayout from "../Views/DeliveryLayout.vue";
import DeliveryDashboardView from "../Views/DeliveryDashboardView.vue";
import DeliveryOrdersView from "../Views/DeliveryOrdersView.vue";

const routes = [
  { path: "/", name: "home", component: Home, alias: "/home" },
  { path: "/login", name: "login", component: LoginView, alias: "/login" },
  { path: "/register", name: "register", component: RegisterView },
  { path: "/cart", name: "cart", component: CartView, alias: "/cart" },
  { path: "/account", name: "account", component: MyAccountView },
  {
    path: "/account/profile",
    name: "customer-profile",
    component: CustomerProfileView,
  },
  {
    path: "/admin",
    component: AdminLayout,
    children: [
      { path: "", name: "admin-dashboard", component: AdminDashboardView },
      {
        path: "productos",
        name: "admin-products",
        component: AdminProductsView,
      },
      { path: "pedidos", name: "admin-orders", component: AdminOrdersView },
      {
        path: "facturacion",
        name: "admin-billing",
        component: AdminBillingView,
      },
    ],
  },
  {
    path: "/admin/welcome",
    name: "admin-welcome",
    component: AdminWelcomeView,
  },
  {
    path: "/product/:id",
    name: "product-detail",
    component: ProductDetailView,
  },
  {
    path: "/carta",
    name: "carta",
    component: CartaView,
  },
  {
    path: "/cocina",
    name: "kitchen-dashboard",
    component: KitchenDashboardView,
  },
  {
    path: "/ofertas-eventos",
    name: "special-offers",
    component: SpecialOffersView,
  },
  {
    path: "/calendario-eventos",
    name: "events-calendar",
    component: EventsCalendarView,
  },
  { path: "/payment", name: "payment", component: PaymentView },
  {
    path: "/motorista",
    component: DeliveryLayout,
    children: [
      {
        path: "",
        name: "delivery-dashboard",
        component: DeliveryDashboardView,
      },
      {
        path: "entregas",
        name: "delivery-orders",
        component: DeliveryOrdersView,
      },
    ],
  },
  {
    path: "/reservation",
    name: "reservation",
    component: ReservationView,
    alias: "/reservation",
  },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});