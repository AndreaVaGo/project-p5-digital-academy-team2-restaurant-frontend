<script setup>
import { ref, onMounted } from 'vue'
import { useOffers } from '@/composables/useOffers'
import { useAuth } from '@/composables/useAuth'

/*
 * Las ofertas vienen del back (GET /api/offers) a través de useOffers.
 * La principal es la marcada como featured; las de temporada, el resto.
 */
const { featuredOffer, seasonalOffers, cargando, errorCarga, cargarOfertas } = useOffers()

/*
 * Sesión del usuario, con el useAuth del equipo:
 * - loadUser lee el token guardado y pregunta al back quién es el usuario.
 * - isAuthenticated es true si hay un usuario con sesión iniciada.
 */
const { isAuthenticated, loadUser } = useAuth()

/*
 * Mientras se comprueba la sesión no se muestra nada,
 * para que no aparezca un momento el aviso de "inicia sesión" a quien ya la tiene.
 */
const comprobandoSesion = ref(true)

onMounted(async () => {
  try {
    await loadUser()
  } catch (error) {
    /* Token caducado o fallo de conexión: se trata igual que no tener sesión */
    console.warn('No se pudo comprobar la sesión:', error)
  } finally {
    comprobandoSesion.value = false
  }

  /* Las ofertas solo se piden al back si hay sesión iniciada */
  if (isAuthenticated.value) {
    cargarOfertas()
  }
})
</script>

<template>
  <main class="min-h-screen py-16 px-6 lg:px-16" style="background-color: var(--color-inverse-surface)">
    <div class="max-w-6xl mx-auto">
      <h1
        class="text-on-primary text-4xl md:text-5xl leading-tight m-0"
        style="font-family: 'Cormorant Garamond', serif"
      >
        Privilegios Exclusivos
      </h1>
      <p class="text-on-primary text-base mt-3 max-w-2xl" style="font-family: 'Manrope', sans-serif">
        Una selección especial de experiencias gastronómicas para nuestros clientes más
        valiosos. Disfrute las ventajas de formar parte de la comunidad GoXu, donde la cocina
        tradicional asturiana se transforma en alta gastronomía.
      </p>

      <!-- Mientras se comprueba si hay sesión -->
      <p v-if="comprobandoSesion" class="text-on-primary text-sm mt-12">Comprobando tu sesión…</p>

      <!-- Sin sesión: invitación a iniciar sesión o registrarse, en lugar de las ofertas -->
      <section
        v-else-if="!isAuthenticated"
        class="mt-12 max-w-xl bg-surface-container-lowest rounded-2xl shadow-lg p-8"
      >
        <p class="text-highlight text-xs font-semibold uppercase tracking-wide m-0">
          Solo para clientes registrados
        </p>
        <h2
          class="text-on-surface text-2xl md:text-3xl mt-2"
          style="font-family: 'Cormorant Garamond', serif"
        >
          Accede a tus privilegios exclusivos
        </h2>
        <p class="text-on-surface-variant text-sm mt-3">
          Inicia sesión o crea tu cuenta de cliente para descubrir nuestras ofertas y
          experiencias exclusivas.
        </p>
        <div class="flex flex-wrap gap-4 mt-6">
          <RouterLink
            :to="{ name: 'login' }"
            class="bg-primary text-on-primary text-xs font-semibold uppercase tracking-wide px-6 py-3 rounded-lg transition hover:opacity-90"
          >
            Iniciar sesión
          </RouterLink>
          <RouterLink
            :to="{ name: 'register' }"
            class="border border-primary text-primary text-xs font-semibold uppercase tracking-wide px-6 py-3 rounded-lg transition hover:opacity-90"
          >
            Crear cuenta
          </RouterLink>
        </div>
      </section>

      <!-- Con sesión: las ofertas, igual que antes -->
      <template v-else>
        <!-- Mientras llega la respuesta del back -->
        <p v-if="cargando" class="text-on-primary text-sm mt-12">Cargando ofertas…</p>

        <!-- Si el back no responde o devuelve un error -->
        <p v-else-if="errorCarga" class="text-on-primary text-sm mt-12">
          No se han podido cargar las ofertas. Inténtalo de nuevo más tarde.
        </p>

        <template v-else>
          <!-- Oferta principal (featured) -->
          <div v-if="featuredOffer" class="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12 items-center">
            <img
              :src="featuredOffer.image"
              :alt="featuredOffer.title"
              class="w-full h-80 object-cover rounded-2xl"
            />
            <div>
              <p class="text-highlight text-xs font-semibold uppercase tracking-wide">
                {{ featuredOffer.badge }}
              </p>
              <h2
                class="text-on-primary text-2xl md:text-3xl mt-2"
                style="font-family: 'Cormorant Garamond', serif"
              >
                {{ featuredOffer.title }}
              </h2>
              <p class="text-on-primary text-sm mt-3">{{ featuredOffer.description }}</p>
              <div class="flex items-center gap-4 mt-6">
                <span v-if="featuredOffer.price" class="text-on-primary text-lg font-semibold">
                  {{ featuredOffer.price }}
                </span>
                <RouterLink
                  to="/reservation"
                  class="bg-primary text-on-primary text-xs font-semibold uppercase tracking-wide px-6 py-3 rounded-lg transition hover:opacity-90"
                >
                  {{ featuredOffer.cta }}
                </RouterLink>
              </div>
            </div>
          </div>

          <h2
            class="text-on-primary text-2xl md:text-3xl mt-16 mb-6"
            style="font-family: 'Cormorant Garamond', serif"
          >
            Selección de Temporada
          </h2>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <article
              v-for="offer in seasonalOffers"
              :key="offer.id"
              class="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-lg flex flex-col"
            >
              <div class="relative">
                <img :src="offer.image" :alt="offer.title" class="w-full h-40 object-cover" />
                <span
                  v-if="offer.badge"
                  class="absolute top-3 left-3 bg-highlight/20 text-highlight text-xs font-semibold px-3 py-1 rounded-full"
                >
                  {{ offer.badge }}
                </span>
              </div>
              <div class="p-5 flex flex-col gap-3 flex-1">
                <h3 class="text-lg font-semibold m-0 text-on-surface" style="font-family: 'Manrope', sans-serif">
                  {{ offer.title }}
                </h3>
                <p class="text-on-surface-variant text-sm m-0">{{ offer.description }}</p>
                <RouterLink
                  to="/reservation"
                  class="mt-auto bg-primary text-on-primary text-xs font-semibold uppercase tracking-wide py-2.5 rounded-lg transition hover:opacity-90 text-center"
                >
                  {{ offer.cta }}
                </RouterLink>
              </div>
            </article>
          </div>
        </template>
      </template>
    </div>
  </main>
</template>