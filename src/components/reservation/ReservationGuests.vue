<script setup>
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
            2
          </span>
        </div>

        <div class="flex items-center gap-3">
          <button
            type="button"
            aria-label="Reducir número de personas"
            class="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-outline-variant)] bg-[var(--color-surface-container-lowest)] font-ui text-xl text-[var(--color-on-surface)]"
          >
            −
          </button>

          <button
            type="button"
            aria-label="Aumentar número de personas"
            class="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-primary)] font-ui text-xl text-[var(--color-on-primary)]"
          >
            +
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
</style>