<script setup>
import { ref, computed } from "vue";
import { formatCurrency } from "@/utils/formatCurrency";
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
    value: 1245,
    change: "↑ 12% vs ayer",
    icon: Wallet,
    up: true,
    isCurrency: true,
  },
  {
    label: "Ventas Mensual",
    value: 18750,
    change: "↑ 8.2% vs mes anterior",
    icon: TrendingUp,
    up: true,
    isCurrency: true,
  },
  {
    label: "Ventas Trimestral",
    value: 34500,
    change: "↑ 5.4% vs trimestre anterior",
    icon: BarChart3,
    up: true,
    isCurrency: true,
  },
  {
    label: "Ventas Anual",
    value: "€182k",
    change: "En línea con proyección",
    icon: LineChart,
    up: false,
    isCurrency: false,
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

const barColors = [
  "bg-primary",
  "bg-secondary",
  "bg-tertiary-container",
  "bg-outline-variant",
  "bg-secondary-container",
  "bg-primary-container",
  "bg-outline",
];

function barColor(index) {
  return barColors[index % barColors.length];
}

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
  <div class="h-full flex flex-col">
    <h1 class="font-headline text-3xl font-semibold text-primary">
      Resumen del Negocio
    </h1>
    <p class="font-body text-white text-sm mt-1">
      Visión general del rendimiento de Goxu hoy.
    </p>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
      <div
        v-for="stat in stats"
        :key="stat.label"
        class="bg-surface-container-lowest rounded-xl p-4 flex flex-col"
      >
        <div class="flex items-start justify-between">
          <p class="font-ui text-sm text-outline">{{ stat.label }}</p>
          <component :is="stat.icon" class="w-4 h-4 text-outline shrink-0" />
        </div>
        <p class="font-headline text-2xl font-semibold text-on-surface mt-1">
          {{ stat.isCurrency ? formatCurrency(stat.value) : stat.value }}
        </p>
        <p
          class="font-ui text-xs mt-1"
          :class="stat.up ? 'text-primary' : 'text-outline'"
        >
          {{ stat.change }}
        </p>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-4 gap-4 mt-4">
      <div class="bg-surface-container-lowest rounded-xl p-5 lg:col-span-3">
        <div class="flex items-center justify-between">
          <h2 class="font-headline text-lg text-on-surface">
            Tendencia de Ventas (Semana)
          </h2>
          <span
            class="font-ui text-xs border border-outline-variant/40 px-3 py-1 rounded-md text-on-surface"
            >Esta Semana</span
          >
        </div>
        <div class="flex gap-3 mt-4 overflow-x-auto">
          <div
            class="flex flex-col justify-between h-40 font-ui text-xs text-outline shrink-0"
          >
            <span>3k</span>
            <span>2k</span>
            <span>1k</span>
            <span>0</span>
          </div>
          <div class="flex-1 flex items-end gap-3 h-40 min-w-100">
            <div
              v-for="(d, index) in weeklySales"
              :key="d.day"
              class="flex-1 flex flex-col items-center gap-2 h-full justify-end"
            >
              <div
                class="w-full rounded-t"
                :class="barColor(index)"
                :style="{ height: (d.value / maxSale) * 100 + '%' }"
              ></div>
              <span class="font-ui text-xs text-outline">{{ d.day }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-surface-container-lowest rounded-xl p-4">
        <h2 class="font-headline text-lg text-on-surface mb-3">
          Estado de Pedidos
        </h2>
        <div class="flex flex-col gap-2">
          <div
            v-for="status in orderStatus"
            :key="status.label"
            class="flex items-center justify-between rounded-lg p-3"
            :class="status.bg"
          >
            <div class="flex items-center gap-2">
              <component
                :is="status.icon"
                class="w-4 h-4"
                :class="status.text"
              />
              <div>
                <p class="font-ui text-sm font-semibold text-on-surface">
                  {{ status.label }}
                </p>
                <p class="font-ui text-xs text-outline">{{ status.sub }}</p>
              </div>
            </div>
            <span
              class="font-headline text-xl font-semibold"
              :class="status.text"
              >{{ status.count }}</span
            >
          </div>
        </div>
      </div>
    </div>

    <div
      class="bg-surface-container-lowest rounded-xl p-4 mt-4 flex-1 overflow-x-auto"
    >
      <div class="flex items-center justify-between mb-3">
        <h2 class="font-headline text-lg text-on-surface">
          Productos Estrella
        </h2>
        <RouterLink
          :to="{ name: 'admin-products' }"
          class="font-ui text-sm font-semibold text-primary"
          >Ver menú completo</RouterLink
        >
      </div>
      <table class="w-full min-w-125">
        <thead>
          <tr
            class="font-ui text-xs text-outline text-left border-b border-outline-variant/30"
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
            <td class="py-2 flex items-center gap-3">
              <img
                :src="p.image"
                alt=""
                class="w-12 h-12 rounded-lg object-cover"
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
