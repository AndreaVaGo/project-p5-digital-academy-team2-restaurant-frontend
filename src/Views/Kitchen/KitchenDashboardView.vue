<script setup>
import { ref, computed, onMounted } from "vue";
import {
    Clock,
    Store,
    Bike,
    AlertTriangle,
    CheckSquare,
    Square,
} from "lucide-vue-next";
import { getKitchenOrdersByStatus } from "../../services/kitchenService";

const columns = [
    { key: "nuevos", label: "Nuevos", backendStatus: "PENDING" },
    { key: "en-curso", label: "En Curso", backendStatus: "IN_KITCHEN" },
    { key: "con-retraso", label: "Con Retraso", backendStatus: "DELAYED" },
    { key: "listos", label: "Listos", backendStatus: "READY" },
];

const orders = ref([]);
const loading = ref(false);
const error = ref(false);

const ordersByColumn = computed(() => {
    return columns.reduce((acc, col) => {
        acc[col.key] = orders.value.filter((order) => order.status === col.key);

        return acc;
    }, {});
});

function adaptOrder(order, status) {
    return {
        id: `#${String(order.id).padStart(3, "0")}`,
        backendId: order.id,
        type: order.tableNumber ? "mesa" : "domicilio",
        locationLabel: order.tableNumber
            ? `Local - Mesa ${order.tableNumber}`
            : "Domicilio",
        elapsedMin: Math.floor(
            (Date.now() - new Date(order.createdAt).getTime()) / 60000,
        ),
        items: order.items.map((item) => `${item.quantity}x ${item.productName}`),
        status,
    };
}

async function loadOrders() {
    loading.value = true;
    error.value = false;

    try {
        const responses = await Promise.all(
            columns.map(async (column) => {
                const data = await getKitchenOrdersByStatus(column.backendStatus);

                return data.map((order) => adaptOrder(order, column.key));
            }),
        );

        orders.value = responses.flat();
    } catch (err) {
        console.error("No se pudieron cargar los pedidos de cocina:", err);
        error.value = true;
    } finally {
        loading.value = false;
    }
}

onMounted(loadOrders);

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
                                        class="flex items-center gap-2 font-body text-sm" :class="item.done
                                                ? 'text-outline line-through'
                                                : 'text-on-surface'
                                            ">
                                        <component :is="item.done ? CheckSquare : Square" class="w-4 h-4 shrink-0"
                                            aria-hidden="true" />
                                        <span class="sr-only">{{ item.done ? "Completado" : "Pendiente" }}:
                                        </span>
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
