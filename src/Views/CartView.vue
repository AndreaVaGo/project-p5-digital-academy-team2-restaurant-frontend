<script setup>
</script>

<template>
  <main class="min-h-screen bg-[var(--color-surface)]">
    <section class="px-6 py-10">
      <div class="mx-auto max-w-7xl">
        <div>
          <p
            class="font-ui text-sm font-semibold uppercase tracking-[0.12em] text-[var(--color-primary)]"
          >
            Tu pedido
          </p>

          <h1
            class="mt-2 font-headline text-4xl font-semibold text-[var(--color-on-surface)]"
          >
            Revisa los platos seleccionados antes de confirmar.
          </h1>
        </div>

        <div class="mt-10 grid gap-8 lg:grid-cols-[1fr_380px]">
          <div>
            <div class="rounded-3xl bg-[var(--color-surface-container-low)] p-6">
              <p
                class="font-ui text-sm font-semibold uppercase tracking-[0.12em] text-[var(--color-on-surface-variant)]"
              >
                Productos
              </p>

              <div class="mt-6 space-y-6">
                <!-- Aquí irán los CartItem -->
              </div>
            </div>
          </div>

          <aside
            class="h-fit rounded-3xl bg-[var(--color-surface-container-lowest)] p-6 shadow-sm"
          >
            <h2
              class="font-headline text-3xl font-semibold text-[var(--color-on-surface)]"
            >
              Opciones de pedido
            </h2>

            <div class="mt-6">
              <p
                class="font-ui text-sm font-semibold text-[var(--color-on-surface)]"
              >
                Tipo de pedido
              </p>

              <div class="mt-3 grid grid-cols-2 gap-2">
                <button
                  type="button"
                  class="rounded-xl bg-[var(--color-surface-container)] px-4 py-3 font-ui text-sm font-semibold text-[var(--color-primary)]"
                >
                  En restaurante
                </button>

                <button
                  type="button"
                  class="rounded-xl border border-[var(--color-outline-variant)] bg-[var(--color-surface)] px-4 py-3 font-ui text-sm font-semibold text-[var(--color-on-surface-variant)]"
                >
                  A domicilio
                </button>
              </div>
            </div>

            <div class="mt-8">
              <label
                for="scheduledOrder"
                class="font-ui text-sm font-semibold text-[var(--color-on-surface)]"
              >
                Programar el pedido
              </label>

              <input
                id="scheduledOrder"
                type="text"
                placeholder="Ej: En media hora"
                class="mt-3 w-full rounded-xl border border-[var(--color-outline-variant)] bg-[var(--color-surface)] px-4 py-3 font-body text-sm outline-none placeholder:text-[var(--color-outline)]"
              />

              <p
                class="mt-2 font-body text-xs text-[var(--color-on-surface-variant)]"
              >
                Indica un rango aproximado de recogida en local.
              </p>
            </div>

            <div class="my-6 border-t border-[var(--color-outline-variant)]"></div>

            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <span
                  class="font-body text-sm text-[var(--color-on-surface-variant)]"
                >
                  Subtotal
                </span>

                <span
                  class="font-body text-sm font-medium text-[var(--color-on-surface)]"
                >
                  €0.00
                </span>
              </div>

              <div class="flex items-center justify-between">
                <span
                  class="font-body text-sm text-[var(--color-on-surface-variant)]"
                >
                  Impuestos (IVA 21%)
                </span>

                <span
                  class="font-body text-sm font-medium text-[var(--color-on-surface)]"
                >
                  €0.00
                </span>
              </div>
            </div>

            <div class="my-6 border-t border-[var(--color-outline-variant)]"></div>

            <div class="flex items-center justify-between">
              <span
                class="font-headline text-2xl font-semibold text-[var(--color-on-surface)]"
              >
                Total
              </span>

              <span
                class="font-headline text-2xl font-semibold text-[var(--color-on-surface)]"
              >
                €0.00
              </span>
            </div>

            <button
              type="button"
              class="mt-6 w-full rounded-xl bg-[var(--color-primary)] px-5 py-4 font-ui text-sm font-semibold text-[var(--color-on-primary)]"
            >
              Continuar pedido →
            </button>

            <p
              class="mt-4 text-center font-body text-xs text-[var(--color-outline)]"
            >
              Pago seguro y cifrado
            </p>
          </aside>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
</style>