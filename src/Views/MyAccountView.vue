<script setup>
import {
  UserCog,
  History,
  Truck,
  ClipboardList,
  UtensilsCrossed,
  CheckCircle2,
  Bike,
  Home,
  BookOpenCheck,
} from "lucide-vue-next";

const trackerSteps = [
  { key: "recibido", label: "Recibido", icon: ClipboardList, done: true },
  { key: "cocina", label: "Cocina", icon: UtensilsCrossed, done: true },
  { key: "listo", label: "Listo", icon: CheckCircle2, done: true },
  { key: "camino", label: "En camino", icon: Bike, done: false, active: true },
  { key: "entregado", label: "Entregado", icon: Home, done: false },
];

function verSeguimiento() {
  console.log("Ir a ver seguimiento del pedido actual");
}
</script>

<template>
  <div
    class="text-left bg-outline-variant/50 px-4 py-6 sm:px-6 md:px-8"
    style="background-color: rgba(189, 203, 178, 0.5)"
  >
    <h1 class="font-headline text-2xl sm:text-3xl font-semibold text-primary">
      MI CUENTA
    </h1>

    <!-- Accesos rápidos -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-4">
      <article
        class="bg-surface-container-lowest rounded-xl p-4 flex flex-col"
        style="
          background-color: var(--color-surface-container-lowest);
          border-radius: 1rem;
        "
      >
        <div
          class="bg-secondary-container text-secondary rounded-lg w-9 h-9 flex items-center justify-center mb-2"
        >
          <UserCog class="w-5 h-5" />
        </div>
        <h3 class="font-headline text-lg text-on-surface mb-1">
          Editar Perfil
        </h3>
        <p class="font-body text-sm text-outline flex-1">
          Actualiza tu información personal, contraseña y preferencias de
          comunicación.
        </p>
        <RouterLink
          to="/account/profile"
          class="font-ui font-semibold text-sm text-primary mt-2"
          >Gestionar →</RouterLink
        >
      </article>

      <article
        class="bg-surface-container-lowest rounded-xl p-4 flex flex-col"
        style="
          background-color: var(--color-surface-container-lowest);
          border-radius: 1rem;
        "
      >
        <div
          class="bg-secondary-container text-secondary rounded-lg w-9 h-9 flex items-center justify-center mb-2"
        >
          <History class="w-5 h-5" />
        </div>
        <h3 class="font-headline text-lg text-on-surface mb-1">
          Historial de Pedidos
        </h3>
        <p class="font-body text-sm text-outline flex-1">
          Revisa tus pedidos anteriores, repite tus favoritos y descarga
          facturas.
        </p>
        <RouterLink
          to="/pedidos"
          class="font-ui font-semibold text-sm text-primary mt-2"
          >Ver historial →</RouterLink
        >
      </article>

      <article
        class="bg-surface-container-lowest rounded-xl p-4 flex flex-col sm:col-span-2 lg:col-span-1"
        style="
          background-color: var(--color-surface-container-lowest);
          border-radius: 1rem;
        "
      >
        <div
          class="bg-secondary-container text-secondary rounded-lg w-9 h-9 flex items-center justify-center mb-2"
        >
          <Truck class="w-5 h-5" />
        </div>
        <h3 class="font-headline text-lg text-on-surface mb-1">
          Rastrear Pedido
        </h3>
        <p class="font-body text-sm text-outline flex-1">
          Sigue en tiempo real el estado de tu pedido actual desde nuestra
          cocina hasta tu puerta.
        </p>
        <RouterLink
          to="/rastreo"
          class="font-ui font-semibold text-sm text-primary mt-2"
          >Rastrear →</RouterLink
        >
      </article>
    </div>

    <!-- Pedido actual + Mi perfil -->
    <div class="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-4 mt-3">
      <div
        class="bg-surface-container-lowest rounded-xl p-5"
        style="
          background-color: var(--color-surface-container-lowest);
          border-radius: 1rem;
        "
      >
        <div class="flex items-center justify-between">
          <h2 class="font-headline text-xl text-on-surface">Pedido actual</h2>
          <span
            class="bg-surface-container-low font-ui text-sm font-semibold px-3 py-1 rounded-full"
            >#042</span
          >
        </div>
        <hr class="border-outline-variant/40 my-3" />

        <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 lg:gap-10">
          <div class="flex flex-col gap-1">
            <span class="font-ui text-xs font-semibold text-outline"
              >FECHA</span
            >
            <span class="font-body text-sm text-on-surface"
              >12 Oct 2023, 14:30</span
            >
          </div>
          <div class="flex flex-col gap-1">
            <span class="font-ui text-xs font-semibold text-outline"
              >TOTAL</span
            >
            <span class="font-body text-sm text-on-surface">45.50 €</span>
          </div>
          <div class="flex flex-col gap-1">
            <span class="font-ui text-xs font-semibold text-outline"
              >ESTADO</span
            >
            <span class="font-body text-sm font-semibold text-primary"
              >En camino</span
            >
          </div>
          <div class="flex flex-col gap-1">
            <span class="font-ui text-xs font-semibold text-outline"
              >ENTREGA EST.</span
            >
            <span class="font-body text-sm text-on-surface">15:15</span>
          </div>
        </div>

        <ol class="relative flex justify-between mt-4 mb-3">
          <div
            class="absolute top-4.5 left-4.5 right-4.5 h-0.5 bg-outline-variant"
          ></div>
          <li
            v-for="step in trackerSteps"
            :key="step.key"
            class="relative z-10 flex flex-col items-center gap-1 sm:gap-2 flex-1"
          >
            <span
              class="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
              :class="
                step.done
                  ? 'bg-primary-container text-white'
                  : 'bg-surface-container-lowest border-2 border-primary text-primary'
              "
              :style="
                step.done
                  ? { backgroundColor: 'var(--color-primary-container)' }
                  : { backgroundColor: 'var(--color-surface-container-lowest)' }
              "
            >
              <component :is="step.icon" class="w-4 h-4" />
            </span>
            <span
              class="font-ui text-[10px] sm:text-xs text-center leading-tight"
              :class="
                step.active ? 'text-primary font-semibold' : 'text-outline'
              "
            >
              {{ step.label }}
            </span>
          </li>
        </ol>

        <button
          type="button"
          @click="verSeguimiento"
          class="w-full sm:w-auto bg-primary-container text-white font-ui font-semibold px-5 py-2 rounded-xl flex items-center justify-center gap-2"
        >
          <BookOpenCheck class="w-4 h-4" />
          VER SEGUIMIENTO
        </button>
      </div>

      <div
        class="bg-surface-container-lowest rounded-xl p-5"
        style="
          background-color: var(--color-surface-container-lowest);
          border-radius: 1rem;
        "
      >
        <h2 class="font-headline text-xl text-on-surface">Mi perfil</h2>
        <hr class="border-outline-variant/40 my-3" />

        <div class="flex items-center gap-3 mb-3">
          <img
            src="https://i.pravatar.cc/150?img=12"
            alt="Foto de perfil de Alejandro García"
            class="w-12 h-12 rounded-full object-cover"
          />
          <div class="flex flex-col">
            <strong class="font-headline text-base text-on-surface"
              >Alejandro García</strong
            >
            <span class="font-body text-sm text-outline">Cliente Premium</span>
          </div>
        </div>

        <div class="border-b border-outline-variant/40 py-2">
          <span class="font-ui text-xs font-semibold text-outline block mb-1"
            >EMAIL</span
          >
          <span class="font-body text-sm text-on-surface wrap-break-word"
            >alejandro.garcia@example.com</span
          >
        </div>
        <div class="border-b border-outline-variant/40 py-2">
          <span class="font-ui text-xs font-semibold text-outline block mb-1"
            >TELÉFONO</span
          >
          <span class="font-body text-sm text-on-surface">+34 600 123 456</span>
        </div>
        <div class="py-2">
          <span class="font-ui text-xs font-semibold text-outline block mb-1"
            >DIRECCIÓN DE ENTREGA PRINCIPAL</span
          >
          <span class="font-body text-sm text-on-surface"
            >Calle Uria 45, 3º B<br />33003, Oviedo, Asturias</span
          >
        </div>

        <RouterLink
          to="/account/profile"
          class="block text-center mt-4 bg-secondary-container text-secondary rounded-lg py-3 font-ui font-semibold text-xs"
          style="
            background-color: var(--color-secondary-container);
            color: var(--color-secondary);
          "
        >
          EDITAR PERFIL
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
.text-on-surface {
  color: var(--color-on-surface) !important;
}
</style>
