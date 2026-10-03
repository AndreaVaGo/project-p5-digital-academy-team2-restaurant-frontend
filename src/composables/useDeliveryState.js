import { ref } from "vue";
import {
  getReadyOrders,
  getOrdersOnTheWay,
  getDeliveredOrders,
  startDelivery,
  completeDelivery,
} from "../services/deliveryService";

export const currentService = ref(null);
export const availableService = ref(null);
export const allOrders = ref([]);

export const loading = ref(false);
export const error = ref(null);

function adaptOrder(order) {
  return {
    id: order.id,
    price: Number(order.total),
    customerName: order.userName,
    status: order.status,
    paid: order.paid,
    createdAt: order.createdAt,
    tableNumber: order.tableNumber,
    items: order.items ?? [],
  };
}

export async function loadDeliveryState() {
  loading.value = true;
  error.value = null;

  try {
    const [readyOrders, onTheWayOrders, deliveredOrders] =
      await Promise.all([
        getReadyOrders(),
        getOrdersOnTheWay(),
        getDeliveredOrders(),
      ]);

    availableService.value = readyOrders.length
      ? adaptOrder(readyOrders[0])
      : null;

    currentService.value = onTheWayOrders.length
      ? adaptOrder(onTheWayOrders[0])
      : null;

    allOrders.value = deliveredOrders.map(adaptOrder);
  } catch (err) {
    error.value = err;
  } finally {
    loading.value = false;
  }
}

export async function acceptOrder() {
  if (!availableService.value) return;

  loading.value = true;
  error.value = null;

  try {
    const updatedOrder = await startDelivery(availableService.value.id);

    currentService.value = adaptOrder(updatedOrder);
    availableService.value = null;
  } catch (err) {
    error.value = err;
  } finally {
    loading.value = false;
  }
}

export async function deliverOrder() {
  if (!currentService.value) return;

  loading.value = true;
  error.value = null;

  try {
    const updatedOrder = await completeDelivery(currentService.value.id);

    const deliveredOrder = adaptOrder(updatedOrder);

    allOrders.value.unshift(deliveredOrder);
    currentService.value = null;
  } catch (err) {
    error.value = err;
  } finally {
    loading.value = false;
  }
}

export function rejectOrder() {
  availableService.value = null;
}