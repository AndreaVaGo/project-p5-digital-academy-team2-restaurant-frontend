import { ref, computed } from "vue";

export function useOrder(cartItems) {
  const orderType = ref("restaurant");
  const scheduledOrder = ref("");

  const orderItems = computed(() => {
    return cartItems.value.map((item) => ({
      productId: item.product.id,
      quantity: item.quantity,
    }));
  });

  const order = computed(() => {
    return {
      type: orderType.value,
      scheduledAt: scheduledOrder.value || null,
      items: orderItems.value,
    };
  });

  const updateOrderType = (type) => {
    orderType.value = type;
  };

  const updateScheduledOrder = (value) => {
    scheduledOrder.value = value;
  };

  return {
    orderType,
    scheduledOrder,
    orderItems,
    order,
    updateOrderType,
    updateScheduledOrder,
  };
}