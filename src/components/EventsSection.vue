<script setup>
/* NOTE: colors here use generic Tailwind palette (green-600, pink-400, stone-*).
 * The project's official color tokens are already defined in style.css
 * (--color-primary, --color-highlight, --color-surface, etc., Material Design 3 style).
 * Pending: map these classes to the official tokens once confirmed with Iker.
 */

defineProps({
  events: {
    type: Array,
    required: true,
  },
})
</script>

<template>
  <section class="relative px-6 py-16 lg:px-16 lg:py-24">
    <div class="absolute inset-0 bg-black/50"></div>

    <div class="relative max-w-6xl mx-auto">
      <div class="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
        <div>
          <p
            class="text-pink-400 text-xs font-semibold uppercase tracking-wide m-0"
            style="font-family: 'Inter', sans-serif"
          >
            Experiencias gastronómicas
          </p>
          <h2
            class="text-white text-3xl md:text-4xl lg:text-5xl leading-tight m-0"
            style="font-family: 'Cormorant Garamond', serif"
          >
            Próximos eventos
          </h2>
          <p class="text-stone-200 text-base mt-2" style="font-family: 'Manrope', sans-serif">
            Cenas maridaje, jornadas del goxu y experiencias exclusivas.
          </p>
        </div>

        <!-- TODO(GC-?): proposed route /eventos — pending Juan to create the actual view/route -->
        <RouterLink to="/eventos" class="text-white text-sm font-semibold no-underline whitespace-nowrap">Ver calendario anual →</RouterLink>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <article
          v-for="event in events"
          :key="event.id"
          class="bg-white rounded-2xl overflow-hidden shadow-lg flex flex-col"
        >
          <div class="relative">
            <img :src="event.image" :alt="event.title" class="w-full h-40 object-cover" />
            <span
              class="absolute top-3 left-3 bg-pink-100 text-pink-700 text-xs font-semibold px-3 py-1 rounded-full"
            >
              {{ event.date }}
            </span>
          </div>

          <div class="p-5 flex flex-col gap-3 flex-1">
            <h3 class="text-lg font-semibold m-0" style="font-family: 'Manrope', sans-serif">
              {{ event.title }}
            </h3>

            <p class="text-stone-600 text-sm m-0">{{ event.description }}</p>

            <ul class="flex flex-col gap-1 text-xs text-stone-500 list-none p-0 m-0">
              <li v-for="item in event.meta" :key="item">{{ item }}</li>
            </ul>

            <!-- TODO(GC-?): proposed route /evento/:id, same pattern as /product/:id — pending Juan to create the actual view/route -->
            <RouterLink
              :to="`/evento/${event.id}`"
              class="mt-auto bg-green-600 text-white text-xs font-semibold uppercase tracking-wide py-2.5 rounded-lg transition hover:opacity-90"
            >
              Ver disponibilidad
            </RouterLink>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>