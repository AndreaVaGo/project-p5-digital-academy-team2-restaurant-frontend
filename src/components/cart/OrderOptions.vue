<script setup>
</script>

<template>
  <div class="space-y-5">
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
</template>

<style scoped>
</style>