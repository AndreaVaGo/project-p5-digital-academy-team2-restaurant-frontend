<script setup>
</script>

<template>
    <div>
        <header class="mb-8">
            <h1 class="font-headline text-3xl text-on-surface">Panel del Repartidor</h1>
            <p class="font-body text-sm text-outline mt-1">
                Gijón &amp; Oviedo • Turno activo (12:00 - 16:30)
            </p>
        </header>

        <div class="grid gap-6 lg:grid-cols-[1fr_360px]">
            <div class="flex flex-col gap-6">
                <section>
                    <h2 class="font-ui text-xs font-semibold uppercase tracking-caps text-outline mb-3">
                        Servicio Actual en Curso
                    </h2>
                </section>

                <section>
                    <h2 class="font-ui text-xs font-semibold uppercase tracking-caps text-outline mb-3">
                        Servicios Disponibles
                    </h2>
                </section>

                <section>
                    <h2 class="font-ui text-xs font-semibold uppercase tracking-caps text-outline mb-3">
                        Historial Reciente (Hoy)
                    </h2>
                </section>
            </div>

            <aside class="bg-surface-container-lowest rounded-xl p-4">
                <h2 class="font-ui text-xs font-semibold uppercase tracking-caps text-outline">
                    Ruta Activa
                </h2>
            </aside>
        </div>
    </div>
</template>