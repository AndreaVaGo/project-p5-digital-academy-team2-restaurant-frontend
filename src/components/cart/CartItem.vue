<script setup>
defineProps({
  item: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits([
  "increase",
  "decrease",
  "remove",
]);
</script>

<template>
  <article
    class="flex gap-4 border-b border-[var(--color-outline-variant)] pb-6 last:border-b-0 last:pb-0"
  >
    <!-- Imagen -->
    <div
      class="h-24 w-24 shrink-0 overflow-hidden rounded-2xl bg-[var(--color-surface-container)]"
    >
      <img
        :src="item.product.image"
        :alt="item.product.name"
        class="h-full w-full object-cover"
      />
    </div>

    <!-- Información -->
    <div class="min-w-0 flex-1">
      <div class="flex items-start justify-between gap-3">
        <div class="min-w-0">
          <h3
            class="font-headline text-xl font-semibold text-[var(--color-on-surface)] sm:text-2xl"
          >
            {{ item.product.name }}
          </h3>

          <p
            class="mt-1 font-body text-sm leading-5 text-[var(--color-on-surface-variant)]"
          >
            {{ item.product.description }}
          </p>
        </div>

        <!-- Eliminar -->
        <button
          type="button"
          aria-label="Eliminar producto"
          class="shrink-0 font-ui text-lg text-[var(--color-outline)] transition-colors hover:text-[var(--color-error)]"
          @click="emit('remove', item.product.id)"
        >
          ×
        </button>
      </div>

      <!-- Precio y cantidad -->
      <div
        class="mt-4 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between"
      >
        <span
          class="font-ui text-sm font-semibold text-[var(--color-on-surface)]"
        >
          €{{ item.product.price.toFixed(2) }}
        </span>

        <div
          class="flex items-center gap-3 rounded-full border border-[var(--color-outline-variant)] px-2 py-1"
        >
          <!-- Restar -->
          <button
            type="button"
            aria-label="Reducir cantidad"
            class="flex h-8 w-8 items-center justify-center rounded-full font-ui text-lg text-[var(--color-on-surface)]"
            @click="emit('decrease', item.product.id)"
          >
            −
          </button>

          <span
            class="min-w-5 text-center font-ui text-sm font-semibold text-[var(--color-on-surface)]"
          >
            {{ item.quantity }}
          </span>

          <!-- Añadir -->
          <button
            type="button"
            aria-label="Aumentar cantidad"
            class="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--color-primary)] font-ui text-lg text-[var(--color-on-primary)]"
            @click="emit('increase', item.product.id)"
          >
            +
          </button>
        </div>
      </div>
    </div>
  </article>
</template>

<style scoped>
</style>