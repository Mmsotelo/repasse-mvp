import { formatCurrency } from "@/lib/currency"
import { parseCurrencyInput, parseList } from "@/lib/parsers"
import { slugify } from "@/lib/slug"

export function buildVehicleObject(form) {
  const slug = `${slugify(form.model)}-${slugify(form.year)}-${slugify(form.store)}-${slugify(form.plate || form.code)}`

  return {
    id: form.id || "",
    slug,
    code: form.code || form.plate,
    title: `${form.model} ${form.year} | Repasse`,
    store: form.store,

    headline: form.headline || "",
    callout: form.callout || "",
    previousPrice: parseCurrencyInput(form.previousPrice),
    note: form.note || "",

    model: form.model,
    year: form.year,
    km: form.km,
    transmission: form.transmission,
    fuel: form.fuel,
    plate: form.plate,

    fipe: parseCurrencyInput(form.fipe),
    price: parseCurrencyInput(form.price),

    options: parseList(form.options),
    positives: parseList(form.positives),
    attention: parseList(form.attention),

    negotiator: {
      name: form.negotiatorName,
      phone: String(form.negotiatorPhone || "").replace(/\D/g, ""),
    },

    coverImage: form.coverImage,
    images: [form.coverImage],

    evaluationUntil: form.evaluationUntil,
  }
}

export function buildWhatsAppAd(vehicle) {
  const positives = vehicle.positives.map((item) => `✅ ${item}`).join("\n")
  const attention = vehicle.attention.map((item) => `❌ ${item}`).join("\n")
  const previousPriceBlock =
    vehicle.previousPrice > 0 ? `\n❌ DE: ${formatCurrency(vehicle.previousPrice)}` : ""
  const calloutBlock = vehicle.callout ? `\n🔥 ${vehicle.callout}` : ""
  const noteBlock = vehicle.note ? `\n📝 ${vehicle.note}` : ""

  return `🚘 ${vehicle.store}

🚗 ${vehicle.model}

———————————

📅 ANO/MOD: ${vehicle.year}
🕧 KM: ${vehicle.km}
⛽ ${vehicle.fuel}
🕹️ CÂMBIO: ${vehicle.transmission}
🛣 PLACA: ${vehicle.plate}

———————————

${positives}

———————————

🛠️ GASTOS:

${attention}

———————————

💰 FIPE: ${formatCurrency(vehicle.fipe)}${previousPriceBlock}

📈 INVESTIMENTO: ${formatCurrency(vehicle.price)}${calloutBlock}${noteBlock}

———————————

📞 ATENDIMENTO LOJISTA

Gestor ${vehicle.negotiator.name}
📲 ${vehicle.negotiator.phone}`
}

export function buildShortShareText(vehicle, baseUrl = "") {
  const link = baseUrl ? `${baseUrl}/carro/${vehicle.slug}` : `/carro/${vehicle.slug}`

  return `${vehicle.headline || `🚗 ${vehicle.model} ${vehicle.year}`}

FIPE: ${formatCurrency(vehicle.fipe)}
INVESTIMENTO: ${formatCurrency(vehicle.price)}

👉 Veja detalhes e faça proposta:
${link}`
}