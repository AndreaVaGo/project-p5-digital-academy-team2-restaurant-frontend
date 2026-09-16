<script setup>
import BaseModal from "../BaseModal.vue";

defineProps({
  open: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["confirm", "continue", "close"]);
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
        ¿Quieres cancelar el pedido?
      </h2>

      <p
        class="mt-3 font-body text-sm leading-6 text-[var(--color-on-surface-variant)]"
      >
        Si cancelas ahora, perderás el progreso del pago.
      </p>

      <div class="mt-6 flex flex-col gap-3">
        <button
          type="button"
          class="w-full rounded-full bg-[var(--color-primary)] px-6 py-3 font-ui text-sm font-semibold text-[var(--color-on-primary)]"
          @click="emit('confirm')"
        >
          Cancelar pedido
        </button>

        <button
          type="button"
          class="w-full rounded-full border border-[var(--color-outline-variant)] px-6 py-3 font-ui text-sm font-semibold text-[var(--color-on-surface)]"
          @click="emit('continue')"
        >
          Seguir con el pago
        </button>
      </div>
    </div>
  </BaseModal>
</template>

<style scoped>
</style>