<script setup>
import CartItem from "../components/cart/CartItem.vue";
import CartSummary from "../components/cart/CartSummary.vue";
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
          <div class="space-y-6">
            <CartItem />
            <CartItem />
          </div>
        </section>

        <!-- Resumen -->
        <CartSummary />

      </div>
    </section>
  </main>
</template>

<style scoped>
</style>