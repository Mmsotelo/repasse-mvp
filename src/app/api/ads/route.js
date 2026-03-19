import { NextResponse } from "next/server"
import { readAds, writeAds } from "@/lib/file-db"

export async function GET() {
  const items = await readAds()

  return NextResponse.json({
    total: items.length,
    items,
  })
}

export async function POST(request) {
  const body = await request.json()
  const items = await readAds()

  const newItem = {
    ...body,
    id: body.id || Date.now().toString(),
    updatedAt: new Date().toISOString(),
  }

  const nextItems = [newItem, ...items]
  await writeAds(nextItems)

  return NextResponse.json({
    ok: true,
    item: newItem,
  })
}