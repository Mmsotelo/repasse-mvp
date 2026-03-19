import Link from "next/link"
import { vehicles } from "@/data/vehicles"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-zinc-950 px-4 py-10 text-white">
      <div className="mx-auto max-w-md">
        <p className="text-sm text-zinc-400">VAAPTY Repasse MVP</p>
        <h1 className="mt-2 text-3xl font-bold">Links públicos por veículo</h1>
        <p className="mt-3 text-sm text-zinc-300">
          Estrutura inicial do MVP para repasse com página individual e proposta via WhatsApp.
        </p>

        <div className="mt-8 space-y-3">
          {vehicles.map((vehicle) => (
            <Link
              key={vehicle.slug}
              href={`/carro/${vehicle.slug}`}
              className="block rounded-2xl border border-white/10 bg-zinc-900 p-4"
            >
              <p className="font-semibold text-white">{vehicle.title}</p>
              <p className="mt-1 text-sm text-zinc-400">Cód. {vehicle.code}</p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}