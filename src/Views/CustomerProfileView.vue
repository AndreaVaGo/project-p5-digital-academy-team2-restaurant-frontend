<script setup>
import { ref } from "vue";
import { Pencil, Star, Mic } from "lucide-vue-next";

const form = ref({
  nombre: "Alejandro",
  apellidos: "García",
  email: "alejandro.garcia@example.com",
  direccion: "Calle Uria 45, 3º B",
  codigoPostal: "33003",
  ciudad: "Oviedo",
});

function guardarCambios() {
  console.log("Datos del perfil guardados:", form.value);
  // Aquí, más adelante, irá la llamada al backend (fetch/PUT) para guardar los cambios.
}

// Dictado por voz para el campo Ciudad, usando la Web Speech API del navegador
const dictando = ref(false);

function dictarCiudad() {
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    console.warn("Este navegador no soporta reconocimiento de voz.");
    return;
  }

  const recognition = new SpeechRecognition();
  recognition.lang = "es-ES";
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  recognition.onstart = () => {
    dictando.value = true;
  };

  recognition.onresult = (event) => {
    const texto = event.results[0][0].transcript;
    // Ponemos en mayúscula la primera letra (ej. "oviedo" -> "Oviedo")
    form.value.ciudad = texto.charAt(0).toUpperCase() + texto.slice(1);
  };

  recognition.onerror = (event) => {
    console.warn("Error en el dictado por voz:", event.error);
  };

  recognition.onend = () => {
    dictando.value = false;
  };

  recognition.start();
}
</script>

<template>
  <div
    class="text-left bg-outline-variant/50 px-4 py-6 sm:px-6 md:px-8"
    style="background-color: rgba(189, 203, 178, 0.5)"
  >
    <h1 class="font-headline text-2xl sm:text-3xl font-semibold text-primary">
      Perfil de Cliente
    </h1>
    <p class="font-body text-white text-sm mt-1">
      Gestiona tus datos personales y preferencias para tus pedidos en GiaComo.
    </p>

    <div class="grid grid-cols-1 md:grid-cols-[260px_1fr] gap-6 mt-6">
      <!-- Columna izquierda: foto, nombre y nivel -->
      <aside class="flex flex-col items-center md:items-stretch">
        <div class="relative w-full max-w-55 md:max-w-none aspect-square">
          <img
            src="https://i.pravatar.cc/300?img=12"
            alt="Foto de perfil de Alejandro García"
            class="w-full h-full rounded-2xl object-cover"
          />
          <button
            type="button"
            class="absolute bottom-2 right-2 bg-primary-container text-white rounded-full p-2"
            aria-label="Cambiar foto de perfil"
          >
            <Pencil class="w-3.5 h-3.5" />
          </button>
        </div>

        <h2
          class="font-headline text-xl text-on-surface mt-4 text-center md:text-left"
        >
          {{ form.nombre }} {{ form.apellidos }}
        </h2>
        <p class="font-body text-sm text-outline text-center md:text-left">
          {{ form.email }}
        </p>

        <div
          class="flex items-center gap-3 bg-surface-container-lowest rounded-xl p-4 mt-4 w-full max-w-55 md:max-w-none"
          style="
            background-color: var(--color-surface-container-lowest);
            border-radius: 1rem;
            padding: 1rem;
          "
        >
          <Star class="w-5 h-5 text-primary" fill="currentColor" />
          <div class="flex flex-col">
            <span class="font-ui text-xs text-outline">Nivel</span>
            <strong class="font-ui text-sm text-on-surface"
              >Gastrónomo Frecuente</strong
            >
          </div>
        </div>
      </aside>

      <!-- Formulario -->
      <section
        class="bg-surface-container-lowest rounded-xl p-5 sm:p-8"
        style="
          background-color: var(--color-surface-container-lowest);
          border-radius: 1rem;
        "
      >
        <form @submit.prevent="guardarCambios">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-8">
            <div class="flex flex-col">
              <label
                for="nombre"
                class="font-ui text-xs font-semibold text-outline mb-2"
                >NOMBRE</label
              >
              <input
                id="nombre"
                v-model="form.nombre"
                type="text"
                class="bg-transparent border-b border-outline-variant py-1.5 font-body text-on-surface outline-none focus:border-primary"
              />
            </div>
            <div class="flex flex-col">
              <label
                for="apellidos"
                class="font-ui text-xs font-semibold text-outline mb-2"
                >APELLIDOS</label
              >
              <input
                id="apellidos"
                v-model="form.apellidos"
                type="text"
                class="bg-transparent border-b border-outline-variant py-1.5 font-body text-on-surface outline-none focus:border-primary"
              />
            </div>
          </div>

          <div class="flex flex-col mt-6">
            <label
              for="email"
              class="font-ui text-xs font-semibold text-outline mb-2"
              >EMAIL</label
            >
            <input
              id="email"
              v-model="form.email"
              type="email"
              class="bg-transparent border-b border-outline-variant py-1.5 font-body text-on-surface outline-none focus:border-primary"
            />
          </div>

          <hr class="border-outline-variant/40 my-8" />

          <h3 class="font-headline text-xl text-on-surface mb-6">
            Dirección de Entrega
          </h3>

          <div class="flex flex-col">
            <label
              for="direccion"
              class="font-ui text-xs font-semibold text-outline mb-2"
              >DIRECCIÓN</label
            >
            <input
              id="direccion"
              v-model="form.direccion"
              type="text"
              class="bg-transparent border-b border-outline-variant py-1.5 font-body text-on-surface outline-none focus:border-primary"
            />
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-8 mt-6">
            <div class="flex flex-col">
              <label
                for="cp"
                class="font-ui text-xs font-semibold text-outline mb-2"
                >CÓDIGO POSTAL</label
              >
              <input
                id="cp"
                v-model="form.codigoPostal"
                type="text"
                class="bg-transparent border-b border-outline-variant py-1.5 font-body text-on-surface outline-none focus:border-primary"
              />
            </div>
            <div class="flex flex-col">
              <label
                for="ciudad"
                class="font-ui text-xs font-semibold text-outline mb-2"
                >CIUDAD</label
              >
              <div class="flex items-center border-b border-outline-variant">
                <input
                  id="ciudad"
                  v-model="form.ciudad"
                  type="text"
                  class="bg-transparent py-1.5 font-body text-on-surface outline-none flex-1"
                />
                <button
                  type="button"
                  @click="dictarCiudad"
                  class="p-1"
                  :class="dictando ? 'text-primary' : 'text-outline'"
                  :aria-label="
                    dictando ? 'Escuchando...' : 'Dictar ciudad por voz'
                  "
                >
                  <Mic
                    class="w-4 h-4"
                    :fill="dictando ? 'currentColor' : 'none'"
                  />
                </button>
              </div>
            </div>
          </div>

          <div class="flex justify-center sm:justify-end mt-8">
            <button
              type="submit"
              class="w-full sm:w-auto bg-primary-container text-white font-ui font-semibold px-7 py-3 rounded-xl"
            >
              Guardar cambios
            </button>
          </div>
        </form>
      </section>
    </div>
  </div>
</template>

<style scoped>
.text-on-surface {
  color: var(--color-on-surface) !important;
}
</style>
