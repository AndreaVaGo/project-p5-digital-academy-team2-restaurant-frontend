<script setup>
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import { LayoutGrid, Truck, LogOut, Bike, Menu, X } from "lucide-vue-next";

const router = useRouter();

const navItems = [
    { name: "delivery-dashboard", label: "Dashboard", icon: LayoutGrid },
    { name: "delivery-orders", label: "Mis entregas", icon: Truck },
];

const mobileMenuOpen = ref(false);

function closeMenu() {
    mobileMenuOpen.value = false;
}

watch(() => router.currentRoute.value.fullPath, closeMenu);

function logout() {
    closeMenu();
    router.push({ name: "login" });
}
</script>

<template>
    <div class="min-h-screen flex bg-surface-container">
        <div
            class="md:hidden fixed top-0 left-0 right-0 z-30 bg-surface-container-lowest border-b border-outline-variant/30 flex items-center justify-between px-4 py-3">
            <div class="flex items-center gap-2">
                <Bike class="w-5 h-5 text-primary" />
                <h1 class="font-headline text-xl text-primary">Goxu Delivery</h1>
            </div>
            <button type="button" @click="mobileMenuOpen = !mobileMenuOpen" class="p-2">
                <Menu v-if="!mobileMenuOpen" class="w-6 h-6 text-on-surface" />
                <X v-else class="w-6 h-6 text-on-surface" />
            </button>
        </div>

        <div v-if="mobileMenuOpen" @click="closeMenu" class="md:hidden fixed inset-0 bg-black/40 z-20"></div>

        <aside
            class="w-64 shrink-0 bg-surface-container-lowest flex flex-col justify-between p-6 border-r border-outline-variant/30 fixed inset-y-0 left-0 z-30 transition-transform duration-200 md:relative md:translate-x-0"
            :class="mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'">
            <div>
                <div class="hidden md:flex items-center gap-2">
                    <Bike class="w-5 h-5 text-primary" />
                    <h1 class="font-headline text-xl text-primary">Goxu Delivery</h1>
                </div>
                <span
                    class="inline-block mt-2 bg-primary-container text-on-primary-container font-ui text-xs font-semibold uppercase px-3 py-1 rounded-full">
                    Repartidor
                </span>
                <p class="font-ui text-xs text-outline mt-2">Servicio de Entregas</p>

                <nav class="mt-10 flex flex-col gap-1">
                    <RouterLink v-for="item in navItems" :key="item.name" :to="{ name: item.name }" @click="closeMenu"
                        class="flex items-center gap-3 px-4 py-3 rounded-lg font-ui font-semibold text-on-surface-variant transition-colors"
                        exact-active-class="bg-primary-container text-on-primary-container">
                        <component :is="item.icon" class="w-4 h-4" />
                        {{ item.label }}
                    </RouterLink>
                </nav>
            </div>

            <button @click="logout" class="flex items-center gap-2 font-ui text-sm font-semibold text-error">
                <LogOut class="w-4 h-4" />
                Cerrar sesión
            </button>
        </aside>

        <main class="flex-1 p-4 md:p-8 mt-14 md:mt-0">
            <RouterView />
        </main>
    </div>
</template>