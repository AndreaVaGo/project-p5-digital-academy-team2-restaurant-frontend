<script setup>
defineProps({
  open: {
    type: Boolean,
    default: false,
  },

  title: {
    type: String,
    default: "",
  },

  message: {
    type: String,
    default: "",
  },

  confirmText: {
    type: String,
    default: "Aceptar",
  },
});

const emit = defineEmits(["close", "confirm"]);
</script>

<template>
  <Teleport to="body">
    <div
      v-if="open"
      class="fixed inset-0 z-50 flex items-center justify-center bg-[var(--color-on-surface)]/40 px-6"
      @click.self="emit('close')"
    >
      <div
        class="w-full max-w-md rounded-3xl bg-[var(--color-surface)] p-6 shadow-xl"
        role="dialog"
        aria-modal="true"
        :aria-label="title"
      >
        <div class="flex items-start justify-between gap-4">
          <h2
            class="font-headline text-3xl font-semibold text-[var(--color-on-surface)]"
          >
            {{ title }}
          </h2>

          <button
            type="button"
            aria-label="Cerrar"
            class="font-ui text-2xl text-[var(--color-on-surface-variant)]"
            @click="emit('close')"
          >
            ×
          </button>
        </div>

        <p
          v-if="message"
          class="mt-4 font-body text-sm leading-6 text-[var(--color-on-surface-variant)]"
        >
          {{ message }}
        </p>

        <div class="mt-6 flex justify-end">
          <button
            type="button"
            class="rounded-xl bg-[var(--color-primary)] px-5 py-3 font-ui text-sm font-semibold text-[var(--color-on-primary)]"
            @click="emit('confirm')"
          >
            {{ confirmText }}
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
</style>