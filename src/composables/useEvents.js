import { ref } from 'vue'

const events = ref([
  {
    id: 1,
    image: '/events-img/events-pairing.jpeg',
    date: '28 MARZO · 20:30H',
    title: 'Cena Maridaje: Sidras de Espalme & Cortes Nobles',
    description:
      'Un recorrido por 6 llagares históricos guiado por nuestra sumiller María Fernández, maridando cada paso con piezas singulares de goxu asturiano a baja temperatura.',
    meta: ['18 plazas exclusivas', '75 € / persona'],
    featured: true,
  },
  {
    id: 2,
    image: '/events-img/events-asturian-cured-pork-sausage.jpeg',
    date: '2 ABRIL · 14:00H',
    title: 'Jornadas Gastronómicas del Chosco y la Carrillera',
    description:
      'Tres días dedicados a la reinterpretación de dos grandes pilares de la cocina de montaña. Recetas tradicionales encontrándose con técnicas moleculares y texturas crujientes.',
    meta: ['Menú degustación 5 pases', '48 € / persona'],
    featured: true,
  },
  {
    id: 3,
    image: '/events-img/events-panel-discussion.jpeg',
    date: '24 ABRIL · 19:00H',
    title: 'Mesa Redonda: De la Dehesa al plato',
    description:
      'Diálogo abierto entre criadores de goxu asturcelta, llagareros artesanales y nuestro equipo de cocina sobre la preservación de razas autóctonas y sostenibilidad rural.',
    meta: ['Coloquio & Cóctel de cierre', 'Entrada gratuita'],
    featured: true,
  },
  {
    id: 4,
    image: '/events-img/events-pairing.jpeg',
    date: '15 JUNIO · 21:00H',
    title: 'Noche de Sidra Bajo las Estrellas',
    description:
      'Cena al aire libre en nuestra terraza, con escanciado tradicional y música en directo de gaita asturiana.',
    meta: ['Terraza exterior', '55 € / persona'],
    featured: false,
  },
  {
    id: 5,
    image: '/events-img/events-asturian-cured-pork-sausage.jpeg',
    date: '20 SEPTIEMBRE · 20:00H',
    title: 'Vendimia y Sidra: Fiesta de la Cosecha',
    description:
      'Celebración del cierre de temporada con productos de proximidad y una selección especial de sidras de la casa.',
    meta: ['Aforo limitado', '60 € / persona'],
    featured: false,
  },
])

/* Event management (create/edit, toggle featured) lives in Andrea's Admin
 * panel, same pattern as products (AdminProductsView.vue).
 */
export function useEvents() {
  function toggleFeatured(eventId) {
    const event = events.value.find((e) => e.id === eventId)
    if (event) event.featured = !event.featured
  }

  return {
    events,
    toggleFeatured,
  }
}