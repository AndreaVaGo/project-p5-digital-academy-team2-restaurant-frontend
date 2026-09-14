<script setup>
import { ref, computed } from "vue";
import { Search, FileText, Download } from "lucide-vue-next";
import { formatCurrency } from "@/utils/formatCurrency";

const invoices = ref([
  {
    id: "#GC-8942",
    customer: "María Fernández",
    date: "24 Oct, 2023",
    amount: 145.5,
    method: "Tarjeta",
    status: "Pagado",
  },
  {
    id: "#GC-8941",
    customer: "Carlos Ruiz",
    date: "24 Oct, 2023",
    amount: 89.0,
    method: "Efectivo",
    status: "Pagado",
  },
  {
    id: "#GC-8940",
    customer: "Empresa XYZ S.L.",
    date: "23 Oct, 2023",
    amount: 420.0,
    method: "Transferencia",
    status: "Pendiente",
  },
  {
    id: "#GC-8939",
    customer: "Laura Gómez",
    date: "23 Oct, 2023",
    amount: 65.2,
    method: "Tarjeta",
    status: "Pagado",
  },
  {
    id: "#GC-8938",
    customer: "David Alonso",
    date: "22 Oct, 2023",
    amount: 112.9,
    method: "Tarjeta",
    status: "Pagado",
  },
]);

const statusTabs = ["Todas", "Pagado", "Pendiente"];
const statusTabStyles = {
  Todas: { bg: "bg-primary-container", text: "text-on-primary-container" },
  Pagado: { bg: "bg-highlight/20", text: "text-highlight" },
  Pendiente: { bg: "bg-secondary-container", text: "text-secondary" },
};
const activeStatus = ref("Todas");
const searchQuery = ref("");

const filteredInvoices = computed(() =>
  invoices.value.filter((inv) => {
    const matchesStatus =
      activeStatus.value === "Todas" || inv.status === activeStatus.value;
    const matchesSearch =
      inv.customer.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      inv.id.toLowerCase().includes(searchQuery.value.toLowerCase());
    return matchesStatus && matchesSearch;
  }),
);

function statusClass(status) {
  return status === "Pagado"
    ? "bg-secondary-container text-secondary"
    : "bg-error-container text-error";
}

function downloadReport() {
  console.log("Descargar informe PDF");
}
</script>

<template>
  <div>
    <h1 class="font-headline text-3xl font-semibold text-primary">
      Facturación e Informes
    </h1>
    <p class="font-body text-white text-sm mt-1">
      Gestión centralizada de facturas, transacciones y reportes de rendimiento.
      Auditoría rigurosa y exportación documental.
    </p>

    <div class="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-4 mt-4">
      <div>
        <h2 class="font-headline text-xl text-on-surface mb-3">
          Últimas Facturas
        </h2>

        <div
          class="bg-surface-container-lowest rounded-xl p-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3"
        >
          <div
            class="flex-1 flex items-center gap-2 bg-surface-container-low rounded-lg px-4 py-2"
          >
            <Search class="w-4 h-4 text-outline shrink-0" />
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Buscar por cliente o nº de pedido..."
              class="bg-transparent w-full font-body text-on-surface outline-none"
            />
          </div>
          <div class="flex gap-2 overflow-x-auto">
            <button
              v-for="tab in statusTabs"
              :key="tab"
              type="button"
              @click="activeStatus = tab"
              class="font-ui font-semibold text-sm px-4 py-2 rounded-full whitespace-nowrap shrink-0"
              :class="
                activeStatus === tab
                  ? [statusTabStyles[tab].bg, statusTabStyles[tab].text]
                  : 'bg-surface-container-low text-on-surface'
              "
            >
              {{ tab }}
            </button>
          </div>
        </div>

        <div
          class="bg-surface-container-lowest rounded-xl mt-3 overflow-x-auto"
        >
          <table class="w-full min-w-140">
            <thead>
              <tr
                class="font-ui text-sm font-semibold text-outline text-left border-b border-outline-variant/30"
              >
                <th class="p-4">Nº Pedido</th>
                <th class="p-4">Cliente</th>
                <th class="p-4">Fecha</th>
                <th class="p-4">Importe</th>
                <th class="p-4">Método</th>
                <th class="p-4">Estado</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="inv in filteredInvoices"
                :key="inv.id"
                class="border-b border-outline-variant/20 last:border-0"
              >
                <td
                  class="p-4 font-ui font-semibold text-primary whitespace-nowrap"
                >
                  {{ inv.id }}
                </td>
                <td class="p-4 font-body text-on-surface whitespace-nowrap">
                  {{ inv.customer }}
                </td>
                <td
                  class="p-4 font-body text-sm text-outline whitespace-nowrap"
                >
                  {{ inv.date }}
                </td>
                <td
                  class="p-4 font-headline text-2xl text-primary whitespace-nowrap"
                >
                  {{ formatCurrency(inv.amount) }}
                </td>
                <td
                  class="p-4 font-body text-sm text-outline whitespace-nowrap"
                >
                  {{ inv.method }}
                </td>
                <td class="p-4">
                  <span
                    class="font-ui text-sm font-semibold px-3 py-1 rounded-full whitespace-nowrap"
                    :class="statusClass(inv.status)"
                  >
                    {{ inv.status }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
          <div
            class="flex flex-wrap items-center justify-between gap-3 p-4 font-ui text-sm text-outline"
          >
            <span
              >Mostrando {{ filteredInvoices.length }} de 142 registros</span
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

      <div>
        <h2 class="font-headline text-xl text-on-surface mb-3">
          Informes Generados
        </h2>
        <div class="bg-surface-container-lowest rounded-xl p-5">
          <h3 class="font-headline text-lg text-on-surface">
            Descargar informe PDF
          </h3>
          <div class="flex items-start gap-3 mt-3">
            <div class="bg-secondary-container text-secondary rounded-lg p-2">
              <FileText class="w-6 h-6" />
            </div>
            <p class="font-body text-sm text-outline">
              Genera y descarga el informe oficial consolidado de ventas de Goxu
              (diario, mensual, trimestral y anual).
            </p>
          </div>
          <button
            type="button"
            @click="downloadReport"
            class="mt-5 w-full bg-primary-container text-white font-ui font-semibold py-3 rounded-xl flex items-center justify-center gap-2"
          >
            <Download class="w-4 h-4" />
            Descargar PDF
          </button>
          <p class="font-body text-xs text-outline mt-3">
            El archivo PDF incluirá el desglose completo de ventas diario,
            mensual, trimestral y anual.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
