<script setup>
defineProps({
  subtotal: {
    type: Number,
    required: true,
  },
  tax: {
    type: Number,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
});
</script>

<template>
  <aside
    class="w-full rounded-3xl bg-[var(--color-surface-container-low)] p-5 sm:p-6"
  >
    <h2
      class="font-headline text-2xl font-semibold text-[var(--color-on-surface)] sm:text-3xl"
    >
      Resumen del pedido
    </h2>

    <div
      class="mt-6 space-y-3 border-b border-[var(--color-outline-variant)] pb-5"
    >
      <div class="flex items-center justify-between gap-4">
        <span
          class="font-body text-sm text-[var(--color-on-surface-variant)]"
        >
          Subtotal
        </span>

        <span
          class="font-ui text-sm font-semibold text-[var(--color-on-surface)]"
        >
          €{{ subtotal.toFixed(2) }}
        </span>
      </div>

      <div class="flex items-center justify-between gap-4">
        <span
          class="font-body text-sm text-[var(--color-on-surface-variant)]"
        >
          IVA (10%)
        </span>

        <span
          class="font-ui text-sm font-semibold text-[var(--color-on-surface)]"
        >
          €{{ tax.toFixed(2) }}
        </span>
      </div>
    </div>

    <div class="mt-5 flex items-center justify-between gap-4">
      <span
        class="font-ui text-base font-semibold text-[var(--color-on-surface)]"
      >
        Total
      </span>

      <span
        class="font-ui text-xl font-bold text-[var(--color-primary)]"
      >
        €{{ total.toFixed(2) }}
      </span>
    </div>

    <div
      class="mt-6 rounded-2xl bg-[var(--color-surface)] px-4 py-3 text-center"
    >
      <p
        class="font-ui text-xs font-semibold text-[var(--color-on-surface-variant)]"
      >
     Pago seguro y cifrado
      </p>
    </div>
  </aside>
</template>

<style scoped>
</style>