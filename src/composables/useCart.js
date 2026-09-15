import { ref, computed } from "vue";

const cartItems = ref([]);

export function useCart() {
  const addItem = (product) => {
    const item = cartItems.value.find(
      (item) => item.product.id === product.id
    );

    if (item) {
      item.quantity++;
    } else {
      cartItems.value.push({
        product: product,
        quantity: 1,
      });
    }
  };

  const removeItem = (productId) => {
    cartItems.value = cartItems.value.filter(
      (item) => item.product.id !== productId
    );
  };

  const increaseQuantity = (productId) => {
    const item = cartItems.value.find(
      (item) => item.product.id === productId
    );

    if (item) {
      item.quantity++;
    }
  };

  const decreaseQuantity = (productId) => {
    const item = cartItems.value.find(
      (item) => item.product.id === productId
    );

    if (!item) return;

    if (item.quantity > 1) {
      item.quantity--;
    } else {
      removeItem(productId);
    }
  };

  const subtotal = computed(() => {
    return cartItems.value.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  });

  const tax = computed(() => {
    return subtotal.value * 0.1;
  });

  const total = computed(() => {
    return subtotal.value + tax.value;
  });

  return {
    cartItems,
    subtotal,
    tax,
    total,
    addItem,
    removeItem,
    increaseQuantity,
    decreaseQuantity,
  };
}