import { NextResponse } from "next/server"
import { readAds, writeAds } from "@/lib/file-db"

export async function PUT(request, { params }) {
  const { id } = await params
  const body = await request.json()
  const items = await readAds()

  const nextItems = items.map((item) =>
    item.id === id
      ? {
          ...body,
          id,
          updatedAt: new Date().toISOString(),
        }
      : item
  )

  await writeAds(nextItems)

  const updated = nextItems.find((item) => item.id === id)

  return NextResponse.json({
    ok: true,
    item: updated,
  })
}

export async function DELETE(_, { params }) {
  const { id } = await params
  const items = await readAds()

  const nextItems = items.filter((item) => item.id !== id)
  await writeAds(nextItems)

  return NextResponse.json({
    ok: true,
  })
}