<script setup>
</script>

<template>
  <article
    class="flex gap-4 border-b border-[var(--color-outline-variant)] pb-6 last:border-b-0 last:pb-0"
  >
    <div
      class="h-24 w-24 shrink-0 overflow-hidden rounded-2xl bg-[var(--color-surface-container)]"
    >
      <img
        src="../../assets/images/menu/cachopo-tradicional.png"
        alt="Producto"
        class="h-full w-full object-cover"
      />
    </div>

    <div class="min-w-0 flex-1">
      <div class="flex items-start justify-between gap-3">
        <div>
          <h3
            class="font-headline text-2xl font-semibold text-[var(--color-on-surface)]"
          >
            Cachopo Tradicional
          </h3>

          <p
            class="mt-1 font-body text-sm leading-5 text-[var(--color-on-surface-variant)]"
          >
            Con jamón ibérico y queso cabrales.
          </p>
        </div>

        <button
          type="button"
          aria-label="Eliminar producto"
          class="shrink-0 font-ui text-lg text-[var(--color-outline)] transition-colors hover:text-[var(--color-error)]"
        >
          ×
        </button>
      </div>

      <div class="mt-4 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
        <span
          class="font-ui text-sm font-semibold text-[var(--color-on-surface)]"
        >
          €24.00
        </span>

        <div
          class="flex items-center gap-3 rounded-full border border-[var(--color-outline-variant)] px-2 py-1"
        >
          <button
            type="button"
            aria-label="Reducir cantidad"
            class="flex h-8 w-8 items-center justify-center rounded-full font-ui text-lg text-[var(--color-on-surface)]"
          >
            −
          </button>

          <span
            class="min-w-5 text-center font-ui text-sm font-semibold text-[var(--color-on-surface)]"
          >
            1
          </span>

          <button
            type="button"
            aria-label="Aumentar cantidad"
            class="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--color-primary)] font-ui text-lg text-[var(--color-on-primary)]"
          >
            +
          </button>
        </div>
      </div>
    </div>
  </article>
</template>

<style scoped>
</style>