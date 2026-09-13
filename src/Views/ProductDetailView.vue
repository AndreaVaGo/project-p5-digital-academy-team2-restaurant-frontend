<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import fabadaImg from '@/assets/images/menu/fabada.png'
import trigoIcon from '@/assets/images/icon-alegernos/trigo.png'
import lacteosIcon from '@/assets/images/icon-alegernos/productos-lacteos.png'
import huevosIcon from '@/assets/images/icon-alegernos/huevos.png'

const route = useRoute()
const productId = route.params.id

const allergenIcons = {
  Gluten: trigoIcon,
  'Lácteos': lacteosIcon,
  Huevo: huevosIcon,
}

const product = ref({
  id: productId,
  name: 'Fabada Asturiana',
  price: 24.50,
  image: fabadaImg,
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  ingredients: 'Fabes, chorizo, morcilla, panceta, cebolla y pimentón.',
  allergens: ['Gluten', 'Lácteos', 'Huevo'],
  available: true,
})

const notes = ref('')
const quantity = ref(1)

const formattedPrice = computed(() =>
  product.value.price.toLocaleString('es-ES', { minimumFractionDigits: 2 })
)
const total = computed(() =>
  (product.value.price * quantity.value).toLocaleString('es-ES', { minimumFractionDigits: 2 })
)

function increaseQuantity() {
  quantity.value++
}
function decreaseQuantity() {
  if (quantity.value > 1) quantity.value--
}
function addToOrder() {
  console.log('Añadir al pedido', {
    productId: product.value.id,
    quantity: quantity.value,
    notes: notes.value,
  })
}
</script>

<template>
  <div class="page text-left">
    <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-[662px_466px] gap-8 md:gap-6 p-6 md:p-16 items-start">
      <!-- Columna izquierda: 662px -->
      <div class="flex flex-col gap-8">
        <img
          :src="product.image"
          :alt="product.name"
          class="w-full aspect-[662/361.64] object-cover rounded-lg"
        />

        <div>
          <h1 class="text-white! font-headline text-[32px] leading-10 md:text-[48px] md:leading-14 font-semibold">
            {{ product.name }}
          </h1>
          <p class="font-headline text-headline-md font-medium text-highlight mt-2">
            {{ formattedPrice }} €
          </p>
        </div>

        <p class="font-body text-[16px] leading-6.5 font-normal text-white">
          {{ product.description }}
        </p>

        <hr class="border-outline-variant/40" />

        <div>
          <h3 class="font-ui text-label-caps tracking-caps uppercase font-semibold text-outline">
            Ingredientes
          </h3>
          <p class="font-body text-body-md text-white mt-1">{{ product.ingredients }}</p>
        </div>

        <hr class="border-outline-variant/40" />

        <div>
          <h3 class="font-ui text-label-caps tracking-caps uppercase font-semibold text-outline">
            Alérgenos
          </h3>
          <div class="flex flex-wrap gap-4 mt-3">
            <span
              v-for="allergen in product.allergens"
              :key="allergen"
              class="flex items-center gap-1 font-ui text-label-caps tracking-caps text-white"
            >
              <img :src="allergenIcons[allergen]" class="w-4 h-4" alt="" />
              {{ allergen }}
            </span>
          </div>
        </div>
      </div>

      <!-- Columna derecha: 466px, altura automática según contenido -->
      <div class="bg-surface-container-low border border-outline-variant/20 rounded-lg shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] p-6 md:p-8">
        <p class="font-ui text-label-caps tracking-caps uppercase font-semibold text-on-surface">
          ¿Quieres añadir alguna indicación?
        </p>
        <textarea
          v-model="notes"
          maxlength="250"
          placeholder="Ej: Sin cebolla, sin salsa, poco hecho..."
          class="mt-2 w-full h-32 bg-surface border border-highlight rounded-md p-3 font-body text-body-md resize-none"
        ></textarea>
        <p class="text-right font-ui text-label-caps text-outline">{{ notes.length }} / 250</p>

        <hr class="my-4 border-outline-variant/30" />

        <div class="flex items-center justify-between">
          <span class="font-ui text-label-caps tracking-caps uppercase font-semibold text-on-surface">
            Cantidad
          </span>
          <div class="flex items-center gap-3">
            <button @click="decreaseQuantity" class="border border-highlight rounded-md w-9 h-9 flex items-center justify-center">-</button>
            <span class="font-body">{{ quantity }}</span>
            <button @click="increaseQuantity" class="border border-highlight rounded-md w-9 h-9 flex items-center justify-center">+</button>
          </div>
        </div>

        <hr class="my-4 border-outline-variant/30" />

        <div class="w-full bg-surface border border-outline-variant/20 rounded p-6">
          <h3 class="text-on-surface! font-headline text-xl font-semibold mb-3">Resumen</h3>
          <div class="flex flex-col gap-4">
            <div class="flex justify-between gap-2 font-body text-sm">
              <span class="shrink-0">Producto:</span>
              <span class="text-right">{{ product.name }}</span>
            </div>
            <div class="flex justify-between gap-2 font-body text-sm">
              <span class="shrink-0">Cantidad:</span>
              <span class="text-right">{{ quantity }}</span>
            </div>
            <div class="flex justify-between gap-2 font-body text-sm">
              <span class="shrink-0">Indicaciones:</span>
              <span class="text-right">{{ notes || 'sin indicaciones especiales' }}</span>
            </div>

            <hr class="border-outline-variant/30" />

            <div class="flex justify-between items-center font-semibold">
              <span class="font-ui text-on-surface!">TOTAL</span>
              <span class="font-headline text-[28px] leading-6 font-medium text-primary">{{ total }} €</span>
            </div>
          </div>
        </div>

        <button
          @click="addToOrder"
          :disabled="!product.available"
          class="mt-4 w-full bg-primary-container text-white rounded-xl py-4 font-ui text-button font-semibold disabled:opacity-50"
        >
          AÑADIR AL PEDIDO
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* ⚠️ PROVISIONAL: valor aproximado a ojo, pendiente de confirmar con el hex real de Figma (fondo de la página) */
.page {
  background-color: #7c8874;
  min-height: 100vh;
}
</style>