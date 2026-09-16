<script setup>
/* TODO(GC-?): pendiente de conectar el envío del formulario al backend */
</script>

<template>
  <section class="relative px-6 py-16 lg:px-16 flex justify-center">
    <div class="absolute inset-0 bg-black/30"></div>

    <div class="relative bg-surface-container-lowest rounded-3xl shadow-xl w-full max-w-2xl p-8 md:p-12">
      <div class="text-center mb-8">
        <h2
          class="text-on-surface text-3xl md:text-4xl leading-tight m-0 font-semibold"
          style="font-family: 'Cormorant Garamond', serif"
        >
          ¿Hablamos?
        </h2>
        <p class="text-on-surface-variant text-sm mt-2" style="font-family: 'Manrope', sans-serif">
          Cuéntanos qué necesitas y nos ponemos en contacto contigo.
        </p>
      </div>

      <form class="flex flex-col gap-4" @submit.prevent>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="flex flex-col gap-1">
            <label for="contact-name" class="text-xs font-semibold uppercase text-on-surface-variant">
              Nombre completo *
            </label>
            <input
              id="contact-name"
              type="text"
              required
              placeholder="p. ej. Pelayo Álvarez"
              class="border border-outline-variant rounded-lg px-3 py-2 text-sm"
            />
          </div>

          <div class="flex flex-col gap-1">
            <label for="contact-email" class="text-xs font-semibold uppercase text-on-surface-variant">
              Correo electrónico *
            </label>
            <input
              id="contact-email"
              type="email"
              required
              placeholder="pelayo@ejemplo.com"
              class="border border-outline-variant rounded-lg px-3 py-2 text-sm"
            />
          </div>
        </div>

        <div class="flex flex-col gap-1">
          <label for="contact-phone" class="text-xs font-semibold uppercase text-on-surface-variant">
            Teléfono de contacto *
          </label>
          <input
            id="contact-phone"
            type="tel"
            required
            pattern="^\+?[0-9\s]{9,15}$"
            title="Introduce un número de teléfono válido (solo dígitos, espacios y prefijo opcional con +)"
            placeholder="+34 600 000 000"
            class="border border-outline-variant rounded-lg px-3 py-2 text-sm"
          />
        </div>

        <div class="flex flex-col gap-1">
          <label for="contact-message" class="text-xs font-semibold uppercase text-on-surface-variant">
            ¿En qué podemos ayudarte? *
          </label>
          <textarea
            id="contact-message"
            required
            rows="3"
            placeholder="Reserva para grupo especial, menú para celiacos, eventos privados..."
            class="border border-outline-variant rounded-lg px-3 py-2 text-sm resize-none"
          ></textarea>
        </div>

        <div class="flex flex-col sm:flex-row gap-3 mt-2">
          <button
            type="button"
            class="flex-1 border border-highlight text-highlight text-xs font-semibold uppercase tracking-wide py-3 rounded-lg transition hover:bg-highlight/10"
          >
            Quiero que me llaméis
          </button>
          <button
            type="submit"
            class="flex-1 bg-primary text-on-primary text-xs font-semibold uppercase tracking-wide py-3 rounded-lg transition hover:opacity-90"
          >
            Enviar email
          </button>
        </div>
      </form>
    </div>
  </section>
</template>