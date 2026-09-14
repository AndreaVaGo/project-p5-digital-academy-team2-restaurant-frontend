<script setup>
import { useReservation } from "../../composables/useReservation";

const {
  guests,
  increaseGuests,
  decreaseGuests,
} = useReservation();
</script>

<template>
  <section class="bg-[var(--color-surface)] px-6 py-8">
    <div class="mx-auto max-w-2xl">
      <h2
        class="font-headline text-3xl font-semibold text-[var(--color-on-surface)]"
      >
        ¿Cuántos sois?
      </h2>

      <p
        class="mt-2 font-body text-sm text-[var(--color-on-surface-variant)]"
      >
        Indica el número de personas para tu reserva.
      </p>

      <div
        class="mt-6 flex items-center justify-between rounded-2xl bg-[var(--color-surface-container-low)] px-5 py-4"
      >
        <div>
          <span
            class="block font-ui text-xs font-semibold uppercase tracking-[0.12em] text-[var(--color-on-surface-variant)]"
          >
            Personas
          </span>

          <span
            class="mt-1 block font-headline text-3xl font-semibold text-[var(--color-on-surface)]"
          >
            {{ guests }}
          </span>
        </div>

        <div class="flex items-center gap-3">
          <button
            type="button"
            aria-label="Reducir número de personas"
            :disabled="guests === 1"
            class="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-outline-variant)] bg-[var(--color-surface-container-lowest)] font-ui text-xl text-[var(--color-on-surface)] transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
            @click="decreaseGuests"
          >
            −
          </button>

          <button
            type="button"
            aria-label="Aumentar número de personas"
            :disabled="guests === 12"
            class="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-primary)] font-ui text-xl text-[var(--color-on-primary)] transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
            @click="increaseGuests"
          >
            +
          </button>
        </div>
      </div>

      <p
        v-if="guests === 12"
        class="mt-4 rounded-xl bg-[var(--color-tertiary-container)] px-4 py-3 font-body text-sm text-[var(--color-on-tertiary-container)]"
      >
        Para reservas de más de 12 personas, contacta directamente con el
        establecimiento.
      </p>
    </div>
  </section>
</template>

<style scoped>
</style>