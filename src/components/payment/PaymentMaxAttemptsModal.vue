<script setup>
import BaseModal from "../BaseModal.vue";

const emit = defineEmits(["change-method", "cancel", "close"]);
</script>

<template>
  <BaseModal
    :open="true"
    @close="emit('close')"
  >
    <div class="text-center">
      <h2
        class="font-headline text-3xl font-semibold text-[var(--color-on-surface)]"
      >
        Máximo de intentos alcanzado
      </h2>

      <p
        class="mt-3 font-body text-sm leading-6 text-[var(--color-on-surface-variant)]"
      >
        Has alcanzado el número máximo de intentos para realizar el pago.
      </p>

      <div class="mt-6 flex flex-col gap-3">
        <button
          type="button"
          class="w-full rounded-full bg-[var(--color-primary)] px-6 py-3 font-ui text-sm font-semibold text-[var(--color-on-primary)]"
          @click="emit('change-method')"
        >
          Cambiar método de pago
        </button>

        <button
          type="button"
          class="w-full rounded-full border border-[var(--color-outline-variant)] px-6 py-3 font-ui text-sm font-semibold text-[var(--color-on-surface)]"
          @click="emit('cancel')"
        >
          Cancelar pedido
        </button>
      </div>
    </div>
  </BaseModal>
</template>

<style scoped>
</style>