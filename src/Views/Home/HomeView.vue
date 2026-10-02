<script setup>
import { computed, onMounted } from "vue";
import HeroSection from "../../components/HeroSection.vue";
import SpecialtiesSection from "../../components/SpecialtiesSection.vue";
import EventsSection from "../../components/EventsSection.vue";
import ContactForm from "../../components/ContactForm.vue";
import { useProducts } from "@/composables/useProducts";
import { useEvents } from "@/composables/useEvents";

const { products, cargarProductos } = useProducts();
const dishes = computed(() => products.value.filter((p) => p.featured));

onMounted(cargarProductos);

const { events: allEvents, cargarEventos } = useEvents();

const events = computed(() => {
  const now = new Date();

  return allEvents.value.filter(
    (e) => e.featured && new Date(e.eventDate) > now,
  );
});

onMounted(cargarEventos);
</script>

<template>
  <main class="home flex w-full flex-col animate-[fade-in-up_0.6s_ease-out]">
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
  background-image: url("/home-img/home-background.png");
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: 150% auto;
  background-position: 88% center;
}

@media (max-width: 767px) {
  .atmosphere-wrapper {
    background-image: url("/home-img/home-background.png");
    background-repeat: no-repeat;
    background-size: auto 100%;
    background-position: 78% top;
    overflow: clip;
  }
}

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