export default function HighlightsList({ items, title = "Pontos positivos" }) {
  return (
    <section className="rounded-2xl border border-white/10 bg-zinc-900 p-4">
      <h2 className="mb-3 text-lg font-semibold text-white">{title}</h2>
      <ul className="space-y-2 text-sm text-zinc-200">
        {items.map((item, index) => (
          <li key={index} className="rounded-xl bg-white/5 px-3 py-2">
            {item}
          </li>
        ))}
      </ul>
    </section>
  )
}