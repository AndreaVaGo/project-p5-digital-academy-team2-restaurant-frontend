<script setup>
import { ref, computed } from "vue";
import {
  TrendingUp,
  Wallet,
  BarChart3,
  LineChart,
  Clock,
  ChefHat,
  CheckCircle2,
} from "lucide-vue-next";
import fabadaImg from "@/assets/images/menu/fabada.png";
import cachopoImg from "@/assets/images/menu/cachopo-tradicional.png";
import arrozImg from "@/assets/images/menu/arroz-con-leche.png";

const stats = ref([
  {
    label: "Ventas Diario",
    value: "€1,245.00",
    change: "↑ 12% vs ayer",
    icon: Wallet,
    up: true,
  },
  {
    label: "Ventas Mensual",
    value: "€18,750.00",
    change: "↑ 8.2% vs mes anterior",
    icon: TrendingUp,
    up: true,
  },
  {
    label: "Ventas Trimestral",
    value: "€34,500.00",
    change: "↑ 5.4% vs trimestre anterior",
    icon: BarChart3,
    up: true,
  },
  {
    label: "Ventas Anual",
    value: "€182k",
    change: "En línea con proyección",
    icon: LineChart,
    up: false,
  },
]);

const weeklySales = ref([
  { day: "Lun", value: 1200 },
  { day: "Mar", value: 2000 },
  { day: "Mié", value: 1400 },
  { day: "Jue", value: 2500 },
  { day: "Vie", value: 2900 },
  { day: "Sáb", value: 3100 },
  { day: "Dom", value: 1600 },
]);
const maxSale = computed(() =>
  Math.max(...weeklySales.value.map((d) => d.value)),
);

const orderStatus = ref([
  {
    label: "Pendientes",
    sub: "Requieren atención",
    count: 12,
    icon: Clock,
    bg: "bg-error-container",
    text: "text-error",
  },
  {
    label: "En Cocina",
    sub: "Preparando",
    count: 8,
    icon: ChefHat,
    bg: "bg-tertiary-container",
    text: "text-tertiary",
  },
  {
    label: "Entregados",
    sub: "Hoy",
    count: 45,
    icon: CheckCircle2,
    bg: "bg-secondary-container",
    text: "text-secondary",
  },
]);

const starProducts = ref([
  {
    image: cachopoImg,
    name: "Cachopo Tradicional",
    category: "Platos Principales",
    sold: 142,
    revenue: "€3,408",
  },
  {
    image: fabadaImg,
    name: "Fabada Asturiana",
    category: "Guisos",
    sold: 98,
    revenue: "€1,862",
  },
  {
    image: arrozImg,
    name: "Arroz con Leche Quemado",
    category: "Postres",
    sold: 85,
    revenue: "€510",
  },
]);
</script>

<template>
  <div>
    <h1 class="font-headline text-4xl font-semibold text-on-surface">
      Resumen del Negocio
    </h1>
    <p class="font-body text-outline mt-2">
      Visión general del rendimiento de Goxu hoy.
    </p>

    <div class="grid grid-cols-4 gap-4 mt-8">
      <div
        v-for="stat in stats"
        :key="stat.label"
        class="bg-surface-container-lowest rounded-xl p-5 relative"
      >
        <component
          :is="stat.icon"
          class="w-5 h-5 text-outline absolute top-5 right-5"
        />
        <p class="font-ui text-sm text-outline">{{ stat.label }}</p>
        <p class="font-headline text-3xl font-semibold text-on-surface mt-2">
          {{ stat.value }}
        </p>
        <p
          class="font-ui text-xs mt-2"
          :class="stat.up ? 'text-primary' : 'text-outline'"
        >
          {{ stat.change }}
        </p>
      </div>
    </div>

    <div class="grid grid-cols-[1fr_320px] gap-6 mt-6">
      <div class="bg-surface-container-lowest rounded-xl p-6">
        <div class="flex items-center justify-between">
          <h2 class="font-headline text-xl text-on-surface">
            Tendencia de Ventas (Semana)
          </h2>
          <span
            class="font-ui text-sm bg-surface-container-low px-3 py-1 rounded-full text-on-surface"
            >Esta Semana</span
          >
        </div>
        <div class="flex items-end gap-4 mt-8 h-48">
          <div
            v-for="d in weeklySales"
            :key="d.day"
            class="flex-1 flex flex-col items-center gap-2 h-full justify-end"
          >
            <div
              class="w-full rounded-t"
              :class="
                d.value === maxSale ? 'bg-primary' : 'bg-secondary-container'
              "
              :style="{ height: (d.value / maxSale) * 100 + '%' }"
            ></div>
            <span class="font-ui text-xs text-outline">{{ d.day }}</span>
          </div>
        </div>
      </div>

      <div class="bg-surface-container-lowest rounded-xl p-6">
        <h2 class="font-headline text-xl text-on-surface mb-4">
          Estado de Pedidos
        </h2>
        <div class="flex flex-col gap-3">
          <div
            v-for="status in orderStatus"
            :key="status.label"
            class="flex items-center justify-between rounded-lg p-4"
            :class="status.bg"
          >
            <div class="flex items-center gap-3">
              <component
                :is="status.icon"
                class="w-5 h-5"
                :class="status.text"
              />
              <div>
                <p class="font-ui font-semibold text-on-surface">
                  {{ status.label }}
                </p>
                <p class="font-ui text-xs text-outline">{{ status.sub }}</p>
              </div>
            </div>
            <span
              class="font-headline text-2xl font-semibold"
              :class="status.text"
              >{{ status.count }}</span
            >
          </div>
        </div>
      </div>
    </div>

    <div class="bg-surface-container-lowest rounded-xl p-6 mt-6">
      <div class="flex items-center justify-between mb-4">
        <h2 class="font-headline text-xl text-on-surface">
          Productos Estrella
        </h2>
        <RouterLink
          :to="{ name: 'admin-products' }"
          class="font-ui text-sm font-semibold text-primary"
          >Ver menú completo</RouterLink
        >
      </div>
      <table class="w-full">
        <thead>
          <tr
            class="font-ui text-xs uppercase text-outline text-left border-b border-outline-variant/30"
          >
            <th class="pb-2">Producto</th>
            <th class="pb-2">Categoría</th>
            <th class="pb-2 text-right">Vendidos</th>
            <th class="pb-2 text-right">Ingresos</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="p in starProducts"
            :key="p.name"
            class="border-b border-outline-variant/20 last:border-0"
          >
            <td class="py-3 flex items-center gap-3">
              <img
                :src="p.image"
                alt=""
                class="w-10 h-10 rounded-lg object-cover"
              />
              <span class="font-ui font-semibold text-on-surface">{{
                p.name
              }}</span>
            </td>
            <td class="font-body text-outline">{{ p.category }}</td>
            <td class="text-right font-ui">{{ p.sold }}</td>
            <td class="text-right font-ui font-semibold text-primary">
              {{ p.revenue }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
