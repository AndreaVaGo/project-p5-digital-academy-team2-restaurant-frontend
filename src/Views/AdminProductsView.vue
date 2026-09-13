<script setup>
import { ref, computed } from "vue";
import { Search } from "lucide-vue-next";
import fabadaImg from "@/assets/images/menu/fabada.png";
import sidraImg from '@/assets/images/menu/sidra.png'
import arrozImg from "@/assets/images/menu/arroz-con-leche.png";

const categories = ["Todos", "Especialidades", "Bebidas", "Postres"];
const categoryStyles = {
  Todos: { bg: "bg-primary-container", text: "text-on-primary-container" },
  Especialidades: { bg: "bg-secondary-container", text: "text-secondary" },
  Bebidas: { bg: "bg-tertiary-container", text: "text-tertiary" },
  Postres: { bg: "bg-highlight/20", text: "text-highlight" },
};
const activeCategory = ref("Todos");
const searchQuery = ref("");

const products = ref([
  {
    id: 1,
    image: fabadaImg,
    name: "Fabada Tradicional",
    description: "Con compango ahumado de Tineo",
    category: "Especialidades",
    price: 24.5,
    available: true,
  },
  {
    id: 2,
    image: sidraImg,
    name: "Sidra Natural DOP",
    description: "Selección especial de la casa, botella 70cl",
    category: "Bebidas",
    price: 6.0,
    available: true,
  },
  {
    id: 3,
    image: arrozImg,
    name: "Arroz con Leche Requesón",
    description: "Postre tradicional asturiano caramelizado",
    category: "Postres",
    price: 7.5,
    available: false,
  },
]);

const filteredProducts = computed(() =>
  products.value.filter((p) => {
    const matchesCategory =
      activeCategory.value === "Todos" || p.category === activeCategory.value;
    const matchesSearch = p.name
      .toLowerCase()
      .includes(searchQuery.value.toLowerCase());
    return matchesCategory && matchesSearch;
  }),
);

function toggleAvailability(productId) {
  const product = products.value.find((p) => p.id === productId);
  if (product) product.available = !product.available;
}
</script>

<template>
  <div>
    <div class="flex items-start justify-between">
      <div>
        <h1 class="font-headline text-3xl font-semibold text-primary">
          Gestión de Productos
        </h1>
        <p class="font-body text-white text-sm mt-1">
          Administra el inventario, precios y disponibilidad.
        </p>
      </div>
      <button
        type="button"
        class="bg-primary-container text-white font-ui font-semibold px-5 py-3 rounded-xl"
      >
        + AÑADIR PRODUCTO
      </button>
    </div>

    <div
      class="bg-surface-container-lowest rounded-xl p-4 mt-4 flex items-center gap-4"
    >
      <div
        class="flex-1 flex items-center gap-2 bg-surface-container-low rounded-lg px-4 py-2"
      >
        <Search class="w-4 h-4 text-outline" />
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Buscar productos..."
          class="bg-transparent w-full font-body text-on-surface outline-none"
        />
      </div>
      <button
        v-for="cat in categories"
        :key="cat"
        type="button"
        @click="activeCategory = cat"
        class="font-ui font-semibold text-sm px-4 py-2 rounded-full whitespace-nowrap"
        :class="
          activeCategory === cat
            ? [categoryStyles[cat].bg, categoryStyles[cat].text]
            : 'bg-surface-container-low text-on-surface'
        "
      >
        {{ cat }}
      </button>
    </div>

    <div class="bg-surface-container-lowest rounded-xl mt-4 overflow-hidden">
      <table class="w-full">
        <thead>
          <tr
            class="font-ui text-xs text-outline text-left border-b border-outline-variant/30"
          >
            <th class="p-4">Producto</th>
            <th class="p-4">Categoría</th>
            <th class="p-4">Precio</th>
            <th class="p-4">Disponibilidad</th>
            <th class="p-4">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="p in filteredProducts"
            :key="p.id"
            class="border-b border-outline-variant/20 last:border-0"
          >
            <td class="p-4 flex items-center gap-4">
              <img
                :src="p.image"
                alt=""
                class="w-16 h-16 rounded-lg object-cover"
              />
              <div>
                <p class="font-headline text-xl text-on-surface">
                  {{ p.name }}
                </p>
                <p class="font-body text-base text-outline">
                  {{ p.description }}
                </p>
              </div>
            </td>
            <td class="p-4">
              <span
                class="font-ui text-xs px-3 py-1 rounded-full"
                :class="[
                  categoryStyles[p.category]?.bg || 'bg-secondary-container',
                  categoryStyles[p.category]?.text || 'text-secondary',
                ]"
              >
                {{ p.category }}
              </span>
            </td>
            <td class="p-4 font-headline text-2xl text-primary">
              {{ p.price.toFixed(2) }} €
            </td>
            <td class="p-4">
              <button
                type="button"
                @click="toggleAvailability(p.id)"
                class="w-11 h-6 rounded-full relative transition-colors cursor-pointer appearance-none border-0 p-0 outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                :class="p.available ? 'bg-primary' : 'bg-outline-variant'"
                :aria-pressed="p.available"
              >
                <span
                  class="absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform block"
                  :class="p.available ? 'translate-x-5' : 'translate-x-0'"
                ></span>
              </button>
            </td>
            <td class="p-4"></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
