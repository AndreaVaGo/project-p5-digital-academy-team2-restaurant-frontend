<script setup>
import { ref } from "vue";

const selectedMethod = ref("card");

const emit = defineEmits(["update-method"]);

const selectMethod = (method) => {
  selectedMethod.value = method;
  emit("update-method", method);
};
</script>

<template>
  <section
    class="rounded-3xl bg-[var(--color-surface-container-low)] p-5 sm:p-6"
  >
    <h2
      class="font-headline text-2xl font-semibold text-[var(--color-on-surface)] sm:text-3xl"
    >
      Método de pago
    </h2>

    <p
      class="mt-2 font-body text-sm leading-6 text-[var(--color-on-surface-variant)]"
    >
      Selecciona cómo quieres realizar el pago.
    </p>

    <div class="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
      <button
        type="button"
        class="rounded-2xl border px-4 py-4 text-left transition-colors"
        :class="
          selectedMethod === 'card'
            ? 'border-[var(--color-primary)] bg-[var(--color-secondary-container)]'
            : 'border-[var(--color-outline-variant)] bg-[var(--color-surface)]'
        "
        @click="selectMethod('card')"
      >
        <span
          class="block font-ui text-sm font-semibold text-[var(--color-on-surface)]"
        >
          Tarjeta
        </span>

        <span
          class="mt-1 block font-body text-xs text-[var(--color-on-surface-variant)]"
        >
          Pago con tarjeta
        </span>
      </button>

      <button
        type="button"
        class="rounded-2xl border px-4 py-4 text-left transition-colors"
        :class="
          selectedMethod === 'cash'
            ? 'border-[var(--color-primary)] bg-[var(--color-secondary-container)]'
            : 'border-[var(--color-outline-variant)] bg-[var(--color-surface)]'
        "
        @click="selectMethod('cash')"
      >
        <span
          class="block font-ui text-sm font-semibold text-[var(--color-on-surface)]"
        >
          Efectivo
        </span>

        <span
          class="mt-1 block font-body text-xs text-[var(--color-on-surface-variant)]"
        >
          Pago en el restaurante
        </span>
      </button>
    </div>
  </section>
</template>

<style scoped>
</style>