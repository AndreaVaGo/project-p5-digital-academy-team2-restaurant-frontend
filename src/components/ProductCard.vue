<script setup>
import { ref } from 'vue'
import { formatCurrency } from '../utils/formatCurrency'
import QuantityStepper from './QuantityStepper.vue'

const props = defineProps({
  product: { type: Object, required: true },
})

const emit = defineEmits(['add'])

const quantity = ref(props.product.available ? 1 : 0)

const badgeToneClasses = {
  primary: 'text-primary',
  highlight: 'text-highlight',
  neutral: 'text-on-surface',
}

function handleAdd() {
  emit('add', { id: props.product.id, quantity: quantity.value })
}
</script>

<template>
  <article class="flex flex-col overflow-hidden rounded-lg bg-surface-container-lowest shadow-sm">
    <RouterLink :to="`/product/${product.id}`" class="block">
      <div class="relative">
        <img :src="product.image" :alt="product.name" class="h-56 w-full object-cover" />
        <span
          v-if="product.badge"
          class="absolute left-3 top-3 rounded-full bg-surface-container-lowest/90 px-3 py-1 font-ui text-xs font-semibold uppercase tracking-caps"
          :class="badgeToneClasses[product.badge.tone] ?? badgeToneClasses.neutral"
        >
          {{ product.badge.label }}
        </span>
      </div>

      <div class="flex items-start justify-between gap-2 px-5 pt-5">
        <h3 class="font-headline text-xl font-medium text-on-surface">{{ product.name }}</h3>
        <span class="whitespace-nowrap font-headline text-lg font-semibold text-primary">
          {{ formatCurrency(product.price) }}
        </span>
      </div>
    </RouterLink>

    <p class="px-5 pt-2 font-body text-sm text-on-surface-variant">{{ product.description }}</p>

    <div class="mt-4 flex items-center justify-between border-t border-outline-variant/30 px-5 py-4">
      <QuantityStepper v-model="quantity" :disabled="!product.available" />

      <button
        v-if="product.available"
        type="button"
        class="rounded-lg bg-primary px-5 py-2 font-ui text-sm font-semibold text-on-primary transition-opacity hover:opacity-90"
        @click="handleAdd"
      >
        Añadir
      </button>
      <span v-else class="font-ui text-sm font-semibold uppercase tracking-caps text-error">
        Agotado
      </span>
    </div>
  </article>
</template>
