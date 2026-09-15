<script setup>
defineProps({
  disabled: { type: Boolean, default: false },
})

const model = defineModel({ type: Number, default: 1 })

function decrease() {
  if (model.value > 0) model.value--
}
function increase() {
  model.value++
}
</script>

<template>
  <div class="flex items-center gap-2">
    <button
      type="button"
      :disabled="disabled"
      class="flex h-9 w-9 items-center justify-center rounded-md border border-highlight text-on-surface disabled:opacity-40"
      @click="decrease"
    >
      −
    </button>
    <span class="w-4 text-center font-body text-body-md text-on-surface">{{ model }}</span>
    <button
      type="button"
      :disabled="disabled"
      class="flex h-9 w-9 items-center justify-center rounded-md border border-highlight text-on-surface disabled:opacity-40"
      @click="increase"
    >
      +
    </button>
  </div>
</template>
