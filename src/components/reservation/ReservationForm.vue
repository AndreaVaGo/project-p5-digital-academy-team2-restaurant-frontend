<script setup>
import { ref } from "vue";
import BaseModal from "../BaseModal.vue";
import { useReservation } from "../../composables/useReservation";

const {
  selectedDate,
  selectedTime,
  name,
  phone,
  email,
  specialRequests,
  reservation,
} = useReservation();

const submitted = ref(false);
const errors = ref({});
const showErrorModal = ref(false);
const reservationSent = ref(false);

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^[0-9+\s()-]{9,}$/;

const handleSubmit = () => {
  submitted.value = true;
  reservationSent.value = false;
  showErrorModal.value = false;
  errors.value = {};

  if (!selectedDate.value) {
    errors.value.date = "Selecciona una fecha.";
  }

  if (!selectedTime.value) {
    errors.value.time = "Selecciona una hora.";
  }

  if (!name.value.trim()) {
    errors.value.name = "Introduce tu nombre.";
  } else if (name.value.trim().length < 2) {
    errors.value.name = "El nombre debe tener al menos 2 caracteres.";
  }

  if (!phone.value.trim()) {
    errors.value.phone = "Introduce tu teléfono.";
  } else if (!phonePattern.test(phone.value.trim())) {
    errors.value.phone = "Introduce un teléfono válido.";
  }

  if (!email.value.trim()) {
    errors.value.email = "Introduce tu email.";
  } else if (!emailPattern.test(email.value.trim())) {
    errors.value.email = "Introduce un email válido.";
  }

  if (Object.keys(errors.value).length > 0) {
    showErrorModal.value = true;
    return;
  }

  reservationSent.value = true;

  console.log("Reserva:", reservation.value);
};
</script>

<template>
  <section class="bg-[var(--color-surface)] px-6 py-8">
    <div class="mx-auto max-w-2xl">
      <h2
        class="font-headline text-3xl font-semibold text-[var(--color-on-surface)]"
      >
        Tus datos
      </h2>

      <p class="mt-2 font-body text-sm text-[var(--color-on-surface-variant)]">
        Necesitamos estos datos para confirmar tu reserva.
      </p>

      <form @submit.prevent="handleSubmit" class="mt-6 space-y-5">
        <div>
          <label
            for="name"
            class="font-ui text-sm font-semibold text-[var(--color-on-surface)]"
          >
            Nombre
          </label>

          <input
            id="name"
            v-model="name"
            type="text"
            placeholder="Tu nombre"
            class="mt-2 w-full rounded-xl border border-[var(--color-outline-variant)] bg-[var(--color-surface-container-lowest)] px-4 py-3 font-body text-sm outline-none placeholder:text-[var(--color-outline)]"
          />
          <p
            v-if="submitted && errors.name"
            class="font-ui text-xs text-[var(--color-error)]"
          >
            {{ errors.name }}
          </p>
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
            v-model="phone"
            type="tel"
            placeholder="Tu teléfono"
            class="mt-2 w-full rounded-xl border border-[var(--color-outline-variant)] bg-[var(--color-surface-container-lowest)] px-4 py-3 font-body text-sm outline-none placeholder:text-[var(--color-outline)]"
          />
          <p
            v-if="submitted && errors.phone"
            class="font-ui text-xs text-[var(--color-error)]"
          >
            {{ errors.phone }}
          </p>
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
            v-model="email"
            type="email"
            placeholder="tu@email.com"
            class="mt-2 w-full rounded-xl border border-[var(--color-outline-variant)] bg-[var(--color-surface-container-lowest)] px-4 py-3 font-body text-sm outline-none placeholder:text-[var(--color-outline)]"
          />
          <p
            v-if="submitted && errors.email"
            class="font-ui text-xs text-[var(--color-error)]"
          >
            {{ errors.email }}
          </p>
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
            v-model="specialRequests"
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

      <BaseModal
        :open="showErrorModal"
        title="Revisa tu reserva"
        message="Hay algunos datos que necesitan tu atención."
        confirm-text="Revisar datos"
        @close="showErrorModal = false"
        @confirm="showErrorModal = false"
      />

      <BaseModal
        :open="reservationSent"
        title="¡Reserva recibida!"
        message="Hemos recibido correctamente los datos de tu reserva."
        confirm-text="Aceptar"
        @close="reservationSent = false"
        @confirm="reservationSent = false"
      />
    </div>
  </section>
</template>

<style scoped></style>
