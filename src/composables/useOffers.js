import { ref, computed } from 'vue'
import { formatCurrency } from '@/utils/formatCurrency'

/*
 * Ruta del back para las ofertas.
 * Es relativa: el proxy de vite.config.js la reenvía al back en desarrollo.
 */
const OFFERS_URL = '/api/offers'

/* Estado compartido de las ofertas */
const offers = ref([])
const cargando = ref(false)
const errorCarga = ref(false)

/*
 * Adaptador: traduce una oferta del back al formato que usa la vista.
 * - price: el back envía un número (o null); la vista muestra "85,00 € / persona".
 * - cta: texto del botón, igual para todas las ofertas.
 */
function adaptOffer(offer) {
  return {
    id: offer.id,
    title: offer.title,
    description: offer.description,
    image: offer.image,
    badge: offer.badge,
    featured: offer.featured,
    price: offer.price != null ? `${formatCurrency(offer.price)} / persona` : null,
    cta: 'RESERVA AHORA',
  }
}

/*
 * La oferta principal es la marcada como destacada (featured),
 * y las de temporada son el resto.
 */
const featuredOffer = computed(() => offers.value.find((o) => o.featured) ?? null)
const seasonalOffers = computed(() => offers.value.filter((o) => !o.featured))

/*
 * Pide las ofertas al back y las adapta.
 * fetch no lanza error si el servidor responde 404 o 500,
 * por eso se comprueba response.ok a mano.
 */
async function cargarOfertas() {
  cargando.value = true
  errorCarga.value = false
  try {
    const response = await fetch(OFFERS_URL)
    if (!response.ok) throw new Error('Error al cargar las ofertas')
    const data = await response.json()
    offers.value = data.map(adaptOffer)
  } catch (err) {
    console.warn('No se pudo conectar con el backend de ofertas:', err)
    errorCarga.value = true
  } finally {
    /* Se ejecuta siempre, haya ido bien o mal */
    cargando.value = false
  }
}

export function useOffers() {
  return {
    offers,
    featuredOffer,
    seasonalOffers,
    cargando,
    errorCarga,
    cargarOfertas,
  }
}