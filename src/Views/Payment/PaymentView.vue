<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";

import PaymentMethodSelector from "../../components/payment/PaymentMethodSelector.vue";
import PaymentCard from "../../components/payment/PaymentCard.vue";
import PaymentSummary from "../../components/payment/PaymentSummary.vue";
import PaymentAction from "../../components/payment/PaymentAction.vue";
import { usePayment } from "../../composables/usePayment";
import { getOrderById,payOrder } from "../../services/orderService";
import BaseModal from "../../components/BaseModal.vue";
import PaymentErrorModal from "../../components/payment/PaymentErrorModal.vue";
import PaymentRejectedModal from "../../components/payment/PaymentRejectedModal.vue";
import PaymentMaxAttemptsModal from "../../components/payment/PaymentMaxAttemptsModal.vue";
import PaymentCancelModal from "../../components/payment/PaymentCancelModal.vue";

const route = useRoute();
const paymentCard = ref(null);
const paymentMethod = ref("card");
const showCancelModal = ref(false);

const order = ref(null);
const loadingOrder = ref(true);
const orderError = ref(null);

const subtotal = ref(0);
const tax = ref(0);
const total = ref(0);

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

const handlePayment = async () => {
  const orderId = route.query.orderId;
  const paymentData = paymentCard.value?.getPaymentData();

  if (!orderId || !paymentData) {
    return;
  }

  try {
    const paidOrder = await payOrder(orderId, paymentData);

    console.log("Pago realizado:", paidOrder);
  } catch (error) {
    console.error("No se pudo realizar el pago:", error);
  }
};

const openCancelModal = () => {
  showCancelModal.value = true;
};

const closeCancelModal = () => {
  showCancelModal.value = false;
};

const confirmCancel = () => {
  showCancelModal.value = false;
  cancelPayment();
};

const loadOrder = async () => {
  const orderId = route.query.orderId;

  if (!orderId) {
    orderError.value = "No se ha encontrado el pedido.";
    loadingOrder.value = false;
    return;
  }

  try {
    const orderData = await getOrderById(orderId);

    order.value = orderData;
    total.value = Number(orderData.total ?? 0);

    console.log("Pedido cargado:", orderData);
  } catch (error) {
    console.error("No se pudo cargar el pedido:", error);
    orderError.value = "No se ha podido cargar el pedido.";
  } finally {
    loadingOrder.value = false;
  }
};

onMounted(() => {
  loadOrder();
});
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

          <PaymentCard v-if="paymentMethod === 'card'" ref="paymentCard" />

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

  <PaymentMaxAttemptsModal
    v-if="paymentStatus === 'max-attempts'"
    @change-method="resetPayment"
    @cancel="openCancelModal"
  />

  <PaymentCancelModal
    :open="showCancelModal"
    @confirm="confirmCancel"
    @continue="closeCancelModal"
    @close="closeCancelModal"
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
