import fs from "fs/promises"
import path from "path"

const DB_PATH = path.join(process.cwd(), "src", "data", "generated-ads.json")

export async function readAds() {
  try {
    const raw = await fs.readFile(DB_PATH, "utf-8")
    return JSON.parse(raw || "[]")
  } catch {
    return []
  }
}

export async function writeAds(items) {
  await fs.writeFile(DB_PATH, JSON.stringify(items, null, 2), "utf-8")
}

export async function getAdById(id) {
  const items = await readAds()
  return items.find((item) => item.id === id)
}

export async function getAdBySlug(slug) {
  const items = await readAds()
  return items.find((item) => item.slug === slug)
}