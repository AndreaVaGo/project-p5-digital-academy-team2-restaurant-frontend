<script setup>
defineProps({
  dishes: {
    type: Array,
    required: true,
  },
})
</script>

<template>
  <section class="relative px-6 py-16 lg:px-16 lg:py-24">
    <div class="absolute inset-0 bg-black/50"></div>

    <div class="relative max-w-6xl mx-auto">
      <div class="mb-10">
        <h2
          class="text-on-primary text-3xl md:text-4xl lg:text-5xl leading-tight m-0"
          style="font-family: 'Cormorant Garamond', serif"
        >
          Especialidades de la casa
        </h2>
        <p class="text-on-primary text-base mt-2" style="font-family: 'Manrope', sans-serif">
          El goxu es nuestro protagonista indiscutible.
        </p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <article
          v-for="dish in dishes"
          :key="dish.id"
          class="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-lg flex flex-col"
        >
          <div class="relative">
            <img :src="dish.image" :alt="dish.name" class="w-full h-48 object-cover" />
            <span
              v-if="dish.badge"
              class="absolute top-3 left-3 bg-surface-container-lowest text-on-surface text-xs font-semibold uppercase px-3 py-1 rounded-full"
            >
              {{ dish.badge }}
            </span>
            <span
              v-if="!dish.available"
              class="absolute top-3 right-3 bg-error text-on-error text-xs font-semibold px-3 py-1 rounded-full"
            >
              No disponible
            </span>
          </div>

          <div class="p-5 flex flex-col gap-3 flex-1">
            <div class="flex items-start justify-between gap-2">
              <h3 class="text-lg font-semibold m-0 text-on-surface" style="font-family: 'Manrope', sans-serif">
                {{ dish.name }}
              </h3>
              <span class="text-primary font-semibold whitespace-nowrap">{{ dish.price }}</span>
            </div>

            <p class="text-on-surface-variant text-sm m-0">{{ dish.description }}</p>

            <div class="flex flex-wrap items-center gap-2 text-xs text-on-surface-variant">
              <span class="w-2 h-2 rounded-full bg-highlight"></span>
              <span>Alérgenos:</span>
              <span
                v-for="allergen in dish.allergens"
                :key="allergen"
                class="border border-outline-variant rounded-full px-2 py-0.5"
              >
                {{ allergen }}
              </span>
            </div>

            <button
              type="button"
              class="mt-auto bg-primary text-on-primary text-xs font-semibold uppercase tracking-wide py-2.5 rounded-lg transition disabled:bg-outline-variant disabled:cursor-not-allowed hover:enabled:opacity-90"
              :disabled="!dish.available"
            >
              Añadir al carrito
            </button>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>