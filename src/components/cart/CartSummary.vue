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
      Opciones de pedido
    </h2>

    <div class="mt-6 space-y-5">

      <!-- Tipo de pedido -->
      <div>
        <p
          class="font-ui text-sm font-semibold text-[var(--color-on-surface)]"
        >
          Tipo de pedido
        </p>

        <div class="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
          <button
            type="button"
            class="rounded-full bg-[var(--color-primary)] px-4 py-3 font-ui text-sm font-semibold text-[var(--color-on-primary)]"
          >
            En restaurante
          </button>

          <button
            type="button"
            class="rounded-full border border-[var(--color-outline-variant)] px-4 py-3 font-ui text-sm font-semibold text-[var(--color-on-surface)]"
          >
            A domicilio
          </button>
        </div>
      </div>

      <!-- Programar pedido -->
      <div>
        <label
          for="scheduled-order"
          class="font-ui text-sm font-semibold text-[var(--color-on-surface)]"
        >
          Programar el pedido
        </label>

        <input
          id="scheduled-order"
          type="text"
          placeholder="Ej: En media hora"
          class="mt-3 w-full rounded-2xl border border-[var(--color-outline-variant)] bg-[var(--color-surface)] px-4 py-3 font-body text-sm text-[var(--color-on-surface)] outline-none placeholder:text-[var(--color-outline)] focus:border-[var(--color-primary)]"
        />
      </div>
    </div>

    <div
      class="my-6 border-t border-[var(--color-outline-variant)]"
    ></div>

    <!-- Resumen -->
    <div class="space-y-3">

      <div class="flex items-center justify-between gap-4">
        <span
          class="font-body text-sm text-[var(--color-on-surface-variant)]"
        >
          Subtotal
        </span>

        <span
          class="shrink-0 font-ui text-sm font-semibold text-[var(--color-on-surface)]"
        >
       {{ subtotal.toFixed(2) }}
        </span>
      </div>

      <div class="flex items-center justify-between gap-4">
        <span
          class="font-body text-sm text-[var(--color-on-surface-variant)]"
        >
          Impuestos (IVA 10%)
        </span>

        <span
          class="shrink-0 font-ui text-sm font-semibold text-[var(--color-on-surface)]"
        >
      €{{ tax.toFixed(2) }}
        </span>
      </div>

      <div class="flex items-center justify-between gap-4 pt-2">
        <span
          class="font-ui text-lg font-semibold text-[var(--color-on-surface)]"
        >
          Total
        </span>

        <span
          class="shrink-0 font-ui text-xl font-semibold text-[var(--color-primary)]"
        >
        €{{ total.toFixed(2) }}
        </span>
      </div>

    </div>

    <!-- Continuar -->
    <button
      type="button"
      class="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-[var(--color-primary)] px-5 py-4 font-ui text-sm font-semibold text-[var(--color-on-primary)] transition-transform hover:scale-[1.01]"
    >
      Continuar pedido
      <span aria-hidden="true">→</span>
    </button>

    <p
      class="mt-4 text-center font-ui text-xs text-[var(--color-outline)]"
    >
       Pago seguro y cifrado
    </p>
  </aside>
</template>

<style scoped>
</style>