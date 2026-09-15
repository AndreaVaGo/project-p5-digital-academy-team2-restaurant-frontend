<script setup>
import { ref } from "vue";
import PaymentMethodSelector from "../components/payment/PaymentMethodSelector.vue";
import PaymentCard from "../components/payment/PaymentCard.vue";
import PaymentSummary from "../components/payment/PaymentSummary.vue";
import PaymentAction from "../components/payment/PaymentAction.vue";
import { usePayment } from "../composables/usePayment";
import BaseModal from "../components/BaseModal.vue";
import PaymentErrorModal from "../components/payment/PaymentErrorModal.vue";
import PaymentRejectedModal from "../components/payment/PaymentRejectedModal.vue";

const paymentMethod = ref("card");

// Datos temporales mientras no conectemos useCart()
const subtotal = ref(42);
const tax = ref(4.2);
const total = ref(46.2);

const {
  paymentStatus,
  paymentAttempts,
  maxAttempts,
  canRetry,
  startPayment,
  confirmPayment,
  failPayment,
  retryPayment,
  resetPayment,
  cancelPayment,
} = usePayment();

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

          <!-- Simulaciones para probar el flujo de pago -->
          <div
            v-if="paymentStatus === 'processing'"
            class="mt-4 rounded-2xl bg-[var(--color-surface-container)] px-4 py-4 text-center"
          >
            <p
              class="font-ui text-sm font-semibold text-[var(--color-on-surface)]"
            >
              Procesando el pago...
            </p>

            <div class="mt-4 flex flex-wrap justify-center gap-3">
              <button
                type="button"
                class="rounded-full border border-[var(--color-outline-variant)] px-4 py-2 font-ui text-xs font-semibold text-[var(--color-on-surface)]"
                @click="confirmPayment"
              >
                Simular pago confirmado
              </button>

              <button
                type="button"
                class="rounded-full border border-[var(--color-outline-variant)] px-4 py-2 font-ui text-xs font-semibold text-[var(--color-on-surface)]"
                @click="failPayment"
              >
                Simular pago fallido
              </button>
            </div>
          </div>

          <!-- Simulacion cuando se alcanzan los 3 intentos -->
          <div
            v-if="paymentStatus === 'max-attempts'"
            class="mt-4 rounded-2xl bg-[var(--color-surface-container)] px-4 py-4 text-center"
          >
            <p
              class="font-ui text-sm font-semibold text-[var(--color-on-surface)]"
            >
              Máximo de intentos alcanzado
            </p>

            <p
              class="mt-1 font-body text-xs text-[var(--color-on-surface-variant)]"
            >
              Has utilizado {{ paymentAttempts }} de {{ maxAttempts }} intentos.
            </p>

            <div class="mt-4 flex flex-wrap justify-center gap-3">
              <button
                type="button"
                class="rounded-full border border-[var(--color-outline-variant)] px-5 py-2 font-ui text-xs font-semibold text-[var(--color-on-surface)]"
                @click="resetPayment"
              >
                Cambiar método de pago
              </button>

              <button
                type="button"
                class="rounded-full bg-[var(--color-primary)] px-5 py-2 font-ui text-xs font-semibold text-[var(--color-on-primary)]"
                @click="cancelPayment"
              >
                Cancelar pedido
              </button>
            </div>
          </div>
        </section>

        <aside>
          <PaymentSummary :subtotal="subtotal" :tax="tax" :total="total" />
        </aside>
      </div>
    </section>
  </main>
  
  <PaymentErrorModal
    :open="paymentStatus === 'failed' && paymentAttempts === 1"
    @retry="retryPayment"
    @cancel="resetPayment"
  />

  <PaymentRejectedModal
    :open="paymentStatus === 'failed' && paymentAttempts > 1"
    :attempts="paymentAttempts"
    :max-attempts="maxAttempts"
    @retry="retryPayment"
    @change-method="resetPayment"
  />
  <!-- confirmación provisional -->
  <BaseModal :open="paymentStatus === 'confirmed'" @close="resetPayment">
    <div class="text-center">
      <h2
        class="font-headline text-3xl font-semibold text-[var(--color-on-surface)]"
      >
        ¡Pago confirmado!
      </h2>

      <p
        class="mt-3 font-body text-sm leading-6 text-[var(--color-on-surface-variant)]"
      >
        Tu pago se ha realizado correctamente.
      </p>

      <button
        type="button"
        class="mt-6 rounded-full bg-[var(--color-primary)] px-6 py-3 font-ui text-sm font-semibold text-[var(--color-on-primary)]"
        @click="resetPayment"
      >
        Continuar
      </button>
    </div>
  </BaseModal>
</template>

<style scoped></style>
