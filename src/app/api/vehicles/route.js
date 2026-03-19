import { NextResponse } from "next/server"
import { vehicles } from "@/data/vehicles"

export async function GET() {
  return NextResponse.json({
    total: vehicles.length,
    items: vehicles,
  })
}