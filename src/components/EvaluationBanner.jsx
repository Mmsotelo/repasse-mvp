export default function EvaluationBanner({ until }) {
  return (
    <div className="mb-4 rounded-2xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-200">
      Versão em avaliação até {until}
    </div>
  )
}