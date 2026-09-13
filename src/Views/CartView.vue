<script setup>
import { onMounted } from "vue";
import CartItem from "../components/cart/CartItem.vue";
import CartSummary from "../components/cart/CartSummary.vue";
import CartEmpty from "../components/cart/CartEmpty.vue";
import { useCart } from "../composables/useCart";

import cachopoImage from "../assets/images/menu/cachopo-tradicional.png";
import tablaQuesosImage from "../assets/images/eventos/chosco-evento.png"; //imagenes luego se cambian con la Api externa

const {
  cartItems,
  subtotal,
  tax,
  total,
  addItem,
  removeItem,
  increaseQuantity,
  decreaseQuantity,
} = useCart();

// Productos temporales para probar el carrito
const demoProducts = [
  {
    id: 1,
    name: "Cachopo Tradicional",
    description: "Con jamón ibérico y queso cabrales.",
    price: 24,
    image: cachopoImage,
  },
  {
    id: 2,
    name: "Tabla de quesos asturianos",
    description: "Selección de quesos asturianos.",
    price: 18,
    image: tablaQuesosImage,
  },
];

// Añade productos de prueba mientras no tengamos la API
onMounted(() => {
  if (cartItems.value.length === 0) {
    addItem(demoProducts[0]);
    addItem(demoProducts[1]);
  }
});
</script>

<template>
  <main
    class="min-h-screen bg-[var(--color-surface)] px-4 py-10 sm:px-6 lg:px-8"
  >
    <section class="mx-auto w-full max-w-7xl">
      <!-- Cabecera -->
      <header class="mb-8">
        <h1
          class="font-headline text-4xl font-semibold text-[var(--color-on-surface)] sm:text-5xl"
        >
          Tu Pedido
        </h1>

        <p
          class="mt-2 max-w-xl font-body text-sm leading-6 text-[var(--color-on-surface-variant)] sm:text-base"
        >
          Revisa los platos seleccionados antes de confirmar.
        </p>
      </header>

      <!-- Contenido -->
      <div
        class="grid grid-cols-1 gap-8 md:grid-cols-[minmax(0,1fr)_360px] lg:gap-10"
      >
        <!-- Productos -->
        <section class="min-w-0">
          <div v-if="cartItems.length > 0" class="space-y-6">
            <CartItem
              v-for="item in cartItems"
              :key="item.product.id"
              :item="item"
              @increase="increaseQuantity"
              @decrease="decreaseQuantity"
              @remove="removeItem"
            />
          </div>

          <CartEmpty v-else />
        </section>

        <!-- Resumen -->
        <CartSummary :subtotal="subtotal" :tax="tax" :total="total" />
      </div>
    </section>
  </main>
</template>

<style scoped></style>
