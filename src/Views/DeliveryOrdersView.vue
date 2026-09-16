<script setup>
import { Truck } from "lucide-vue-next";
import { formatCurrency } from "../utils/formatCurrency";
import { allOrders } from "../composables/useDeliveryState";

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

            <div v-for="order in allOrders" :key="order.id" :class="columns"
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