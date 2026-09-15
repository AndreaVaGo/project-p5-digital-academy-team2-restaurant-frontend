<script setup>
/* NOTE: colors here use generic Tailwind palette (green-600, pink-400, stone-*).
 * The project's official color tokens are already defined in style.css
 * (--color-primary, --color-highlight, --color-surface, etc., Material Design 3 style).
 * Pending: map these classes to the official tokens once confirmed with Iker.
 */

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
          class="text-white text-3xl md:text-4xl lg:text-5xl leading-tight m-0"
          style="font-family: 'Cormorant Garamond', serif"
        >
          Especialidades de la casa
        </h2>
        <p class="text-stone-200 text-base mt-2" style="font-family: 'Manrope', sans-serif">
          El goxu es nuestro protagonista indiscutible.
        </p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <article
          v-for="dish in dishes"
          :key="dish.id"
          class="bg-white rounded-2xl overflow-hidden shadow-lg flex flex-col"
        >
          <div class="relative">
            <img :src="dish.image" :alt="dish.name" class="w-full h-48 object-cover" />
            <span
              v-if="dish.badge"
              class="absolute top-3 left-3 bg-white text-stone-800 text-xs font-semibold uppercase px-3 py-1 rounded-full"
            >
              {{ dish.badge }}
            </span>
            <span
              v-if="!dish.available"
              class="absolute top-3 right-3 bg-stone-800 text-white text-xs font-semibold px-3 py-1 rounded-full"
            >
              No disponible
            </span>
          </div>

          <div class="p-5 flex flex-col gap-3 flex-1">
            <div class="flex items-start justify-between gap-2">
              <h3 class="text-lg font-semibold m-0" style="font-family: 'Manrope', sans-serif">
                {{ dish.name }}
              </h3>
              <span class="text-green-700 font-semibold whitespace-nowrap">{{ dish.price }}</span>
            </div>

            <p class="text-stone-600 text-sm m-0">{{ dish.description }}</p>

            <div class="flex flex-wrap items-center gap-2 text-xs text-stone-500">
              <span class="w-2 h-2 rounded-full bg-pink-400"></span>
              <span>Alérgenos:</span>
              <span
                v-for="allergen in dish.allergens"
                :key="allergen"
                class="border border-stone-300 rounded-full px-2 py-0.5"
              >
                {{ allergen }}
              </span>
            </div>

            <button
              type="button"
              class="mt-auto bg-green-600 text-white text-xs font-semibold uppercase tracking-wide py-2.5 rounded-lg transition disabled:bg-stone-300 disabled:cursor-not-allowed hover:enabled:opacity-90"
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