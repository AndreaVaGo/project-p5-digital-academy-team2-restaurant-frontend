<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";

import PaymentMethodSelector from "../../components/payment/PaymentMethodSelector.vue";
import PaymentCard from "../../components/payment/PaymentCard.vue";
import PaymentSummary from "../../components/payment/PaymentSummary.vue";
import PaymentAction from "../../components/payment/PaymentAction.vue";
import PaymentErrorModal from "../../components/payment/PaymentErrorModal.vue";
import PaymentRejectedModal from "../../components/payment/PaymentRejectedModal.vue";
import PaymentMaxAttemptsModal from "../../components/payment/PaymentMaxAttemptsModal.vue";
import PaymentCancelModal from "../../components/payment/PaymentCancelModal.vue";
import PaymentConfirmationModal from "../../components/payment/PaymentConfirmationModal.vue";

import { usePayment } from "../../composables/usePayment";
import { getOrderById, payOrder } from "../../services/orderService";

const route = useRoute();
const paymentCard = ref(null);

const paymentMethod = ref("card");
const showCancelModal = ref(false);

const order = ref(null);
const loadingOrder = ref(true);
const orderError = ref(null);
const paymentResult = ref(null);
const paymentLastFourDigits = ref("");

const subtotal = ref(0);
const tax = ref(0);
const total = ref(0);

const {
  paymentStatus,
  paymentAttempts,
  maxAttempts,
  processPayment,
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
    const paidOrder = await processPayment(() =>
      payOrder(orderId, paymentData),
    );

    paymentResult.value = paidOrder;

    paymentLastFourDigits.value = paymentData.cardNumber.slice(-4);

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

const handleTracking = () => {
  console.log("Ver seguimiento del pedido:", paymentResult.value?.id);
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

    const totalAmount = Number(orderData.total ?? 0);

    total.value = Number(totalAmount.toFixed(2));
    subtotal.value = Number((totalAmount / 1.1).toFixed(2));
    tax.value = Number((totalAmount - subtotal.value).toFixed(2));

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
        </section>

        <aside>
          <PaymentSummary :subtotal="subtotal" :tax="tax" :total="total" />
        </aside>
      </div>
    </section>
  </main>

  <PaymentErrorModal
    :open="paymentStatus === 'failed' && paymentAttempts === 1"
    @retry="handlePayment"
    @cancel="resetPayment"
  />

  <PaymentRejectedModal
    :open="paymentStatus === 'failed' && paymentAttempts > 1"
    :attempts="paymentAttempts"
    :max-attempts="maxAttempts"
    @retry="handlePayment"
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
  <PaymentConfirmationModal
    :open="paymentStatus === 'confirmed'"
    :payment-method="paymentMethod"
    :order="paymentResult || order"
    :amount="Number(paymentResult?.total ?? total)"
    :last-four-digits="paymentLastFourDigits"
    @close="resetPayment"
    @tracking="handleTracking"
  />
</template>

<style scoped></style>
