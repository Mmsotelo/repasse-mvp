export default function AttentionList({ items, title = "Pontos de atenção" }) {
  return (
    <section className="rounded-2xl border border-red-500/20 bg-zinc-900 p-4">
      <h2 className="mb-3 text-lg font-semibold text-white">{title}</h2>
      <ul className="space-y-2 text-sm text-red-200">
        {items.map((item, index) => (
          <li key={index} className="rounded-xl bg-red-500/10 px-3 py-2">
            {item}
          </li>
        ))}
      </ul>
    </section>
  )
}