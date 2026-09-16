<script setup>

const eventsByMonth = [
  {
    month: 'Marzo',
    events: [
      {
        id: 1,
        image: '/events-img/events-pairing.jpeg',
        date: '28 MARZO · 20:30H',
        title: 'Cena Maridaje: Sidras de Espalme & Cortes Nobles',
        meta: ['18 plazas exclusivas', '75 € / persona'],
      },
    ],
  },
  {
    month: 'Abril',
    events: [
      {
        id: 2,
        image: '/events-img/events-asturian-cured-pork-sausage.jpeg',
        date: '2 ABRIL · 14:00H',
        title: 'Jornadas Gastronómicas del Chosco y la Carrillera',
        meta: ['Menú degustación 5 pases', '48 € / persona'],
      },
      {
        id: 3,
        image: '/events-img/events-panel-discussion.jpeg',
        date: '24 ABRIL · 19:00H',
        title: 'Mesa Redonda: De la Dehesa al plato',
        meta: ['Coloquio & Cóctel de cierre', 'Entrada gratuita'],
      },
    ],
  },
  {
    month: 'Junio',
    events: [
      {
        id: 4,
        image: '/events-img/events-pairing.jpeg',
        date: '15 JUNIO · 21:00H',
        title: 'Noche de Sidra Bajo las Estrellas',
        meta: ['Terraza exterior', '55 € / persona'],
      },
    ],
  },
  {
    month: 'Septiembre',
    events: [
      {
        id: 5,
        image: '/events-img/events-asturian-cured-pork-sausage.jpeg',
        date: '20 SEPTIEMBRE · 20:00H',
        title: 'Vendimia y Sidra: Fiesta de la Cosecha',
        meta: ['Aforo limitado', '60 € / persona'],
      },
    ],
  },
]
</script>

<template>
  <main class="min-h-screen py-16 px-6 lg:px-16" style="background-color: var(--color-inverse-surface)">
    <div class="max-w-4xl mx-auto">
      <p class="text-highlight text-xs font-semibold uppercase tracking-wide">
        Experiencias gastronómicas
      </p>
      <h1
        class="text-on-primary text-4xl md:text-5xl leading-tight m-0"
        style="font-family: 'Cormorant Garamond', serif"
      >
        Calendario anual de eventos
      </h1>
      <p class="text-on-primary text-base mt-3 max-w-2xl" style="font-family: 'Manrope', sans-serif">
        Todas nuestras cenas maridaje, jornadas gastronómicas y experiencias exclusivas a lo largo del año.
      </p>

      <div v-for="group in eventsByMonth" :key="group.month" class="mt-12">
        <h2
          class="text-on-primary text-xl md:text-2xl mb-4 pb-2 border-b border-outline-variant/30"
          style="font-family: 'Cormorant Garamond', serif"
        >
          {{ group.month }}
        </h2>

        <div class="flex flex-col divide-y divide-outline-variant/20">
          <div
            v-for="event in group.events"
            :key="event.id"
            class="flex items-center gap-4 py-4"
          >
            <img
              :src="event.image"
              :alt="event.title"
              class="w-16 h-16 rounded-lg object-cover shrink-0"
            />

            <div class="flex-1 min-w-0">
              <p class="text-highlight text-xs font-semibold uppercase tracking-wide m-0">
                {{ event.date }}
              </p>
              <h3
                class="text-on-primary text-base md:text-lg font-semibold m-0 truncate"
                style="font-family: 'Manrope', sans-serif"
              >
                {{ event.title }}
              </h3>
              <p class="text-on-primary/70 text-xs mt-1">
                {{ event.meta.join(' · ') }}
              </p>
            </div>

            <RouterLink
              :to="`/ofertas-eventos`"
              class="mt-auto bg-primary text-on-primary text-xs font-semibold uppercase tracking-wide py-2.5 rounded-lg transition hover:opacity-90 text-center"
            >
              Ver disponibilidad
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>