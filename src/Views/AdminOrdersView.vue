<script setup>
import { ref, computed } from "vue";
import {
  Store,
  Bike,
  Truck,
  ChefHat,
  CheckCircle2,
  XCircle,
  Eye,
} from "lucide-vue-next";
import { formatCurrency } from "@/utils/formatCurrency";

const tabs = [
  { key: "todos", label: "Todos" },
  { key: "activos", label: "Activos" },
  { key: "entregados", label: "Entregados" },
  { key: "cancelados", label: "Cancelados" },
];
const activeTab = ref("activos");

const orders = ref([
  {
    id: "#GC-8945",
    customer: "Carmen Alonso",
    phone: "+34 622 14 58 90",
    service: "sala",
    serviceLabel: "En Sala · Mesa 4",
    items: "2x Cachopo Tradicional, 1x Fabada, 2x Sidra DOP",
    total: 54.5,
    time: "Hace 8 min",
    status: "cocina",
  },
  {
    id: "#GC-8944",
    customer: "Pelayo González",
    phone: "+34 689 33 11 20",
    service: "domicilio",
    serviceLabel: "Domicilio",
    items: "1x Cachopo Clásico, 2x Arroz con Leche, 1x Botella Sidra",
    total: 38.0,
    time: "Hace 16 min",
    status: "reparto",
  },
  {
    id: "#GC-8943",
    customer: "María García",
    phone: "+34 651 88 90 12",
    service: "sala",
    serviceLabel: "En Sala · Terraza 2",
    items: "3x Fabada Asturiana, 1x Tabla Quesos Cabrales, Pan artesano",
    total: 62.0,
    time: "Hace 21 min",
    status: "cocina",
  },
  {
    id: "#GC-8942",
    customer: "Alejandro Menéndez",
    phone: "+34 670 45 61 78",
    service: "domicilio",
    serviceLabel: "Domicilio",
    items: "1x Cachopo Tradicional, 1x Patatas al Cabrales",
    total: 29.5,
    time: "14:15",
    status: "entregado",
  },
  {
    id: "#GC-8941",
    customer: "Lucía Fernández",
    phone: "+34 633 99 22 10",
    service: "sala",
    serviceLabel: "En Sala · Mesa 8",
    items: "2x Arroz con Leche Quemado, 2x Café solo",
    total: 15.0,
    time: "13:50",
    status: "entregado",
  },
  {
    id: "#GC-8940",
    customer: "Marcos Suárez",
    phone: "+34 612 00 34 56",
    service: "domicilio",
    serviceLabel: "Domicilio",
    items: "1x Cachopo Clásico · Cancelado a petición del cliente",
    total: 24.0,
    time: "13:10",
    status: "cancelado",
  },
]);

const statusMap = {
  cocina: {
    label: "En cocina",
    bg: "bg-tertiary-container",
    text: "text-tertiary",
    icon: ChefHat,
  },
  reparto: {
    label: "En reparto",
    bg: "bg-highlight/20",
    text: "text-highlight",
    icon: Truck,
  },
  entregado: {
    label: "Entregado",
    bg: "bg-primary-container",
    text: "text-on-primary-container",
    icon: CheckCircle2,
  },
  cancelado: {
    label: "Cancelado",
    bg: "bg-error-container",
    text: "text-error",
    icon: XCircle,
  },
};

const serviceMap = {
  sala: { icon: Store, bg: "bg-secondary-container", text: "text-secondary" },
  domicilio: { icon: Bike, bg: "bg-tertiary-container", text: "text-tertiary" },
};

const counts = computed(() => ({
  todos: orders.value.length,
  activos: orders.value.filter(
    (o) => o.status === "cocina" || o.status === "reparto",
  ).length,
  entregados: orders.value.filter((o) => o.status === "entregado").length,
  cancelados: orders.value.filter((o) => o.status === "cancelado").length,
}));

