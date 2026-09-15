<script setup>
import { ref, computed } from 'vue'
import CategoryTabs from '../components/CategoryTabs.vue'
import ProductCard from '../components/ProductCard.vue'

import cachopoImg from '@/assets/images/menu/cachopo-tradicional.png'
import fabadaImg from '@/assets/images/menu/fabada.png'
import arrozConLecheImg from '@/assets/images/menu/arroz-con-leche.png'
import croquetasImg from '@/assets/images/menu/croquetas-jamon.png'
import cochinilloImg from '@/assets/images/menu/cochinillo.png'
import baoImg from '@/assets/images/menu/bao-panceta.png'
import tartaQuesoImg from '@/assets/images/menu/tarta-queso.png'
import sidraImg from '@/assets/images/menu/sidra.png'

const categories = ['Todos', 'Especialidades', 'Entrantes', 'Carnes', 'Pescados', 'Postres', 'Bebidas']
const activeCategory = ref('Todos')

const products = [
  {
    id: 1,
    name: 'Cachopo Tradicional',
    price: 24.5,
    image: cachopoImg,
    category: 'Carnes',
    available: true,
    badge: { label: 'Recomendado', tone: 'primary' },
    description:
      'Dos tiernos filetes de ternera asturiana rellenos de jamón serrano reserva y queso de Pría fundido, empanado crujiente. Acompañado de patatas gajo.',
  },
  {
    id: 2,
    name: 'Fabada Asturiana',
    price: 18.0,
    image: fabadaImg,
    category: 'Especialidades',
    available: true,
    badge: { label: 'Clásico', tone: 'highlight' },
    description:
      'La auténtica fabada elaborada a fuego lento con faba de la Granja IGP y nuestro compango seleccionado (chorizo, morcilla y panceta ahumada).',
  },
  {
    id: 3,
    name: 'Arroz con Leche Réquexu',
    price: 6.5,
    image: arrozConLecheImg,
    category: 'Postres',
    available: false,
    badge: { label: 'Postre', tone: 'neutral' },
    description:
      'Cremoso y suave, requemado al momento con azúcar de caña. Una receta familiar transmitida de generación en generación.',
  },
  {
    id: 4,
    name: 'Croquetas de Jamón',
    price: 9.5,
    image: croquetasImg,
    category: 'Entrantes',
    available: true,
    badge: null,
    description: 'Croquetas caseras cremosas de jamón ibérico, fritas al momento y de textura crujiente.',
  },
  {
    id: 5,
    name: 'Cochinillo Asado',
    price: 22.0,
    image: cochinilloImg,
    category: 'Carnes',
    available: true,
    badge: null,
    description: 'Cochinillo asado lentamente hasta conseguir una piel crujiente y una carne jugosa y tierna.',
  },
  {
    id: 6,
    name: 'Bao de Panceta',
    price: 12.0,
    image: baoImg,
    category: 'Entrantes',
    available: true,
    badge: null,
    description: 'Pan bao esponjoso relleno de panceta confitada, encurtidos y salsa asturiana.',
  },
  {
    id: 7,
    name: 'Tarta de Queso',
    price: 7.0,
    image: tartaQuesoImg,
    category: 'Postres',
    available: true,
    badge: { label: 'Postre', tone: 'neutral' },
    description: 'Tarta de queso cremosa horneada al estilo tradicional, con un ligero toque caramelizado.',
  },
  {
    id: 8,
    name: 'Sidra Natural',
    price: 8.0,
    image: sidraImg,
    category: 'Bebidas',
    available: true,
    badge: null,
    description: 'Sidra natural asturiana DOP, servida escanciada al momento.',
  },
]

const filteredProducts = computed(() =>
  activeCategory.value === 'Todos'
    ? products
    : products.filter((product) => product.category === activeCategory.value)
)
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

    <main class="mx-auto max-w-[1280px] px-5 py-12 md:px-16">
      <CategoryTabs v-model="activeCategory" :categories="categories" />

      <div class="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        <ProductCard v-for="product in filteredProducts" :key="product.id" :product="product" />
      </div>
    </main>
  </div>
</template>
