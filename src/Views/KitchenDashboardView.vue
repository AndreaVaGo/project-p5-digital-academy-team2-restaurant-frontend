<script setup>
import { ref, computed } from "vue";

const columns = [
    { key: "nuevos", label: "Nuevos" },
    { key: "en-curso", label: "En Curso" },
    { key: "con-retraso", label: "Con Retraso" },
    { key: "listos", label: "Listos" },
];

const orders = ref([
    {
        id: "#042",
        type: "mesa",
        locationLabel: "Local - Mesa 4",
        elapsedMin: 2,
        items: ["2x Cachopo Clásico", "1x Fabada Asturiana"],
        status: "nuevos",
    },
    {
        id: "#043",
        type: "domicilio",
        locationLabel: "Domicilio",
        elapsedMin: 1,
        items: ["1x Ensalada de Cecina", "2x Arroz con Leche"],
        note: "Sin canela en el arroz con leche y aliño aparte para la ensalada",
        status: "nuevos",
    },
    {
        id: "#039",
        type: "mesa",
        locationLabel: "Local - Mesa 2",
        elapsedMin: 12,
        checklist: [
            { name: "1x Tabla de Quesos", done: true },
            { name: "1x Entrecot (Punto Menos)", done: false },
        ],
        status: "en-curso",
    },
    {
        id: "#041",
        type: "mesa",
        locationLabel: "Local - Barra 1",
        elapsedMin: 6,
        checklist: [
            { name: "2x Botellas Sidra Natural", done: true },
            { name: "1x Tortos de Maíz con Picadillo", done: false },
        ],
        status: "en-curso",
    },
    {
        id: "#037",
        type: "mesa",
        locationLabel: "Local - Mesa 6",
        elapsedMin: 18,
        items: ["1x Cachopo Tradicional", "1x Sidra Natural"],
        status: "con-retraso",
    },
    {
        id: "#038",
        type: "mesa",
        locationLabel: "Local - Mesa 4",
        deliveredNote: "Entregado a camarero",
        status: "listos",
    },
    {
        id: "#036",
        type: "domicilio",
        locationLabel: "Domicilio",
        deliveredNote: "Recogido por repartidor",
        status: "listos",
    },
]);

const ordersByColumn = computed(() => {
    return columns.reduce((acc, col) => {
        acc[col.key] = orders.value.filter((o) => o.status === col.key);
        return acc;
    }, {});
});
</script>

<template>
    <div class="min-h-screen bg-surface-container">
        <header class="bg-on-surface text-surface-container-lowest px-4 md:px-6 py-4 flex items-center justify-between">
            <div class="flex items-center gap-3">
                <span class="font-headline text-xl md:text-2xl">Goxu</span>
                <span class="bg-primary text-on-primary font-ui text-xs font-semibold uppercase px-3 py-1 rounded-full">
                    Dashboard de Cocina
                </span>
            </div>
        </header>

        <main class="p-4 md:p-6">
            <div
                class="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 md:grid md:grid-cols-4 md:overflow-visible md:pb-0">
                <section v-for="col in columns" :key="col.key"
                    class="shrink-0 w-[85vw] max-w-sm snap-start md:w-auto md:max-w-none bg-surface-container-lowest rounded-xl p-4">
                    <div class="flex items-center justify-between mb-4">
                        <span class="font-ui text-xs font-semibold uppercase tracking-caps text-outline">
                            {{ col.label }}
                        </span>
                        <span
                            class="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-on-primary font-ui text-xs font-semibold">
                            {{ ordersByColumn[col.key].length }}
                        </span>
                    </div>
                </section>
            </div>
        </main>
    </div>
</template>