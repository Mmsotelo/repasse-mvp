export function buildWhatsAppUrl(vehicle) {
  const message = `Olá, tenho interesse no ${vehicle.model} ${vehicle.year} (cód: ${vehicle.code}).`
  return `https://wa.me/${vehicle.negotiator.phone}?text=${encodeURIComponent(message)}`
}