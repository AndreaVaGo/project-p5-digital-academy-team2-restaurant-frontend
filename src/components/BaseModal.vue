<script setup>
defineProps({
  open: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["close"]);
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
      >
        <button
          type="button"
          aria-label="Cerrar"
          class="ml-auto block font-ui text-2xl text-[var(--color-on-surface-variant)]"
          @click="emit('close')"
        >
          ×
        </button>

        <div>
          <slot />
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
</style>