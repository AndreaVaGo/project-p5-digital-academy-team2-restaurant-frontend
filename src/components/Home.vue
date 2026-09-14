<script setup>
import HeroSection from './HeroSection.vue'
import SpecialtiesSection from './SpecialtiesSection.vue'
import EventsSection from './EventsSection.vue'
import ContactForm from './ContactForm.vue'

/*
 * TODO: reasonable placeholder content per dish, pending the real and
 * definitive data that will arrive with the Menu epic
 * (exact name, price, description and allergens confirmed by kitchen staff).
 */
const dishes = [
  {
    id: 1,
    image: '/home-img/home-card-beef-cheek.jpeg',
    badge: 'Recomendado',
    available: true,
    name: 'Carrillera de Goxu a la Sidra',
    price: '24,50 €',
    description: 'Guiso tradicional a fuego lento con reducción de sidra natural DOP de Asturias.',
    allergens: ['Gluten', 'Sulfitos'],
  },
  {
    id: 2,
    image: '/home-img/home-card-bao-bread.jpeg',
    badge: null,
    available: true,
    name: 'Pan Bao de Goxu',
    price: '14,00 €',
    description: 'Bao esponjoso relleno de goxu deshilachado, encurtidos y salsa asturiana.',
    allergens: ['Gluten'],
  },
  {
    id: 3,
    image: '/home-img/home-card-traditional-asturian-free-range-rooster.jpeg',
    badge: null,
    available: true,
    name: 'Pitu Asturcelta Asado',
    price: '19,50 €',
    description: 'Pitu de raza asturcelta asado lentamente, con salsa de sidra y hierbas de la huerta.',
    allergens: ['Sulfitos'],
  },
  {
    id: 4,
    image: '/home-img/home-card-croquettes.jpeg',
    badge: 'Agotado',
    available: false,
    name: 'Croquetas de Goxu',
    price: '9,50 €',
    description: 'Croquetas caseras cremosas de goxu ibérico, fritas al momento.',
    allergens: ['Gluten', 'Lácteos'],
  },
]

/*
 * TODO: content as it appears in the Figma design. Replace with real
 * event data once that data source exists (likely backend, Admin/Events epic).
 */
const events = [
  {
    id: 1,
    image: '/events-img/events-pairing.jpeg',
    date: '28 MARZO · 20:30H',
    title: 'Cena Maridaje: Sidras de Espalme & Cortes Nobles',
    description:
      'Un recorrido por 6 llagares históricos guiado por nuestra sumiller María Fernández, maridando cada paso con piezas singulares de goxu asturiano a baja temperatura.',
    meta: ['18 plazas exclusivas', '75 € / persona'],
  },
  {
    id: 2,
    image: '/events-img/events-asturian-cured-pork-sausage.jpeg',
    date: '2 ABRIL · 14:00H',
    title: 'Jornadas Gastronómicas del Chosco y la Carrillera',
    description:
      'Tres días dedicados a la reinterpretación de dos grandes pilares de la cocina de montaña. Recetas tradicionales encontrándose con técnicas moleculares y texturas crujientes.',
    meta: ['Menú degustación 5 pases', '48 € / persona'],
  },
  {
    id: 3,
    image: '/events-img/events-panel-discussion.jpeg',
    date: '24 ABRIL · 19:00H',
    title: 'Mesa Redonda: De la Dehesa al plato',
    description:
      'Diálogo abierto entre criadores de goxu asturcelta, llagareros artesanales y nuestro equipo de cocina sobre la preservación de razas autóctonas y sostenibilidad rural.',
    meta: ['Coloquio & Cóctel de cierre', 'Entrada gratuita'],
  },
]
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