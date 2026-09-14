<script setup>
import { ref, computed } from "vue";
import {
    Clock,
    Store,
    Bike,
    AlertTriangle,
    CheckSquare,
    Square,
} from "lucide-vue-next";

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
        agoLabel: "Hace 2 min",
        status: "listos",
    },
    {
        id: "#036",
        type: "domicilio",
        locationLabel: "Domicilio",
        deliveredNote: "Recogido por repartidor",
        agoLabel: "Hace 8 min",
        status: "listos",
    },
]);

const ordersByColumn = computed(() => {
    return columns.reduce((acc, col) => {
        acc[col.key] = orders.value.filter((o) => o.status === col.key);
        return acc;
    }, {});
});

function advanceStatus(order, nextStatus) {
    order.status = nextStatus;
}
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
            <h1 class="sr-only">Dashboard de Cocina</h1>
            <div
                class="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 md:grid md:grid-cols-4 md:overflow-visible md:pb-0">
                <section v-for="col in columns" :key="col.key" :aria-labelledby="`col-title-${col.key}`"
                    class="shrink-0 w-[85vw] max-w-sm snap-start md:w-auto md:max-w-none bg-surface-container-lowest rounded-xl p-4">
                    <div class="flex items-center justify-between mb-4">
                        <h2 :id="`col-title-${col.key}`"
                            class="font-ui text-xs font-semibold uppercase tracking-caps text-outline">
                            {{ col.label }}
                        </h2>
                        <span
                            class="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-on-primary font-ui text-xs font-semibold"
                            :aria-label="`${ordersByColumn[col.key].length} pedidos`">
                            {{ ordersByColumn[col.key].length }}
                        </span>
                    </div>

                    <div class="flex flex-col gap-3">
                        <div v-for="order in ordersByColumn[col.key]" :key="order.id"
                            class="bg-surface-container rounded-lg p-4 flex flex-col gap-3"
                            :class="col.key === 'listos' ? 'opacity-50' : ''">
                            <div class="flex items-center justify-between">
                                <h3 class="font-headline text-lg text-on-surface"
                                    :class="col.key === 'listos' ? 'line-through' : ''">
                                    {{ order.id }}
                                </h3>
                                <span
                                    class="flex items-center gap-1 font-ui text-xs font-semibold px-2 py-1 rounded-full"
                                    :class="order.type === 'mesa'
                                        ? 'bg-secondary-container text-secondary'
                                        : 'bg-tertiary-container text-tertiary'
                                        ">
                                    <component :is="order.type === 'mesa' ? Store : Bike" class="w-3.5 h-3.5"
                                        aria-hidden="true" />
                                    {{ order.locationLabel }}
                                </span>
                            </div>

                            <template v-if="col.key === 'listos'">
                                <p class="font-body text-sm text-outline">
                                    {{ order.deliveredNote }}
                                </p>
                                <p class="font-body text-xs text-outline">
                                    {{ order.agoLabel }}
                                </p>
                            </template>

                            <template v-else>
                                <span class="flex items-center gap-1 font-ui text-xs text-outline">
                                    <Clock class="w-3.5 h-3.5" aria-hidden="true" />
                                    {{ order.elapsedMin }} min
                                </span>

                                <ul v-if="order.items" class="flex flex-col gap-1">
                                    <li v-for="item in order.items" :key="item"
                                        class="font-body text-sm text-on-surface">
                                        {{ item }}
                                    </li>
                                </ul>

                                <ul v-if="order.checklist" class="flex flex-col gap-1">
                                    <li v-for="item in order.checklist" :key="item.name"
                                        class="flex items-center gap-2 font-body text-sm"
                                        :class="item.done ? 'text-outline line-through' : 'text-on-surface'">
                                        <component :is="item.done ? CheckSquare : Square" class="w-4 h-4 shrink-0"
                                            aria-hidden="true" />
                                        <span class="sr-only">{{ item.done ? "Completado" : "Pendiente" }}: </span>
                                        {{ item.name }}
                                    </li>
                                </ul>

                                <div v-if="order.note"
                                    class="bg-error-container text-on-error-container rounded-lg p-3 flex items-start gap-2">
                                    <AlertTriangle class="w-4 h-4 shrink-0 mt-0.5" aria-hidden="true" />
                                    <div>
                                        <p class="font-ui text-xs font-semibold uppercase">
                                            Indicación del cliente
                                        </p>
                                        <p class="font-body text-sm">{{ order.note }}</p>
                                    </div>
                                </div>

                                <button v-if="col.key === 'nuevos'" type="button"
                                    @click="advanceStatus(order, 'en-curso')"
                                    class="w-full rounded bg-primary text-on-primary font-ui text-sm font-semibold uppercase py-2">
                                    Empezar
                                </button>
                                <button v-if="col.key === 'en-curso'" type="button"
                                    @click="advanceStatus(order, 'listos')"
                                    class="w-full rounded bg-primary text-on-primary font-ui text-sm font-semibold uppercase py-2">
                                    Listo
                                </button>
                                <button v-if="col.key === 'con-retraso'" type="button"
                                    @click="advanceStatus(order, 'listos')"
                                    class="w-full rounded bg-error text-on-error font-ui text-sm font-semibold uppercase py-2">
                                    Marcar Listo Urgente
                                </button>
                            </template>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    </div>
</template>