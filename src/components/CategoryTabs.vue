<script setup>
defineProps({
  categories: { type: Array, required: true },
})

const model = defineModel({ type: String, required: true })
</script>

<template>
  <div class="flex flex-wrap gap-3">
    <button
      v-for="category in categories"
      :key="category"
      type="button"
      class="rounded-full border px-5 py-2 font-ui text-sm font-semibold transition-colors"
      :class="
        model === category
          ? 'border-primary bg-primary text-on-primary'
          : 'border-outline-variant bg-transparent text-on-surface-variant hover:border-outline'
      "
      @click="model = category"
    >
      {{ category }}
    </button>
  </div>
</template>
