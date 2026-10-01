<script setup>
import { ref } from 'vue'

/*
 * Ruta del back para los mensajes de contacto.
 * Se construye con VITE_API_URL (archivo .env), igual que el resto de composables.
 */
const CONTACT_URL = `${import.meta.env.VITE_API_URL}/contact-messages`

/* Referencia al <form>, para lanzar sus validaciones HTML desde el código */
const formRef = ref(null)

/* Campos del formulario, enlazados con v-model */
const fullName = ref('')
const email = ref('')
const phone = ref('')
const message = ref('')

/* Estado del envío y mensajes para el usuario */
const enviando = ref(false)
const mensajeExito = ref('')
const mensajeError = ref('')

/*
 * Envía el mensaje al back con la preferencia de contacto elegida:
 * - 'CALL': botón "Quiero que me llaméis"
 * - 'EMAIL': botón "Enviar email"
 * Son los dos valores del enum ContactPreference del back.
 */
async function enviarMensaje(preferencia) {
  mensajeExito.value = ''
  mensajeError.value = ''

  /*
   * reportValidity ejecuta las validaciones del formulario (required, type="email", pattern)
   * y muestra los avisos del navegador. Si algo no es válido, no se envía nada.
   */
  if (!formRef.value.reportValidity()) return

  enviando.value = true
  try {
    const response = await fetch(CONTACT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fullName: fullName.value.trim(),
        email: email.value.trim(),
        phone: phone.value.trim(),
        message: message.value.trim(),
        contactPreference: preferencia,
      }),
    })

    /* fetch no lanza error con respuestas 400 o 500, por eso se comprueba response.ok */
    if (!response.ok) throw new Error(`Error ${response.status}`)

    mensajeExito.value =
      preferencia === 'CALL'
        ? '¡Gracias! Te llamaremos lo antes posible.'
        : '¡Gracias! Te responderemos por email lo antes posible.'

    /* Se vacía el formulario tras un envío correcto */
    fullName.value = ''
    email.value = ''
    phone.value = ''
    message.value = ''
  } catch (err) {
    console.warn('No se pudo enviar el mensaje de contacto:', err)
    mensajeError.value = 'No se ha podido enviar el mensaje. Inténtalo de nuevo más tarde.'
  } finally {
    /* Se ejecuta siempre, haya ido bien o mal */
    enviando.value = false
  }
}
</script>

<template>
  <section id="contacto" class="relative px-6 py-16 lg:px-16 flex justify-center">
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

      <!-- Pulsar Enter en un campo equivale a "Enviar email" -->
      <form ref="formRef" class="flex flex-col gap-4" @submit.prevent="enviarMensaje('EMAIL')">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="flex flex-col gap-1">
            <label for="contact-name" class="text-xs font-semibold uppercase text-on-surface-variant">
              Nombre completo *
            </label>
            <input
              id="contact-name"
              v-model="fullName"
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
              v-model="email"
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
            v-model="phone"
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
          <!-- maxlength 1000: el mismo límite que valida el back -->
          <textarea
            id="contact-message"
            v-model="message"
            required
            maxlength="1000"
            rows="3"
            placeholder="Reserva para grupo especial, menú para celiacos, eventos privados..."
            class="border border-outline-variant rounded-lg px-3 py-2 text-sm resize-none"
          ></textarea>
        </div>

        <!-- Mensajes para el usuario tras el envío -->
        <p v-if="mensajeExito" class="text-sm text-primary font-semibold" role="status">
          {{ mensajeExito }}
        </p>
        <p v-if="mensajeError" class="text-sm text-error" role="alert">
          {{ mensajeError }}
        </p>

        <div class="flex flex-col sm:flex-row gap-3 mt-2">
          <button
            type="button"
            :disabled="enviando"
            class="flex-1 border border-highlight text-highlight text-xs font-semibold uppercase tracking-wide py-3 rounded-lg transition hover:bg-highlight/10 disabled:opacity-50"
            @click="enviarMensaje('CALL')"
          >
            Quiero que me llaméis
          </button>
          <button
            type="submit"
            :disabled="enviando"
            class="flex-1 bg-primary text-on-primary text-xs font-semibold uppercase tracking-wide py-3 rounded-lg transition hover:opacity-90 disabled:opacity-50"
          >
            {{ enviando ? 'Enviando…' : 'Enviar email' }}
          </button>
        </div>
      </form>
    </div>
  </section>
</template>