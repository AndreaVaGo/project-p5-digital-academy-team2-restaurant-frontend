import { ref } from "vue";

function formatToday() {
    const now = new Date();
    return `Hoy (${now.getDate()}/${now.getMonth() + 1}/${String(now.getFullYear()).slice(-2)})`;
}

export const currentService = ref({
    id: "#047",
    price: 38.5,
    paymentMethod: "Tarjeta (Pagado)",
    establishment: "Gochu Centro (Calle Mayor, 15)",
    customerName: "Carmen Alonso",
    customerAddress: "Av. de la Constitución, 45, 3ºB",
    customerPhone: "+34 600 123 456",
    items: [
        { name: "Bocadillo de calamares", quantity: 2 },
        { name: "Ración de croquetas caseras", quantity: 1 },
        { name: "Sidra natural (botella)", quantity: 1 },
    ],
});

export const availableService = ref({
    id: "#048",
    price: 29.9,
    paymentMethod: "Efectivo (Pagar al recibir)",
    establishmentName: "Gochu Centro",
    pickupAddress: "Calle Mayor, 15 · 33206 Gijón, Asturias",
    pickupNote: "Recoger el pedido preparado en Gochu Centro",
    customerName: "Laura Fernández",
    customerAddress: "Calle Uría, 12, Bajo D",
    customerPhone: "+34 622 987 654",
    distance: "1,8 km",
    prepTime: "Listo en 5 min",
    type: "A domicilio",
    items: [
        { name: "Fabada asturiana", quantity: 1 },
        { name: "Pan de sidra", quantity: 2 },
    ],
});

export const allOrders = ref([
    { id: "#045", date: "Hoy (16/9/26)", time: "13:40", address: "Calle Corrida, 28", distance: "2,1 km", price: 42.0, status: "Entregado" },
    { id: "#041", date: "Hoy (16/9/26)", time: "12:55", address: "Paseo de Begoña, 14", distance: "1,4 km", price: 21.5, status: "Entregado" },
    { id: "#038", date: "Ayer (15/9/26)", time: "19:20", address: "Calle Uría, 12, Bajo D", distance: "1,8 km", price: 29.9, status: "Entregado" },
    { id: "#032", date: "Ayer (15/9/26)", time: "14:05", address: "Calle Corrida, 5", distance: "0,9 km", price: 18.2, status: "Entregado" },
    { id: "#025", date: "Lun (14/9/26)", time: "20:15", address: "Plaza del Humedal, 3", distance: "2,4 km", price: 33.4, status: "Entregado" },
]);

export function acceptOrder() {
    if (!availableService.value) return;

    if (!currentService.value) {
        currentService.value = {
            id: availableService.value.id,
            price: availableService.value.price,
            paymentMethod: availableService.value.paymentMethod,
            establishment: `${availableService.value.establishmentName} (${availableService.value.pickupAddress})`,
            customerName: availableService.value.customerName,
            customerAddress: availableService.value.customerAddress,
            customerPhone: availableService.value.customerPhone,
            items: availableService.value.items,
        };
    }

    availableService.value = null;
}

export function rejectOrder() {
    availableService.value = null;
}

export function deliverOrder(remainingDistance) {
    if (!currentService.value) return;

    const now = new Date();
    const time = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;

    allOrders.value.unshift({
        id: currentService.value.id,
        date: formatToday(),
        time,
        address: currentService.value.customerAddress,
        distance: remainingDistance ?? "—",
        price: currentService.value.price,
        status: "Entregado",
    });

    currentService.value = null;
}