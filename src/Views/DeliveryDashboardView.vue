<script setup>
import { AlertTriangle, Bell, History, Map } from "lucide-vue-next";
</script>

<template>
    <div>
        <header class="mb-8">
            <h1 class="font-headline text-6xl text-primary">Panel de Repartidor</h1>
            <p class="font-body text-sm text-outline mt-1">
                Gijón &amp; Oviedo • Turno activo (12:00 - 16:30)
            </p>
        </header>

        <div class="grid gap-6 lg:grid-cols-[1fr_360px]">
            <div class="flex flex-col gap-6">
                <section class="bg-surface-container-lowest rounded-xl p-4">
                    <h2
                        class="flex items-center gap-2 font-ui text-xs font-semibold uppercase tracking-caps text-outline">
                        <AlertTriangle class="w-4 h-4" aria-hidden="true" />
                        Servicio Actual en Curso
                    </h2>
                </section>

                <section class="bg-surface-container-lowest rounded-xl p-4">
                    <h2
                        class="flex items-center gap-2 font-ui text-xs font-semibold uppercase tracking-caps text-outline">
                        <Bell class="w-4 h-4" aria-hidden="true" />
                        Servicios Disponibles
                    </h2>
                </section>

                <section class="bg-surface-container-lowest rounded-xl p-4">
                    <h2
                        class="flex items-center gap-2 font-ui text-xs font-semibold uppercase tracking-caps text-outline">
                        <History class="w-4 h-4" aria-hidden="true" />
                        Historial Reciente (Hoy)
                    </h2>
                </section>
            </div>

            <aside class="bg-surface-container-lowest rounded-xl p-4">
                <h2 class="flex items-center gap-2 font-ui text-xs font-semibold uppercase tracking-caps text-outline">
                    <Map class="w-4 h-4" aria-hidden="true" />
                    Ruta Activa
                </h2>
            </aside>
        </div>
    </div>
</template>