import { ref } from 'vue'

/*
 * Ruta del back para los productos (la Carta).
 * Es relativa: el proxy de vite.config.js la reenvía al back en desarrollo.
 */
const PRODUCTS_URL = '/api/products'

/*
 * Estado compartido: está fuera de la función para que la Home y la Carta
 * usen la misma lista de productos.
 */
const products = ref([])
const cargando = ref(false)
const errorCarga = ref(false)

/*
 * Adaptador: traduce un producto del back al formato que espera ProductCard.
 * El back envía la etiqueta en dos campos planos (badgeLabel, badgeTone)
 * y las tarjetas esperan un objeto badge: { label, tone }, o null si no hay etiqueta.
 */
function adaptProduct(product) {
  return {
    id: product.id,
    name: product.name,
    description: product.description,
    price: Number(product.price),
    image: product.image,
    category: product.category,
    available: product.available,
    featured: product.featured,
    badge: product.badgeLabel ? { label: product.badgeLabel, tone: product.badgeTone } : null,
  }
}

/*
 * Pide los productos al back y los adapta.
 * fetch no lanza error si el servidor responde 404 o 500,
 * por eso se comprueba response.ok a mano.
 */
async function cargarProductos() {
  cargando.value = true
  errorCarga.value = false
  try {
    const response = await fetch(PRODUCTS_URL)
    if (!response.ok) throw new Error('Error al cargar los productos')
    const data = await response.json()
    products.value = data.map(adaptProduct)
  } catch (err) {
    console.warn('No se pudo conectar con el backend de productos:', err)
    errorCarga.value = true
  } finally {
    /* Se ejecuta siempre, haya ido bien o mal */
    cargando.value = false
  }
}

export function useProducts() {
  function toggleFeatured(productId) {
    const product = products.value.find((p) => p.id === productId)
    if (product) product.featured = !product.featured
  }

  return {
    products,
    cargando,
    errorCarga,
    cargarProductos,
    toggleFeatured,
  }
}