<script setup>
import { ref, computed, onMounted } from 'vue'
import AuthTabs from '../../components/AuthTabs.vue'
import BaseInput from '../../components/BaseInput.vue'
import BaseButton from '../../components/BaseButton.vue'
//import { loadRecaptcha, getRecaptchaToken } from '../../composables/useRecaptcha'
import { registerUser } from '../../services/authService'

const firstName = ref('')
const lastName = ref('')
const email = ref('')
const confirmEmail = ref('')
const password = ref('')
const confirmPassword = ref('')
const submitted = ref(false)
const verifying = ref(false)

const emailMismatch = computed(
  () => (confirmEmail.value !== '' || submitted.value) && confirmEmail.value !== email.value
)
const passwordMismatch = computed(
  () => (confirmPassword.value !== '' || submitted.value) && confirmPassword.value !== password.value
)

//onMounted(() => {
//  loadRecaptcha().catch((error) => console.error(error.message))
//})

async function handleSubmit() {
  submitted.value = true

  if (emailMismatch.value || passwordMismatch.value) return

  verifying.value = true

  try {
    const payload = {
      name: `${firstName.value} ${lastName.value}`.trim(),
      email: email.value,
      password: password.value,
      confirmPassword: confirmPassword.value,
    }

    const response = await registerUser(payload)

    console.log('Registro completado:', response)
  } catch (error) {
    console.error('Error al registrar usuario:', error)
  } finally {
    verifying.value = false
  }
}
</script>

<template>
  <div class="flex min-h-screen">
    <div class="hidden flex-1 bg-surface-dim md:block"></div>

    <div class="flex flex-1 items-center justify-center bg-surface px-6 py-16 md:px-16">
      <div class="w-full max-w-md">
        <AuthTabs />

        <h1 class="mt-10 font-headline text-headline-md font-medium text-on-surface">Crea tu cuenta</h1>
        <p class="mt-2 font-body text-body-md text-on-surface-variant">
          Regístrate para gestionar tus reservas y pedidos.
        </p>

        <form class="mt-8 flex flex-col gap-6" @submit.prevent="handleSubmit">
          <BaseInput
            id="firstName"
            v-model="firstName"
            label="Nombre"
            type="text"
            placeholder="Tu nombre"
            autocomplete="given-name"
          />
          <BaseInput
            id="lastName"
            v-model="lastName"
            label="Apellidos"
            type="text"
            placeholder="Tus apellidos"
            autocomplete="family-name"
          />
          <BaseInput
            id="email"
            v-model="email"
            label="Correo electrónico"
            type="email"
            placeholder="tu@email.com"
            autocomplete="email"
          />
          <div>
            <BaseInput
              id="confirmEmail"
              v-model="confirmEmail"
              label="Confirmar correo electrónico"
              type="email"
              placeholder="tu@email.com"
              autocomplete="email"
            />
            <p v-if="emailMismatch" class="mt-2 font-body text-sm text-error" role="alert">
              Los correos electrónicos no coinciden.
            </p>
          </div>
          <BaseInput
            id="password"
            v-model="password"
            label="Contraseña"
            type="password"
            placeholder="••••••••"
            autocomplete="new-password"
          />
          <div>
            <BaseInput
              id="confirmPassword"
              v-model="confirmPassword"
              label="Confirmar contraseña"
              type="password"
              placeholder="••••••••"
              autocomplete="new-password"
            />
            <p v-if="passwordMismatch" class="mt-2 font-body text-sm text-error" role="alert">
              Las contraseñas no coinciden.
            </p>
          </div>

          <p class="font-body text-xs text-on-surface-variant">
            Este sitio está protegido por reCAPTCHA y se aplican la
            <a href="https://policies.google.com/privacy" target="_blank" rel="noopener" class="underline">
              Política de privacidad
            </a>
            y las
            <a href="https://policies.google.com/terms" target="_blank" rel="noopener" class="underline">
              Condiciones del servicio
            </a>
            de Google.
          </p>

          <BaseButton type="submit" :disabled="verifying">Crear cuenta</BaseButton>
        </form>

        <RouterLink
          to="/"
          class="mt-8 flex items-center justify-center gap-2 font-body text-sm text-highlight hover:underline"
        >
          <span aria-hidden="true">←</span> Volver al inicio
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<style>
.grecaptcha-badge {
  visibility: hidden;
}
</style>
