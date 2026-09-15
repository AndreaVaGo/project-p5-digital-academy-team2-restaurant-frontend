<script setup>
import { ref } from "vue";
import PaymentMethodSelector from "../components/payment/PaymentMethodSelector.vue";
import PaymentCard from "../components/payment/PaymentCard.vue";
import PaymentSummary from "../components/payment/PaymentSummary.vue";
import PaymentAction from "../components/payment/PaymentAction.vue";
import { usePayment } from "../composables/usePayment";

const paymentMethod = ref("card");

const subtotal = ref(42); // estos datos se cambiarán con la logica de useCart.js
const tax = ref(4.2);
const total = ref(46.2);

const { paymentStatus, startPayment } = usePayment();

const updatePaymentMethod = (method) => {
  paymentMethod.value = method;
};
const handlePayment = () => {
  startPayment();
};
</script>

<template>
  <main
    class="min-h-screen bg-[var(--color-surface)] px-4 py-10 sm:px-6 lg:px-8"
  >
    <section class="mx-auto w-full max-w-7xl">
      <header class="mb-8">
        <h1
          class="font-headline text-4xl font-semibold text-[var(--color-on-surface)] sm:text-5xl"
        >
          Pago
        </h1>

        <p
          class="mt-2 max-w-xl font-body text-sm leading-6 text-[var(--color-on-surface-variant)] sm:text-base"
        >
          Completa tu pedido de forma segura.
        </p>
      </header>

      <div
        class="grid grid-cols-1 gap-8 md:grid-cols-[minmax(0,1fr)_360px] lg:gap-10"
      >
        <section>
          <PaymentMethodSelector @update-method="updatePaymentMethod" />
          <PaymentCard v-if="paymentMethod === 'card'" />
          <PaymentAction @submit-payment="handlePayment" />

          
        <div
          v-if="paymentStatus === 'processing'"
          class="mt-4 rounded-2xl bg-[var(--color-surface-container)] px-4 py-3 text-center"
        >
          <p
            class="font-ui text-sm font-semibold text-[var(--color-on-surface)]"
          >
            Procesando el pago...
          </p>
        </div>

        
        </section>


        <aside>
          <PaymentSummary :subtotal="subtotal" :tax="tax" :total="total" />
        </aside>
      </div>
    </section>
  </main>
</template>

<style scoped></style>
