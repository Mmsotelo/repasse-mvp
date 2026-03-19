export function parseCurrencyInput(value) {
  const clean = String(value || "")
    .replace(/\./g, "")
    .replace(",", ".")
    .replace(/[^\d.]/g, "")

  return Number(clean || 0)
}

export function parseList(value) {
  return String(value || "")
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean)
}