<script setup>
import { LayoutGrid, Truck, LogOut, Bike } from "lucide-vue-next";

const navItems = [
    { name: "delivery-dashboard", label: "Dashboard", icon: LayoutGrid },
    { name: "delivery-orders", label: "Mis entregas", icon: Truck },
];
</script>

<template>
    <div class="min-h-screen flex bg-[#7c8874]">
        <aside
            class="w-64 shrink-0 bg-surface-container-lowest flex flex-col justify-between p-6 border-r border-outline-variant/30">
            <div>
                <div class="flex items-center gap-2">
                    <Bike class="w-5 h-5 text-primary" />
                    <h1 class="font-headline text-xl text-primary">Goxu Delivery</h1>
                </div>
                <span
                    class="inline-block mt-2 bg-primary-container text-on-primary-container font-ui text-xs font-semibold uppercase px-3 py-1 rounded-full">
                    Repartidor
                </span>
                <p class="font-ui text-xs text-outline mt-2">Servicio de Entregas</p>

                <nav class="mt-10 flex flex-col gap-1">
                    <RouterLink v-for="item in navItems" :key="item.name" :to="{ name: item.name }"
                        class="flex items-center gap-3 px-4 py-3 rounded-lg font-ui font-semibold text-on-surface-variant transition-colors"
                        exact-active-class="bg-primary-container text-on-primary-container">
                        <component :is="item.icon" class="w-4 h-4" />
                        {{ item.label }}
                    </RouterLink>
                </nav>
            </div>

            <button class="flex items-center gap-2 font-ui text-sm font-semibold text-error">
                <LogOut class="w-4 h-4" />
                Cerrar sesión
            </button>
        </aside>

        <main class="flex-1 p-4 md:p-8">
            <RouterView />
        </main>
    </div>
</template>