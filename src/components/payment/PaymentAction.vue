<script setup>
const emit = defineEmits(["submit-payment"]);

const submitPayment = () => {
  emit("submit-payment");
};
</script>

<template>
  <section class="mt-6">
    <button
      type="button"
      class="w-full rounded-full bg-[var(--color-primary)] px-6 py-4 font-ui text-sm font-semibold text-[var(--color-on-primary)] transition-colors hover:bg-[var(--color-primary-container)]"
      @click="submitPayment"
    >
      Confirmar y pagar
    </button>
  </section>
</template>

<style scoped>
</style>