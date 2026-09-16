<script setup>
import BaseModal from "../BaseModal.vue";

defineProps({
  open: {
    type: Boolean,
    default: false,
  },
  attempts: {
    type: Number,
    required: true,
  },
  maxAttempts: {
    type: Number,
    required: true,
  },
});

const emit = defineEmits(["retry", "change-method", "close"]);
</script>

<template>
  <BaseModal
    :open="open"
    @close="emit('close')"
  >
    <div class="text-center">
      <h2
        class="font-headline text-3xl font-semibold text-[var(--color-on-surface)]"
      >
        Pago rechazado
      </h2>

      <p
        class="mt-3 font-body text-sm leading-6 text-[var(--color-on-surface-variant)]"
      >
        No hemos podido completar el pago con el método seleccionado.
      </p>

      <p
        class="mt-4 font-ui text-sm font-semibold text-[var(--color-on-surface)]"
      >
        Intentos realizados: {{ attempts }} de {{ maxAttempts }}
      </p>

      <div class="mt-6 flex flex-col gap-3">
        <button
          type="button"
          class="w-full rounded-full bg-[var(--color-primary)] px-6 py-3 font-ui text-sm font-semibold text-[var(--color-on-primary)]"
          @click="emit('retry')"
        >
          Intentar de nuevo
        </button>

        <button
          type="button"
          class="w-full rounded-full border border-[var(--color-outline-variant)] px-6 py-3 font-ui text-sm font-semibold text-[var(--color-on-surface)]"
          @click="emit('change-method')"
        >
          Cambiar método de pago
        </button>
      </div>
    </div>
  </BaseModal>
</template>

<style scoped>
</style>