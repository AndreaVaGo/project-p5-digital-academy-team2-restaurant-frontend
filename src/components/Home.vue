<script setup>
import { computed } from 'vue'
import HeroSection from './HeroSection.vue'
import SpecialtiesSection from './SpecialtiesSection.vue'
import EventsSection from './EventsSection.vue'
import ContactForm from './ContactForm.vue'
import { useProducts } from '@/composables/useProducts'
import { useEvents } from '@/composables/useEvents'

const { products } = useProducts()
const dishes = computed(() => products.value.filter((p) => p.featured))

const { events: allEvents } = useEvents()
const events = computed(() => allEvents.value.filter((e) => e.featured))
</script>

<template>
  <main class="home flex flex-col w-full animate-[fade-in-up_0.6s_ease-out]">
    <div class="atmosphere-wrapper relative">
      <HeroSection />
      <SpecialtiesSection :dishes="dishes" />
      <EventsSection :events="events" />
      <ContactForm />
    </div>
  </main>
</template>

<style scoped>
.atmosphere-wrapper {
  background-image: url('/home-img/home-background.png');
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: 150% auto;
  background-position: 88% center;
}

/* GC-83: animación de entrada (estilos mobile-first) */
@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>