<script setup>
import logo from '../assets/images/branding/logo-Goxu.png'
import userIcon from '../assets/images/home/login.png'
import cartIcon from '../assets/images/home/carrito.png'

const links = [
  { label: 'Inicio', to: '/' },
  { label: 'Carta', to: '/carta' },
  { label: 'Reservas', to: null },
  { label: 'Nosotros', to: null },
  { label: 'Contacto', to: null },
  { label: 'Ofertas', to: null },
]
</script>

<template>
  <header class="flex items-center justify-between gap-6 bg-inverse-surface px-5 py-4 md:px-16">
    <RouterLink to="/" class="shrink-0">
      <img :src="logo" alt="Goxu" class="h-16 w-auto" />
    </RouterLink>

    <nav class="hidden items-center gap-6 md:flex">
      <template v-for="link in links" :key="link.label">
        <RouterLink
          v-if="link.to"
          :to="link.to"
          class="font-ui text-sm font-semibold text-inverse-on-surface hover:text-highlight"
          active-class="text-highlight"
        >
          {{ link.label }}
        </RouterLink>
        <span v-else class="font-ui text-sm font-semibold text-inverse-on-surface/50">{{ link.label }}</span>
      </template>
    </nav>

    <div class="flex items-center gap-4">
      <RouterLink to="/account">
        <img :src="userIcon" alt="Mi cuenta" class="h-12 w-12" />
      </RouterLink>
      <a href="#" class="relative">
        <img :src="cartIcon" alt="Carrito" class="h-5 w-5" />
        <span class="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-highlight"></span>
      </a>
    </div>
  </header>
</template>
