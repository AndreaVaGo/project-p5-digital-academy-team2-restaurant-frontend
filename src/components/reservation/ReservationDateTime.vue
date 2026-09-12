<script setup>
</script>

<template>
  <section class="bg-[var(--color-surface)] px-6 py-8">
    <div class="mx-auto max-w-2xl">
      <h2
        class="font-headline text-3xl font-semibold text-[var(--color-on-surface)]"
      >
        Fecha y hora
      </h2>

      <div class="mt-6">
        <p
          class="font-ui text-sm font-semibold uppercase tracking-[0.12em] text-[var(--color-on-surface-variant)]"
        >
          Fecha
        </p>

        <div class="mt-3 grid grid-cols-3 gap-3">
          <button
            type="button"
            class="rounded-xl border border-[var(--color-outline-variant)] bg-[var(--color-surface-container-lowest)] px-3 py-4 text-center"
          >
            <span class="block font-ui text-xs uppercase">
              Hoy
            </span>

            <span
              class="mt-1 block font-headline text-2xl font-semibold"
            >
              15
            </span>
          </button>

          <button
            type="button"
            class="rounded-xl border border-[var(--color-outline-variant)] bg-[var(--color-surface-container-lowest)] px-3 py-4 text-center"
          >
            <span class="block font-ui text-xs uppercase">
              Mañana
            </span>

            <span
              class="mt-1 block font-headline text-2xl font-semibold"
            >
              16
            </span>
          </button>

          <button
            type="button"
            class="rounded-xl border border-[var(--color-outline-variant)] bg-[var(--color-surface-container-lowest)] px-3 py-4 text-center"
          >
            <span class="block font-ui text-xs uppercase">
              Elegir
            </span>

            <span
              class="mt-1 block font-headline text-2xl font-semibold"
            >
              📅
            </span>
          </button>
        </div>
      </div>

      <div class="mt-8">
        <p
          class="font-ui text-sm font-semibold uppercase tracking-[0.12em] text-[var(--color-on-surface-variant)]"
        >
          Hora
        </p>

        <div class="mt-3 grid grid-cols-3 gap-3">
          <button
            type="button"
            class="rounded-xl border border-[var(--color-outline-variant)] bg-[var(--color-surface-container-lowest)] px-3 py-3 font-ui text-sm"
          >
            13:30
          </button>

          <button
            type="button"
            class="rounded-xl border border-[var(--color-outline-variant)] bg-[var(--color-surface-container-lowest)] px-3 py-3 font-ui text-sm"
          >
            14:00
          </button>

          <button
            type="button"
            class="rounded-xl border border-[var(--color-outline-variant)] bg-[var(--color-surface-container-lowest)] px-3 py-3 font-ui text-sm"
          >
            14:30
          </button>

          <button
            type="button"
            class="rounded-xl border border-[var(--color-outline-variant)] bg-[var(--color-surface-container-lowest)] px-3 py-3 font-ui text-sm"
          >
            20:30
          </button>

          <button
            type="button"
            class="rounded-xl border border-[var(--color-outline-variant)] bg-[var(--color-surface-container-lowest)] px-3 py-3 font-ui text-sm"
          >
            21:00
          </button>

          <button
            type="button"
            class="rounded-xl border border-[var(--color-outline-variant)] bg-[var(--color-surface-container-lowest)] px-3 py-3 font-ui text-sm"
          >
            21:30
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
</style>