<script setup>
import { ref } from "vue";
import { Filter, FileText, Download } from "lucide-vue-next";

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

function statusClass(status) {
  return status === "Pagado"
    ? "bg-secondary-container text-on-secondary-container"
    : "bg-error-container text-error";
}

function downloadReport() {
  console.log("Descargar informe PDF");
}
</script>

<template>
  <div>
    <h1 class="font-headline text-4xl font-semibold text-on-surface">
      Facturación e Informes
    </h1>
    <p class="font-body text-outline mt-2">
      Gestión centralizada de facturas, transacciones y reportes de rendimiento.
      Auditoría rigurosa y exportación documental.
    </p>

    <div class="grid grid-cols-[1fr_360px] gap-6 mt-8">
      <div>
        <div class="flex items-center justify-between mb-4">
          <h2 class="font-headline text-2xl text-on-surface">
            Últimas Facturas
          </h2>
          <button
            class="flex items-center gap-2 font-ui font-semibold bg-surface-container-lowest px-4 py-2 rounded-lg"
          >
            <Filter class="w-4 h-4" />
            Filtrar
          </button>
        </div>

        <div class="bg-surface-container-lowest rounded-xl overflow-hidden">
          <table class="w-full">
            <thead>
              <tr
                class="font-ui text-sm font-semibold text-on-surface text-left border-b border-outline-variant/30"
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
                v-for="inv in invoices"
                :key="inv.id"
                class="border-b border-outline-variant/20 last:border-0"
              >
                <td class="p-4 font-ui font-semibold text-on-surface">
                  {{ inv.id }}
                </td>
                <td class="p-4 font-body text-on-surface">
                  {{ inv.customer }}
                </td>
                <td class="p-4 font-body text-outline">{{ inv.date }}</td>
                <td class="p-4 font-ui font-semibold">
                  {{ inv.amount.toFixed(2) }} €
                </td>
                <td class="p-4 font-body text-outline">{{ inv.method }}</td>
                <td class="p-4">
                  <span
                    class="font-ui text-sm font-semibold px-3 py-1 rounded-full"
                    :class="statusClass(inv.status)"
                  >
                    {{ inv.status }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
          <p class="p-4 font-ui text-sm text-outline">
            Mostrando {{ invoices.length }} de 142 registros
          </p>
        </div>
      </div>

      <div>
        <h2 class="font-headline text-2xl text-on-surface mb-4">
          Informes Generados
        </h2>
        <div class="bg-surface-container-lowest rounded-xl p-6">
          <h3 class="font-headline text-xl text-on-surface">
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
