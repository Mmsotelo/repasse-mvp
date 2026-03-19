export default function InfoGrid({ vehicle }) {
  return (
    <section className="grid grid-cols-2 gap-3 rounded-2xl border border-white/10 bg-zinc-900 p-4 text-sm">
      <div>
        <p className="text-zinc-400">Modelo</p>
        <p className="font-medium text-white">{vehicle.model}</p>
      </div>

      <div>
        <p className="text-zinc-400">Ano/Modelo</p>
        <p className="font-medium text-white">{vehicle.year}</p>
      </div>

      <div>
        <p className="text-zinc-400">KM</p>
        <p className="font-medium text-white">{vehicle.km}</p>
      </div>

      <div>
        <p className="text-zinc-400">Câmbio</p>
        <p className="font-medium text-white">{vehicle.transmission}</p>
      </div>

      <div>
        <p className="text-zinc-400">Combustível</p>
        <p className="font-medium text-white">{vehicle.fuel}</p>
      </div>

      <div>
        <p className="text-zinc-400">Placa</p>
        <p className="font-medium text-white">{vehicle.plate}</p>
      </div>
    </section>
  )
}