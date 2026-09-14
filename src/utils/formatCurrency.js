export function formatCurrency(value) {
  return value.toLocaleString('es-ES', { minimumFractionDigits: 2 }) + ' €'
}