const filteredOrders = computed(() => {
  if (activeTab.value === "todos") return orders.value;
  if (activeTab.value === "activos")
    return orders.value.filter(
      (o) => o.status === "cocina" || o.status === "reparto",
    );
  if (activeTab.value === "entregados")
    return orders.value.filter((o) => o.status === "entregado");
  return orders.value.filter((o) => o.status === "cancelado");
});
</script>

<template>
  <div>
    <span
      class="bg-secondary-container text-on-secondary-container font-ui text-xs font-semibold uppercase px-3 py-1 rounded-full"
    >
      Gestión Operativa
    </span>
    <h1 class="font-headline text-3xl font-semibold text-primary mt-3">
      Pedidos
    </h1>
    <p class="font-body text-white text-sm mt-1">
      Supervisión en tiempo real de pedidos de sala, entrega a domicilio y su
      estado actual.
    </p>

    <div
      class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-4"
    >
      <div class="flex flex-wrap gap-2">
        <button
          v-for="tab in tabs"
          :key="tab.key"
          type="button"
          @click="activeTab = tab.key"
          class="font-ui font-semibold text-sm px-4 py-2 rounded-full whitespace-nowrap"
          :class="
            activeTab === tab.key
              ? 'bg-primary-container text-on-primary-container'
              : 'bg-surface-container-lowest text-on-surface'
          "
        >
          {{ tab.label }} ({{ counts[tab.key] }})
        </button>
      </div>
      <span
        class="flex items-center gap-2 bg-secondary-container text-secondary font-ui text-sm font-semibold px-3 py-1.5 rounded-full self-start sm:self-auto"
      >
        <span class="w-2 h-2 rounded-full bg-secondary"></span>
        Actualizado hace 1 min
      </span>
    </div>

    <!-- Tarjetas: solo en móvil -->
    <div class="md:hidden flex flex-col gap-3 mt-4">
      <div
        v-for="o in filteredOrders"
        :key="o.id"
        class="bg-surface-container-lowest rounded-xl p-4 flex flex-col gap-3"
      >
        <div class="flex items-center justify-between">
          <span class="font-ui font-semibold text-primary">{{ o.id }}</span>
          <span
            class="flex items-center gap-1.5 font-ui text-sm font-semibold px-3 py-1 rounded-full"
            :class="[statusMap[o.status].bg, statusMap[o.status].text]"
          >
            <component :is="statusMap[o.status].icon" class="w-3.5 h-3.5" />
            {{ statusMap[o.status].label }}
          </span>
        </div>

        <div>
          <p class="font-headline text-lg text-on-surface">{{ o.customer }}</p>
          <p class="font-body text-sm text-outline">{{ o.phone }}</p>
        </div>

        <span
          class="flex items-center gap-1.5 font-ui text-sm font-semibold px-3 py-1 rounded-full w-fit"
          :class="[serviceMap[o.service].bg, serviceMap[o.service].text]"
        >
          <component :is="serviceMap[o.service].icon" class="w-3.5 h-3.5" />
          {{ o.serviceLabel }}
        </span>

        <p class="font-body text-sm text-on-surface">{{ o.items }}</p>

        <div
          class="flex items-center justify-between border-t border-outline-variant/20 pt-3"
        >
          <span class="font-body text-sm text-outline">{{ o.time }}</span>
          <span class="font-headline text-2xl text-primary">{{
            formatCurrency(o.total)
          }}</span>
        </div>

        <button
          type="button"
          class="flex items-center justify-center gap-1 font-ui text-sm font-semibold bg-surface-container-low px-3 py-2 rounded-lg"
        >
          <Eye class="w-4 h-4" />
          Ver detalle
        </button>
      </div>

      <div
        class="flex flex-wrap items-center justify-between gap-3 font-ui text-sm text-outline"
      >
        <span
          >Mostrando {{ filteredOrders.length }} de {{ orders.length }} pedidos
          registrados hoy</span
        >
        <div class="flex items-center gap-2">
          <button
            type="button"
            class="border border-outline-variant rounded-lg px-3 py-1.5 font-ui text-sm text-on-surface"
          >
            Anterior
          </button>
          <span class="font-ui font-semibold text-on-surface px-2">1</span>
          <button
            type="button"
            class="border border-outline-variant rounded-lg px-3 py-1.5 font-ui text-sm text-on-surface"
          >
            Siguiente
          </button>
        </div>
      </div>
    </div>

    <!-- Tabla: desde tablet en adelante -->
    <div
      class="hidden md:block bg-surface-container-lowest rounded-xl mt-4 overflow-x-auto"
    >
      <table class="w-full min-w-225">
        <thead>
          <tr
            class="font-ui text-sm font-semibold text-outline text-left border-b border-outline-variant/30"
          >
            <th class="p-4">Nº Pedido</th>
            <th class="p-4">Cliente &amp; Teléfono</th>
            <th class="p-4">Servicio</th>
            <th class="p-4">Artículos</th>
            <th class="p-4 text-right">Total</th>
            <th class="p-4">Hora</th>
            <th class="p-4">Estado</th>
            <th class="p-4"></th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="o in filteredOrders"
            :key="o.id"
            class="border-b border-outline-variant/20 last:border-0"
          >
            <td
              class="p-4 font-ui font-semibold text-primary whitespace-nowrap"
            >
              {{ o.id }}
            </td>
            <td class="p-4">
              <p
                class="font-headline text-base text-on-surface whitespace-nowrap"
              >
                {{ o.customer }}
              </p>
              <p class="font-body text-sm text-outline whitespace-nowrap">
                {{ o.phone }}
              </p>
            </td>
            <td class="p-4">
              <span
                class="flex items-center gap-1.5 font-ui text-sm font-semibold px-3 py-1 rounded-full w-fit whitespace-nowrap"
                :class="[serviceMap[o.service].bg, serviceMap[o.service].text]"
              >
                <component
                  :is="serviceMap[o.service].icon"
                  class="w-3.5 h-3.5"
                />
                {{ o.serviceLabel }}
              </span>
            </td>
            <td class="p-4 font-body text-sm text-on-surface max-w-xs">
              {{ o.items }}
            </td>
            <td
              class="p-4 text-right font-headline text-2xl text-primary whitespace-nowrap"
            >
              {{ formatCurrency(o.total) }}
            </td>
            <td class="p-4 font-body text-sm text-outline whitespace-nowrap">
              {{ o.time }}
            </td>
            <td class="p-4">
              <span
                class="flex items-center gap-1.5 font-ui text-sm font-semibold px-3 py-1 rounded-full w-fit whitespace-nowrap"
                :class="[statusMap[o.status].bg, statusMap[o.status].text]"
              >
                <component :is="statusMap[o.status].icon" class="w-3.5 h-3.5" />
                {{ statusMap[o.status].label }}
              </span>
            </td>
            <td class="p-4">
              <button
                type="button"
                class="flex items-center gap-1 font-ui text-sm font-semibold bg-surface-container-low px-3 py-2 rounded-lg whitespace-nowrap"
              >
                <Eye class="w-4 h-4" />
                Ver detalle
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <div
        class="flex items-center justify-between p-4 font-ui text-sm text-outline"
      >
        <span
          >Mostrando {{ filteredOrders.length }} de {{ orders.length }} pedidos
          registrados hoy</span
        >
        <div class="flex items-center gap-2">
          <button
            type="button"
            class="border border-outline-variant rounded-lg px-3 py-1.5 font-ui text-sm text-on-surface"
          >
            Anterior
          </button>
          <span class="font-ui font-semibold text-on-surface px-2">1</span>
          <button
            type="button"
            class="border border-outline-variant rounded-lg px-3 py-1.5 font-ui text-sm text-on-surface"
          >
            Siguiente
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
