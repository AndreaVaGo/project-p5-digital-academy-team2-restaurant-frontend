<script setup>
import { ref, computed, onMounted } from 'vue'
import CategoryTabs from '../../components/CategoryTabs.vue'
import ProductCard from '../../components/ProductCard.vue'
import { useProducts } from '@/composables/useProducts'
import { useCart } from '@/composables/useCart'

const categories = ['Todos', 'Especialidades', 'Entrantes', 'Carnes', 'Pescados', 'Postres', 'Bebidas']
const activeCategory = ref('Todos')

/* Los productos vienen del back a través del composable compartido */
const { products, cargando, errorCarga, cargarProductos } = useProducts()

/* Carrito compartido de la aplicación */
const { addItem } = useCart()

/* Al entrar en la Carta se piden los productos al back */
onMounted(cargarProductos)

const filteredProducts = computed(() =>
  activeCategory.value === 'Todos'
    ? products.value
    : products.value.filter((product) => product.category === activeCategory.value)
)

/*
 * ProductCard emite 'add' con { id, quantity }.
 * addItem necesita el producto completo y suma de uno en uno,
 * así que se busca el producto por su id y se añade tantas veces como indique la cantidad.
 */
function handleAdd({ id, quantity }) {
  const product = products.value.find((p) => p.id === id)
  if (!product) return
  for (let i = 0; i < quantity; i++) {
    addItem(product)
  }
}
</script>

<template>
  <div class="bg-surface-dim">
    <header class="bg-inverse-surface px-5 py-16 text-center md:px-16">
      <p class="font-ui text-label-caps font-semibold uppercase tracking-caps text-highlight">
        ¡Fartucos de sabor!
      </p>
      <h1 class="mt-3 font-headline text-4xl font-medium text-inverse-on-surface md:text-5xl">Nuestra Carta</h1>
      <p class="mx-auto mt-4 max-w-2xl font-body text-body-md text-inverse-on-surface/80">
        Explora una cuidada selección de platos que honran la rica tradición gastronómica de Asturias, elevados con
        técnicas modernas e ingredientes de proximidad.
      </p>
    </header>

    <main class="mx-auto max-w-7xl px-5 py-12 md:px-16">
      <CategoryTabs v-model="activeCategory" :categories="categories" />

      <!-- Mientras llega la respuesta del back -->
      <p v-if="cargando" class="mt-10 text-center font-body text-body-md">Cargando la carta…</p>

      <!-- Si el back no responde o devuelve un error -->
      <p v-else-if="errorCarga" class="mt-10 text-center font-body text-body-md">
        No se ha podido cargar la carta. Inténtalo de nuevo más tarde.
      </p>

      <div v-else class="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        <!-- @add escucha el aviso de la tarjeta al pulsar "Añadir" -->
        <ProductCard
          v-for="product in filteredProducts"
          :key="product.id"
          :product="product"
          @add="handleAdd"
        />
      </div>
    </main>
  </div>
</template>