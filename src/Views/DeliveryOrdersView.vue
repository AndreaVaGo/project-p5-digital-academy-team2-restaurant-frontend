<script setup>
import { ref } from "vue";
import { Truck } from "lucide-vue-next";
import { formatCurrency } from "../utils/formatCurrency";

const orders = ref([
    { id: "#047", date: "Hoy (16/9/26)", time: "14:10", address: "Av. de la Constitución, 45, 3ºB", distance: "1,2 km", price: 38.5, status: "En Tránsito" },
    { id: "#045", date: "Hoy (16/9/26)", time: "13:40", address: "Calle Corrida, 28", distance: "2,1 km", price: 42.0, status: "Entregado" },
    { id: "#041", date: "Hoy (16/9/26)", time: "12:55", address: "Paseo de Begoña, 14", distance: "1,4 km", price: 21.5, status: "Entregado" },
    { id: "#038", date: "Ayer (15/9/26)", time: "19:20", address: "Calle Uría, 12, Bajo D", distance: "1,8 km", price: 29.9, status: "Entregado" },
    { id: "#032", date: "Ayer (15/9/26)", time: "14:05", address: "Calle Corrida, 5", distance: "0,9 km", price: 18.2, status: "Entregado" },
    { id: "#025", date: "Lun (14/9/26)", time: "20:15", address: "Plaza del Humedal, 3", distance: "2,4 km", price: 33.4, status: "Entregado" },
]);

const columns = "grid-cols-[80px_120px_70px_1fr_90px_90px_110px]";
</script>

<template>
    <div>
        <header class="mb-8">
            <h1 class="font-headline text-6xl text-primary">Mis Entregas</h1>
            <p class="font-body text-sm text-outline mt-1">Historial completo de tus servicios</p>
        </header>

        <section class="flex flex-col gap-3">
            <h2 class="flex items-center gap-2 font-ui text-sm font-semibold uppercase tracking-caps text-outline">
                <Truck class="w-4 h-4" aria-hidden="true" />
                Todos los Pedidos
            </h2>

            <div :class="columns"
                class="hidden md:grid gap-2 px-3 font-ui text-sm font-semibold uppercase tracking-caps text-primary text-center">
                <span>Pedido</span>
                <span>Fecha</span>
                <span>Hora</span>
                <span>Dirección</span>
                <span>Distancia</span>
                <span>Precio</span>
                <span>Estado</span>
            </div>

            <div v-for="order in orders" :key="order.id" :class="columns"
                class="bg-surface-container-lowest rounded-xl p-3 border border-primary/50 shadow-sm grid grid-cols-2 md:grid gap-2 items-center text-center">
                <span class="font-headline text-3xl font-black text-black">{{ order.id }}</span>
                <span class="font-body text-sm font-bold text-on-surface">{{ order.date }}</span>
                <span class="font-body text-sm font-bold text-on-surface">{{ order.time }}</span>
                <span class="font-body text-sm font-bold text-on-surface col-span-2 md:col-span-1">{{ order.address
                }}</span>
                <span class="font-body text-sm font-bold text-on-surface">{{ order.distance }}</span>
                <span class="font-body text-sm font-bold text-on-surface">{{ formatCurrency(order.price) }}</span>
                <span
                    class="justify-self-center bg-primary-container text-on-primary-container font-ui text-xs font-bold px-2 py-0.5 rounded-full">
                    {{ order.status }}
                </span>
            </div>
        </section>
    </div>
</template>