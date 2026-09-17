<script setup>
import logo from '../assets/images/branding/logo-Goxu.png'

const links = ['Carta', 'Política de privacidad', 'Aviso legal']

const developers = [
  { name: 'Desarrollador/a 1', github: '#' },
  { name: 'Desarrollador/a 2', github: '#' },
  { name: 'Desarrollador/a 3', github: '#' },
  { name: 'Desarrollador/a 4', github: '#' },
  { name: 'Desarrollador/a 5', github: '#' },
  { name: 'Desarrollador/a 6', github: '#' },
]
</script>

<template>
  <footer class="bg-inverse-surface px-5 py-16 text-inverse-on-surface md:px-16">
    <div class="mx-auto grid max-w-[1280px] grid-cols-1 gap-12 md:grid-cols-3">
      <div>
        <img :src="logo" alt="Goxu" class="mx-auto block h-48 w-auto" />
        <p class="mt-4 font-body text-body-md text-inverse-on-surface/80">
          Cocina asturiana con sabor, tradición y alma. Autenticidad gastronómica en cada plato.
        </p>
      </div>

      <div>
        <h2 class="font-ui text-label-caps font-semibold uppercase tracking-caps text-highlight">Enlaces</h2>
        <ul class="mt-4 flex flex-col gap-3 font-body text-body-md">
          <li v-for="link in links" :key="link">
            <a href="#" class="hover:underline">{{ link }}</a>
          </li>
        </ul>
      </div>

      <div>
        <h2 class="font-ui text-label-caps font-semibold uppercase tracking-caps text-highlight">Desarrollado por</h2>
        <ul class="mt-4 flex flex-col gap-3 font-body text-body-md">
          <li v-for="dev in developers" :key="dev.name">
            <a :href="dev.github" target="_blank" rel="noopener" class="flex items-center gap-2 hover:underline">
              <svg viewBox="0 0 24 24" class="h-4 w-4 fill-current" aria-hidden="true">
                <path
                  d="M12 .5C5.73.5.5 5.73.5 12c0 5.09 3.29 9.4 7.86 10.93.57.1.78-.25.78-.55v-2.02c-3.2.7-3.87-1.36-3.87-1.36-.53-1.34-1.29-1.7-1.29-1.7-1.06-.72.08-.71.08-.71 1.17.08 1.79 1.2 1.79 1.2 1.04 1.78 2.73 1.27 3.4.97.1-.75.41-1.27.74-1.56-2.55-.29-5.23-1.28-5.23-5.68 0-1.25.45-2.28 1.19-3.08-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.64 1.59.24 2.76.12 3.05.74.8 1.19 1.83 1.19 3.08 0 4.41-2.69 5.38-5.25 5.67.42.36.79 1.08.79 2.17v3.21c0 .3.21.66.79.55A11.5 11.5 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5Z"
                />
              </svg>
              {{ dev.name }}
            </a>
          </li>
        </ul>
      </div>
    </div>

    <div class="mx-auto mt-12 max-w-[1280px] border-t border-inverse-on-surface/20 pt-6">
      <p class="font-body text-sm text-inverse-on-surface/70">© 2026 Goxu. Todos los derechos reservados.</p>
    </div>
  </footer>
</template>
