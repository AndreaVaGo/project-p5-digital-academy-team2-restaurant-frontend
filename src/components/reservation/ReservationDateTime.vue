<script setup>
import { useReservation } from "../../composables/useReservation";

const { selectedDate, selectedTime, errors } = useReservation();

const dates = [
  {
    label: "Hoy",
    value: "2026-09-13",
    day: "13",
  },
  {
    label: "Mañana",
    value: "2026-09-14",
    day: "14",
  },
];

const times = ["13:30", "14:00", "14:30", "20:30", "21:00", "21:30"];

const selectDate = (date) => {
  selectedDate.value = date;
};

const selectTime = (time) => {
  selectedTime.value = time;
};
</script>

<template>
  <section class="bg-[var(--color-surface)] px-6 py-8">
    <div class="mx-auto max-w-2xl">
      <h2
        class="font-headline text-3xl font-semibold text-[var(--color-on-surface)]"
      >
        Fecha y hora
      </h2>

      <div class="mt-6">
        <div class="flex items-center justify-between">
          <p
            class="font-ui text-sm font-semibold uppercase tracking-[0.12em]"
            :class="
              errors.date
                ? 'text-[var(--color-error)]'
                : 'text-[var(--color-on-surface-variant)]'
            "
          >
            Fecha
          </p>

          <span
            v-if="errors.date"
            class="font-ui text-xs text-[var(--color-error)]"
          >
            Selecciona una fecha
          </span>
        </div>
        <div class="mt-3 grid grid-cols-2 gap-3">
          <button
            v-for="date in dates"
            :key="date.value"
            type="button"
            class="rounded-xl border px-3 py-4 text-center"
            :class="
              selectedDate === date.value
                ? 'border-[var(--color-primary)] bg-[var(--color-primary)] text-[var(--color-on-primary)]'
                : errors.date
                  ? 'border-[var(--color-error)] bg-[var(--color-surface-container-lowest)] text-[var(--color-on-surface)]'
                  : 'border-[var(--color-outline-variant)] bg-[var(--color-surface-container-lowest)] text-[var(--color-on-surface)]'
            "
            @click="selectDate(date.value)"
          >
            <span class="block font-ui text-xs uppercase">
              {{ date.label }}
            </span>

            <span class="mt-1 block font-headline text-2xl font-semibold">
              {{ date.day }}
            </span>
          </button>
        </div>
      </div>

      <div class="mt-8">
        <div class="flex items-center justify-between">
          <p
            class="font-ui text-sm font-semibold uppercase tracking-[0.12em]"
            :class="
              errors.time
                ? 'text-[var(--color-error)]'
                : 'text-[var(--color-on-surface-variant)]'
            "
          >
            Hora
          </p>

          <span
            v-if="errors.time"
            class="font-ui text-xs text-[var(--color-error)]"
          >
            Selecciona una hora
          </span>
        </div>

        <div class="mt-3 grid grid-cols-3 gap-3">
          <button
            v-for="time in times"
            :key="time"
            type="button"
            class="rounded-xl border px-3 py-3 font-ui text-sm"
            :class="
              selectedTime === time
                ? 'border-[var(--color-primary)] bg-[var(--color-primary)] text-[var(--color-on-primary)]'
                : errors.time
                  ? 'border-[var(--color-error)] bg-[var(--color-surface-container-lowest)] text-[var(--color-on-surface)]'
                  : 'border-[var(--color-outline-variant)] bg-[var(--color-surface-container-lowest)] text-[var(--color-on-surface)]'
            "
            @click="selectTime(time)"
          >
            {{ time }}
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped></style>