import { formatCurrency } from "@/lib/currency"

export default function FinancialBlock({ fipe, price }) {
  const margin = fipe - price
  const percentage = fipe > 0 ? ((margin / fipe) * 100).toFixed(1) : 0

  return (
    <section className="rounded-2xl border border-white/10 bg-zinc-900 p-4">
      <h2 className="mb-4 text-lg font-semibold text-white">Bloco financeiro</h2>

      <div className="space-y-3 text-sm">
        <div className="flex items-center justify-between">
          <span className="text-zinc-400">FIPE</span>
          <span className="font-medium text-white">{formatCurrency(fipe)}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-zinc-400">Investimento</span>
          <span className="font-medium text-white">{formatCurrency(price)}</span>
        </div>

        <div className="flex items-center justify-between rounded-xl bg-green-500/10 px-3 py-2">
          <span className="text-green-300">Margem estimada</span>
          <span className="font-semibold text-green-400">
            {formatCurrency(margin)} ({percentage}%)
          </span>
        </div>
      </div>
    </section>
  )
}