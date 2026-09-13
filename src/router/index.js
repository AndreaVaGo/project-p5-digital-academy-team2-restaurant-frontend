import { createRouter, createWebHistory } from 'vue-router'
import Home from '../components/Home.vue'
import LoginView from '../Views/LoginView.vue'
import RegisterView from '../Views/RegisterView.vue'
import AdminWelcomeView from '../Views/AdminWelcomeView.vue'

const routes = [
  { path: '/', name: 'home', component: Home, alias: '/home' },
  { path: '/login', name: 'login', component: LoginView, alias: '/login' },
  { path: '/register', name: 'register', component: RegisterView },
  { path: '/admin/welcome', name: 'admin-welcome', component: AdminWelcomeView },
]

export default createRouter({
  history: createWebHistory(),
  routes,
})