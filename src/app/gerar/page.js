"use client"

import { useMemo, useState } from "react"

function slugify(text) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
}

function parseCurrency(value) {
  const clean = value.replace(/\./g, "").replace(",", ".").replace(/[^\d.]/g, "")
  return Number(clean || 0)
}

function parseList(value) {
  return value
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean)
}

export default function GerarPage() {
  const [form, setForm] = useState({
    store: "Vaapty Bragança Paulista",
    model: "VW/Polo 1.6",
    year: "2010/2011",
    km: "319.982",
    transmission: "Manual",
    fuel: "Flex",
    plate: "E****9",
    fipe: "35.976,00",
    price: "23.976,00",
    negotiatorName: "Jonathan",
    negotiatorPhone: "5511915723724",
    coverImage: "/cars/polo.png",
    positives: `IPVA 26 aberto
Suspensão ok
Motor feito (com nota)
Câmbio ok
Ar gelando
Interna boa
2 pneus bons`,
    attention: `4/5 peças pintura
2 pneus ruins
Parabrisa trincado
Volante gasto`,
    options: "",
    evaluationUntil: "2026-03-31",
  })

  function updateField(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const generated = useMemo(() => {
    const slug = `${slugify(form.model)}-${slugify(form.year)}-${slugify(form.store)}-${slugify(form.plate)}`
    const title = `${form.model} ${form.year} | Repasse`

    const obj = {
      slug,
      code: form.plate,
      title,
      store: form.store,

      model: form.model,
      year: form.year,
      km: form.km,
      transmission: form.transmission,
      fuel: form.fuel,
      plate: form.plate,

      fipe: parseCurrency(form.fipe),
      price: parseCurrency(form.price),

      options: parseList(form.options),
      positives: parseList(form.positives),
      attention: parseList(form.attention),

      negotiator: {
        name: form.negotiatorName,
        phone: form.negotiatorPhone,
      },

      coverImage: form.coverImage,
      images: [form.coverImage],

      evaluationUntil: form.evaluationUntil,
    }

    return JSON.stringify(obj, null, 2)
  }, [form])

  return (
    <main className="min-h-screen bg-zinc-950 px-4 py-8 text-white">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-3xl font-bold">Gerador de anúncio</h1>
        <p className="mt-2 text-sm text-zinc-400">
          Preencha os dados, gere o objeto e cole em <code>vehicles.js</code>.
        </p>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <section className="space-y-4 rounded-2xl border border-white/10 bg-zinc-900 p-4">
            <input className="w-full rounded-xl bg-zinc-800 px-3 py-2" value={form.store} onChange={(e) => updateField("store", e.target.value)} placeholder="Loja" />
            <input className="w-full rounded-xl bg-zinc-800 px-3 py-2" value={form.model} onChange={(e) => updateField("model", e.target.value)} placeholder="Modelo" />
            <input className="w-full rounded-xl bg-zinc-800 px-3 py-2" value={form.year} onChange={(e) => updateField("year", e.target.value)} placeholder="Ano/Modelo" />
            <input className="w-full rounded-xl bg-zinc-800 px-3 py-2" value={form.km} onChange={(e) => updateField("km", e.target.value)} placeholder="KM" />
            <input className="w-full rounded-xl bg-zinc-800 px-3 py-2" value={form.transmission} onChange={(e) => updateField("transmission", e.target.value)} placeholder="Câmbio" />
            <input className="w-full rounded-xl bg-zinc-800 px-3 py-2" value={form.fuel} onChange={(e) => updateField("fuel", e.target.value)} placeholder="Combustível" />
            <input className="w-full rounded-xl bg-zinc-800 px-3 py-2" value={form.plate} onChange={(e) => updateField("plate", e.target.value)} placeholder="Placa" />
            <input className="w-full rounded-xl bg-zinc-800 px-3 py-2" value={form.fipe} onChange={(e) => updateField("fipe", e.target.value)} placeholder="FIPE" />
            <input className="w-full rounded-xl bg-zinc-800 px-3 py-2" value={form.price} onChange={(e) => updateField("price", e.target.value)} placeholder="Investimento" />
            <input className="w-full rounded-xl bg-zinc-800 px-3 py-2" value={form.negotiatorName} onChange={(e) => updateField("negotiatorName", e.target.value)} placeholder="Nome do negociador" />
            <input className="w-full rounded-xl bg-zinc-800 px-3 py-2" value={form.negotiatorPhone} onChange={(e) => updateField("negotiatorPhone", e.target.value)} placeholder="Telefone com DDI/DDC" />
            <input className="w-full rounded-xl bg-zinc-800 px-3 py-2" value={form.coverImage} onChange={(e) => updateField("coverImage", e.target.value)} placeholder="/cars/polo.png" />
            <input className="w-full rounded-xl bg-zinc-800 px-3 py-2" value={form.evaluationUntil} onChange={(e) => updateField("evaluationUntil", e.target.value)} placeholder="2026-03-31" />

            <textarea className="min-h-28 w-full rounded-xl bg-zinc-800 px-3 py-2" value={form.positives} onChange={(e) => updateField("positives", e.target.value)} placeholder="Um item por linha" />
            <textarea className="min-h-28 w-full rounded-xl bg-zinc-800 px-3 py-2" value={form.attention} onChange={(e) => updateField("attention", e.target.value)} placeholder="Um item por linha" />
            <textarea className="min-h-20 w-full rounded-xl bg-zinc-800 px-3 py-2" value={form.options} onChange={(e) => updateField("options", e.target.value)} placeholder="Opcionais, um por linha" />
          </section>

          <section className="rounded-2xl border border-white/10 bg-zinc-900 p-4">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Objeto gerado</h2>
              <button
                type="button"
                onClick={() => navigator.clipboard.writeText(generated)}
                className="rounded-xl bg-green-500 px-3 py-2 text-sm font-bold text-black"
              >
                Copiar
              </button>
            </div>

            <pre className="overflow-auto rounded-xl bg-black p-4 text-xs text-green-300">
              {generated}
            </pre>
          </section>
        </div>
      </div>
    </main>
  )
}