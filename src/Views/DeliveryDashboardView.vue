<script setup>
import { ref } from "vue";
import { Store, MapPin, Eye, CheckCircle, AlertTriangle, Bell, History, Map, Handshake } from "lucide-vue-next";
import { formatCurrency } from "../utils/formatCurrency";

const currentService = ref({
    id: "#047",
    price: 38.5,
    paymentMethod: "Tarjeta (Pagado)",
    establishment: "Gochu Centro (Calle Mayor, 15)",
    customerName: "Carmen Alonso",
    customerAddress: "Av. de la Constitución, 45, 3ºB",
    customerPhone: "+34 600 123 456",
});

const availableService = ref({
    id: "#048",
    price: 29.9,
    establishment: "Gochu Centro (Calle Mayor, 15)",
    customerAddress: "Calle Uría, 12, Bajo D",
    distance: "1,8 km",
    prepTime: "Listo en 5 min",
});
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
                <section class="bg-surface-container-lowest rounded-xl p-4 flex flex-col gap-4">
                    <h2
                        class="flex items-center gap-2 font-ui text-xs font-semibold uppercase tracking-caps text-outline">
                        <AlertTriangle class="w-4 h-4" aria-hidden="true" />
                        Servicio Actual en Curso
                    </h2>

                    <div class="flex items-start justify-between">
                        <div>
                            <span
                                class="inline-block bg-primary-container text-on-primary-container font-ui text-xs font-semibold uppercase px-3 py-1 rounded-full mb-2">
                                En Tránsito
                            </span>
                            <h3 class="font-headline text-lg text-on-surface">Pedido {{ currentService.id }}</h3>
                        </div>
                        <div class="text-right">
                            <p class="font-headline text-xl text-on-surface">{{ formatCurrency(currentService.price)
                            }}</p>
                            <p class="font-body text-xs text-outline">{{ currentService.paymentMethod }}</p>
                        </div>
                    </div>

                    <div class="bg-surface-container rounded-lg p-3 flex flex-col gap-3">
                        <div class="flex items-start gap-2">
                            <Store class="w-4 h-4 shrink-0 mt-0.5" aria-hidden="true" />
                            <div>
                                <p class="font-ui text-xs font-semibold uppercase text-outline">Establecimiento</p>
                                <p class="font-body text-sm text-on-surface">{{ currentService.establishment }}</p>
                            </div>
                        </div>
                        <div class="flex items-start gap-2">
                            <MapPin class="w-4 h-4 shrink-0 mt-0.5" aria-hidden="true" />
                            <div>
                                <p class="font-ui text-xs font-semibold uppercase text-outline">Destino</p>
                                <p class="font-body text-sm text-on-surface">
                                    {{ currentService.customerName }} — {{ currentService.customerAddress }}
                                </p>
                                <p class="font-body text-sm text-outline">Teléfono: {{ currentService.customerPhone
                                }}</p>
                            </div>
                        </div>
                    </div>

                    <div class="flex gap-3">
                        <button type="button"
                            class="flex-2 flex items-center justify-center gap-2 rounded-full bg-primary text-surface-container-lowest font-ui text-sm font-semibold uppercase py-2">
                            <Eye class="w-4 h-4" aria-hidden="true" />
                            Ver Pedido
                        </button>
                        <button type="button"
                            class="flex-1 flex items-center justify-center gap-2 rounded-full bg-primary-container text-on-primary-container font-ui text-sm font-semibold uppercase py-2">
                            <CheckCircle class="w-4 h-4" aria-hidden="true" />
                            Entregar
                        </button>
                    </div>
                </section>

                <section class="bg-surface-container-lowest rounded-xl p-4 flex flex-col gap-4">
                    <h2
                        class="flex items-center gap-2 font-ui text-xs font-semibold uppercase tracking-caps text-outline">
                        <Bell class="w-4 h-4" aria-hidden="true" />
                        Servicios Disponibles
                    </h2>

                    <div class="bg-surface-container rounded-lg p-3 flex flex-col gap-3">
                        <div class="flex items-start justify-between">
                            <span
                                class="inline-block bg-primary-container text-on-primary-container font-ui text-xs font-semibold uppercase px-3 py-1 rounded-full">
                                Nuevo Servicio Asignado
                            </span>
                            <p class="font-headline text-lg text-on-surface">{{ formatCurrency(availableService.price)
                            }}</p>
                        </div>

                        <p class="font-headline text-lg text-on-surface">Pedido {{ availableService.id }}</p>

                        <div class="flex items-center gap-2 font-body text-sm text-on-surface">
                            <Store class="w-4 h-4 shrink-0" aria-hidden="true" />
                            <span>{{ availableService.establishment }}</span>
                            <MapPin class="w-4 h-4 shrink-0" aria-hidden="true" />
                            <span>{{ availableService.customerAddress }}</span>
                        </div>
                        <p class="font-body text-xs text-outline">
                            Distancia: {{ availableService.distance }} • Prep: {{ availableService.prepTime }}
                        </p>

                        <button type="button"
                            class="flex items-center justify-center gap-2 rounded-lg bg-surface-container-high text-on-surface font-ui text-sm font-semibold uppercase py-2">
                            <Handshake class="w-4 h-4 text-primary" aria-hidden="true" />
                            Gestionar / Aceptar
                        </button>
                    </div>
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