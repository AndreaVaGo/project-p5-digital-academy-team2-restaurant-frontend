<script setup>
import { ref, computed } from "vue";
import { Search } from "lucide-vue-next";
import fabadaImg from "@/assets/images/menu/fabada.png";
import cachopoImg from "@/assets/images/menu/cachopo-tradicional.png";
import arrozImg from "@/assets/images/menu/arroz-con-leche.png";

const categories = ["Todos", "Especialidades", "Bebidas", "Postres"];
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
    image: cachopoImg,
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

function toggleAvailability(product) {
  product.available = !product.available;
}
</script>

<template>
  <div>
    <div class="flex items-start justify-between">
      <div>
        <h1 class="font-headline text-4xl font-semibold text-on-surface">
          Gestión de Productos
        </h1>
        <p class="font-body text-outline mt-2">
          Administra el inventario, precios y disponibilidad.
        </p>
      </div>
      <button
        class="bg-primary-container text-white font-ui font-semibold px-5 py-3 rounded-xl"
      >
        + AÑADIR PRODUCTO
      </button>
    </div>

    <div
      class="bg-surface-container-lowest rounded-xl p-5 mt-8 flex items-center gap-4"
    >
      <div
        class="flex-1 flex items-center gap-2 bg-surface-container-low rounded-lg px-4 py-3"
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
        @click="activeCategory = cat"
        class="font-ui font-semibold px-4 py-2 rounded-full whitespace-nowrap"
        :class="
          activeCategory === cat
            ? 'bg-secondary-container text-on-secondary-container'
            : 'bg-surface-container-low text-on-surface'
        "
      >
        {{ cat }}
      </button>
    </div>

    <div class="bg-surface-container-lowest rounded-xl mt-6 overflow-hidden">
      <table class="w-full">
        <thead>
          <tr
            class="font-ui text-sm font-semibold text-on-surface text-left border-b border-outline-variant/30"
          >
            <th class="p-5">Producto</th>
            <th class="p-5">Categoría</th>
            <th class="p-5">Precio</th>
            <th class="p-5">Disponibilidad</th>
            <th class="p-5">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="p in filteredProducts"
            :key="p.id"
            class="border-b border-outline-variant/20 last:border-0"
          >
            <td class="p-5 flex items-center gap-4">
              <img
                :src="p.image"
                alt=""
                class="w-14 h-14 rounded-lg object-cover"
              />
              <div>
                <p class="font-headline text-lg text-on-surface">
                  {{ p.name }}
                </p>
                <p class="font-body text-sm text-outline">
                  {{ p.description }}
                </p>
              </div>
            </td>
            <td class="p-5">
              <span
                class="bg-secondary-container text-on-secondary-container font-ui text-sm px-3 py-1 rounded-full"
              >
                {{ p.category }}
              </span>
            </td>
            <td class="p-5 font-headline text-lg text-on-surface">
              {{ p.price.toFixed(2) }} €
            </td>
            <td class="p-5">
              <button
                @click="toggleAvailability(p)"
                class="w-11 h-6 rounded-full relative transition-colors"
                :class="p.available ? 'bg-primary' : 'bg-outline-variant'"
              >
                <span
                  class="absolute top-0.5 w-5 h-5 rounded-full bg-white transition-transform"
                  :class="p.available ? 'translate-x-5' : 'translate-x-0.5'"
                ></span>
              </button>
            </td>
            <td class="p-5"></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
