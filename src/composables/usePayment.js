import { ref } from "vue";

export function usePayment() {
  const paymentStatus = ref("idle");

  const startPayment = () => {
    paymentStatus.value = "processing";
  };

  const confirmPayment = () => {
    paymentStatus.value = "confirmed";
  };

  const failPayment = () => {
    paymentStatus.value = "failed";
  };

  const resetPayment = () => {
    paymentStatus.value = "idle";
  };

  return {
    paymentStatus,
    startPayment,
    confirmPayment,
    failPayment,
    resetPayment,
  };
}