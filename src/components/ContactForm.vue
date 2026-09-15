<script setup>
/* NOTE: colors here use generic Tailwind palette (green-600, pink-400, stone-*).
 * The project's official color tokens are already defined in style.css
 * (--color-primary, --color-highlight, --color-surface, etc., Material Design 3 style).
 * Pending: map these classes to the official tokens once confirmed with Iker.
 */

/* TODO(GC-?): pendiente de conectar el envío del formulario al backend */
</script>

<template>
  <section class="relative px-6 py-16 lg:px-16 flex justify-center">
    <div class="absolute inset-0 bg-black/30"></div>

    <div class="relative bg-white rounded-3xl shadow-xl w-full max-w-2xl p-8 md:p-12">
      <div class="text-center mb-8">
        <h2
          class="text-stone-900 text-3xl md:text-4xl leading-tight m-0 font-semibold"
          style="font-family: 'Cormorant Garamond', serif; color: #1c1917"
        >
          ¿Hablamos?
        </h2>
        <p class="text-stone-600 text-sm mt-2" style="font-family: 'Manrope', sans-serif">
          Cuéntanos qué necesitas y nos ponemos en contacto contigo.
        </p>
      </div>

      <form class="flex flex-col gap-4" @submit.prevent>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="flex flex-col gap-1">
            <label for="contact-name" class="text-xs font-semibold uppercase text-stone-500">
              Nombre completo *
            </label>
            <input
              id="contact-name"
              type="text"
              required
              placeholder="p. ej. Pelayo Álvarez"
              class="border border-stone-300 rounded-lg px-3 py-2 text-sm"
            />
          </div>

          <div class="flex flex-col gap-1">
            <label for="contact-email" class="text-xs font-semibold uppercase text-stone-500">
              Correo electrónico *
            </label>
            <input
              id="contact-email"
              type="email"
              required
              placeholder="pelayo@ejemplo.com"
              class="border border-stone-300 rounded-lg px-3 py-2 text-sm"
            />
          </div>
        </div>

        <div class="flex flex-col gap-1">
          <label for="contact-phone" class="text-xs font-semibold uppercase text-stone-500">
            Teléfono de contacto *
          </label>
          <input
            id="contact-phone"
            type="tel"
            required
            pattern="^\+?[0-9\s]{9,15}$"
            title="Introduce un número de teléfono válido (solo dígitos, espacios y prefijo opcional con +)"
            placeholder="+34 600 000 000"
            class="border border-stone-300 rounded-lg px-3 py-2 text-sm"
          />
        </div>

        <div class="flex flex-col gap-1">
          <label for="contact-message" class="text-xs font-semibold uppercase text-stone-500">
            ¿En qué podemos ayudarte? *
          </label>
          <textarea
            id="contact-message"
            required
            rows="3"
            placeholder="Reserva para grupo especial, menú para celiacos, eventos privados..."
            class="border border-stone-300 rounded-lg px-3 py-2 text-sm resize-none"
          ></textarea>
        </div>

        <div class="flex flex-col sm:flex-row gap-3 mt-2">
          <button
            type="button"
            class="flex-1 border border-pink-400 text-pink-600 text-xs font-semibold uppercase tracking-wide py-3 rounded-lg transition hover:bg-pink-50"
          >
            Quiero que me llaméis
          </button>
          <button
            type="submit"
            class="flex-1 bg-green-600 text-white text-xs font-semibold uppercase tracking-wide py-3 rounded-lg transition hover:opacity-90"
          >
            Enviar email
          </button>
        </div>
      </form>
    </div>
  </section>
</template>