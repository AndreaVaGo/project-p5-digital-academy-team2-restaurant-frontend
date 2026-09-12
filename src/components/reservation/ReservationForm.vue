<script setup>
</script>

<template>
  <section class="bg-[var(--color-surface)] px-6 py-8">
    <div class="mx-auto max-w-2xl">
      <h2
        class="font-headline text-3xl font-semibold text-[var(--color-on-surface)]"
      >
        Tus datos
      </h2>

      <p
        class="mt-2 font-body text-sm text-[var(--color-on-surface-variant)]"
      >
        Necesitamos estos datos para confirmar tu reserva.
      </p>

      <form class="mt-6 space-y-5">
        <div>
          <label
            for="name"
            class="font-ui text-sm font-semibold text-[var(--color-on-surface)]"
          >
            Nombre
          </label>

          <input
            id="name"
            type="text"
            placeholder="Tu nombre"
            class="mt-2 w-full rounded-xl border border-[var(--color-outline-variant)] bg-[var(--color-surface-container-lowest)] px-4 py-3 font-body text-sm outline-none placeholder:text-[var(--color-outline)]"
          />
        </div>

        <div>
          <label
            for="phone"
            class="font-ui text-sm font-semibold text-[var(--color-on-surface)]"
          >
            Teléfono
          </label>

          <input
            id="phone"
            type="tel"
            placeholder="Tu teléfono"
            class="mt-2 w-full rounded-xl border border-[var(--color-outline-variant)] bg-[var(--color-surface-container-lowest)] px-4 py-3 font-body text-sm outline-none placeholder:text-[var(--color-outline)]"
          />
        </div>

        <div>
          <label
            for="email"
            class="font-ui text-sm font-semibold text-[var(--color-on-surface)]"
          >
            Email
          </label>

          <input
            id="email"
            type="email"
            placeholder="tu@email.com"
            class="mt-2 w-full rounded-xl border border-[var(--color-outline-variant)] bg-[var(--color-surface-container-lowest)] px-4 py-3 font-body text-sm outline-none placeholder:text-[var(--color-outline)]"
          />
        </div>

        <div>
          <label
            for="specialRequests"
            class="font-ui text-sm font-semibold text-[var(--color-on-surface)]"
          >
            Peticiones especiales
          </label>

          <textarea
            id="specialRequests"
            rows="4"
            placeholder="¿Necesitas indicarnos algo?"
            class="mt-2 w-full resize-none rounded-xl border border-[var(--color-outline-variant)] bg-[var(--color-surface-container-lowest)] px-4 py-3 font-body text-sm outline-none placeholder:text-[var(--color-outline)]"
          ></textarea>
        </div>

        <button
          type="submit"
          class="w-full rounded-xl bg-[var(--color-primary)] px-5 py-4 font-ui text-sm font-semibold text-[var(--color-on-primary)]"
        >
          Confirmar reserva
        </button>
      </form>
    </div>
  </section>
</template>

<style scoped>
</style>