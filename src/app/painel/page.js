"use client"

import { useEffect, useMemo, useState } from "react"
import { buildShortShareText, buildVehicleObject, buildWhatsAppAd } from "@/lib/ad-generator"

const initialForm = {
  id: "",
  store: "Vaapty Bragança Paulista",
  headline: "",
  model: "VW/Polo 1.6",
  year: "2010/2011",
  km: "319.982",
  transmission: "Manual",
  fuel: "Flex",
  plate: "E****9",
  code: "E****9",
  fipe: "35.976,00",
  previousPrice: "",
  price: "23.976,00",
  callout: "",
  note: "",
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
}

function Field({ value, onChange, placeholder }) {
  return (
    <input
      className="w-full rounded-xl bg-zinc-800 px-3 py-2 text-sm"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  )
}

export default function PainelPage() {
  const [form, setForm] = useState(initialForm)
  const [ads, setAds] = useState([])
  const [origin, setOrigin] = useState("")

  useEffect(() => {
    loadAds()
    if (typeof window !== "undefined") {
      setOrigin(window.location.origin)
    }
  }, [])

  async function loadAds() {
    const response = await fetch("/api/ads", { cache: "no-store" })
    const data = await response.json()
    setAds(data.items || [])
  }

  function updateField(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const previewVehicle = useMemo(() => buildVehicleObject(form), [form])
  const whatsappText = useMemo(() => buildWhatsAppAd(previewVehicle), [previewVehicle])
  const shortShareText = useMemo(() => buildShortShareText(previewVehicle, origin), [previewVehicle, origin])

  async function handleSave() {
    const payload = buildVehicleObject(form)

    if (form.id) {
      await fetch(`/api/ads/${form.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
    } else {
      const response = await fetch("/api/ads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      const data = await response.json()

      setForm((prev) => ({
        ...prev,
        id: data.item.id,
      }))
    }

    await loadAds()
  }

  function handleNew() {
    setForm(initialForm)
  }

  function handleEdit(item) {
    setForm({
      id: item.id || "",
      store: item.store || "",
      headline: item.headline || "",
      model: item.model || "",
      year: item.year || "",
      km: item.km || "",
      transmission: item.transmission || "",
      fuel: item.fuel || "",
      plate: item.plate || "",
      code: item.code || "",
      fipe: String(item.fipe || ""),
      previousPrice: item.previousPrice ? String(item.previousPrice) : "",
      price: String(item.price || ""),
      callout: item.callout || "",
      note: item.note || "",
      negotiatorName: item.negotiator?.name || "",
      negotiatorPhone: item.negotiator?.phone || "",
      coverImage: item.coverImage || "",
      positives: (item.positives || []).join("\n"),
      attention: (item.attention || []).join("\n"),
      options: (item.options || []).join("\n"),
      evaluationUntil: item.evaluationUntil || "",
    })
  }

  async function handleDelete(id) {
    await fetch(`/api/ads/${id}`, {
      method: "DELETE",
    })

    if (form.id === id) {
      setForm(initialForm)
    }

    await loadAds()
  }

  return (
    <main className="min-h-screen bg-zinc-950 px-4 py-8 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <p className="text-sm text-zinc-400">Painel mínimo local</p>
          <h1 className="text-3xl font-bold">Gerador de anúncios VAAPTY</h1>
          <p className="mt-2 text-sm text-zinc-400">
            Salva em JSON local. Bom para MVP e validação.
          </p>
        </div>

        <div className="grid gap-6 xl:grid-cols-[420px_1fr_420px]">
          <section className="space-y-3 rounded-2xl border border-white/10 bg-zinc-900 p-4">
            <h2 className="text-lg font-semibold">Cadastro</h2>

            <Field value={form.store} onChange={(e) => updateField("store", e.target.value)} placeholder="Loja" />
            <Field value={form.headline} onChange={(e) => updateField("headline", e.target.value)} placeholder="Headline opcional" />
            <Field value={form.model} onChange={(e) => updateField("model", e.target.value)} placeholder="Modelo" />
            <Field value={form.year} onChange={(e) => updateField("year", e.target.value)} placeholder="Ano/Modelo" />
            <Field value={form.km} onChange={(e) => updateField("km", e.target.value)} placeholder="KM" />
            <Field value={form.transmission} onChange={(e) => updateField("transmission", e.target.value)} placeholder="Câmbio" />
            <Field value={form.fuel} onChange={(e) => updateField("fuel", e.target.value)} placeholder="Combustível" />
            <Field value={form.plate} onChange={(e) => updateField("plate", e.target.value)} placeholder="Placa" />
            <Field value={form.code} onChange={(e) => updateField("code", e.target.value)} placeholder="Código" />
            <Field value={form.fipe} onChange={(e) => updateField("fipe", e.target.value)} placeholder="FIPE" />
            <Field value={form.previousPrice} onChange={(e) => updateField("previousPrice", e.target.value)} placeholder="Preço anterior opcional" />
            <Field value={form.price} onChange={(e) => updateField("price", e.target.value)} placeholder="Investimento" />
            <Field value={form.callout} onChange={(e) => updateField("callout", e.target.value)} placeholder="Ex: PRA FECHAR AGORA" />
            <Field value={form.note} onChange={(e) => updateField("note", e.target.value)} placeholder="Observação comercial opcional" />
            <Field value={form.negotiatorName} onChange={(e) => updateField("negotiatorName", e.target.value)} placeholder="Negociador" />
            <Field value={form.negotiatorPhone} onChange={(e) => updateField("negotiatorPhone", e.target.value)} placeholder="Telefone" />
            <Field value={form.coverImage} onChange={(e) => updateField("coverImage", e.target.value)} placeholder="/cars/polo.png" />
            <Field value={form.evaluationUntil} onChange={(e) => updateField("evaluationUntil", e.target.value)} placeholder="2026-03-31" />

            <textarea
              className="min-h-28 w-full rounded-xl bg-zinc-800 px-3 py-2 text-sm"
              value={form.positives}
              onChange={(e) => updateField("positives", e.target.value)}
              placeholder="Pontos positivos, um por linha"
            />

            <textarea
              className="min-h-28 w-full rounded-xl bg-zinc-800 px-3 py-2 text-sm"
              value={form.attention}
              onChange={(e) => updateField("attention", e.target.value)}
              placeholder="Gastos / pontos de atenção, um por linha"
            />

            <textarea
              className="min-h-20 w-full rounded-xl bg-zinc-800 px-3 py-2 text-sm"
              value={form.options}
              onChange={(e) => updateField("options", e.target.value)}
              placeholder="Opcionais, um por linha"
            />

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={handleSave}
                className="rounded-xl bg-green-500 px-4 py-3 font-bold text-black"
              >
                Salvar anúncio
              </button>

              <button
                type="button"
                onClick={handleNew}
                className="rounded-xl bg-zinc-700 px-4 py-3 font-bold text-white"
              >
                Novo
              </button>
            </div>
          </section>

          <section className="space-y-6">
            <div className="rounded-2xl border border-white/10 bg-zinc-900 p-4">
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-lg font-semibold">Saída gerada</h2>
                <span className="text-xs text-zinc-400">copie o que precisar</span>
              </div>

              <div className="space-y-4">
                <div className="rounded-xl bg-black p-4">
                  <p className="mb-2 text-sm font-semibold text-white">Slug</p>
                  <pre className="text-xs text-green-300">{previewVehicle.slug}</pre>
                </div>

                <div className="rounded-xl bg-black p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <p className="text-sm font-semibold text-white">Link final previsto</p>
                    <button
                      type="button"
                      onClick={() => navigator.clipboard.writeText(`${origin}/carro/${previewVehicle.slug}`)}
                      className="rounded-lg bg-zinc-800 px-2 py-1 text-xs"
                    >
                      Copiar
                    </button>
                  </div>
                  <pre className="text-xs text-green-300">{`${origin}/carro/${previewVehicle.slug}`}</pre>
                </div>

                <div className="rounded-xl bg-black p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <p className="text-sm font-semibold text-white">Texto WhatsApp padronizado</p>
                    <button
                      type="button"
                      onClick={() => navigator.clipboard.writeText(whatsappText)}
                      className="rounded-lg bg-zinc-800 px-2 py-1 text-xs"
                    >
                      Copiar
                    </button>
                  </div>
                  <pre className="max-h-80 overflow-auto whitespace-pre-wrap text-xs text-green-300">{whatsappText}</pre>
                </div>

                <div className="rounded-xl bg-black p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <p className="text-sm font-semibold text-white">Texto curto com link</p>
                    <button
                      type="button"
                      onClick={() => navigator.clipboard.writeText(shortShareText)}
                      className="rounded-lg bg-zinc-800 px-2 py-1 text-xs"
                    >
                      Copiar
                    </button>
                  </div>
                  <pre className="max-h-48 overflow-auto whitespace-pre-wrap text-xs text-green-300">{shortShareText}</pre>
                </div>

                <div className="rounded-xl bg-black p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <p className="text-sm font-semibold text-white">JSON gerado</p>
                    <button
                      type="button"
                      onClick={() => navigator.clipboard.writeText(JSON.stringify(previewVehicle, null, 2))}
                      className="rounded-lg bg-zinc-800 px-2 py-1 text-xs"
                    >
                      Copiar
                    </button>
                  </div>
                  <pre className="max-h-96 overflow-auto text-xs text-green-300">
                    {JSON.stringify(previewVehicle, null, 2)}
                  </pre>
                </div>
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-white/10 bg-zinc-900 p-4">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Registros locais</h2>
              <span className="text-xs text-zinc-400">{ads.length} anúncio(s)</span>
            </div>

            <div className="space-y-3">
              {ads.length === 0 && (
                <div className="rounded-xl border border-dashed border-white/10 p-4 text-sm text-zinc-400">
                  Nenhum anúncio salvo ainda.
                </div>
              )}

              {ads.map((ad) => (
                <div key={ad.id} className="rounded-2xl border border-white/10 bg-zinc-950 p-3">
                  <div className="mb-2 flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-white">{ad.headline || ad.model}</p>
                      <p className="text-xs text-zinc-400">{ad.store}</p>
                    </div>
                    <span className="rounded-full bg-white/10 px-2 py-1 text-[10px] text-zinc-300">
                      {ad.year}
                    </span>
                  </div>

                  <div className="space-y-1 text-xs text-zinc-300">
                    <p>Preço: R$ {ad.price}</p>
                    <p>FIPE: R$ {ad.fipe}</p>
                    <p>Slug: {ad.slug}</p>
                  </div>

                  <div className="mt-3 grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => handleEdit(ad)}
                      className="rounded-xl bg-zinc-800 px-3 py-2 text-xs font-bold text-white"
                    >
                      Editar
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(ad.id)}
                      className="rounded-xl bg-red-500/20 px-3 py-2 text-xs font-bold text-red-300"
                    >
                      Excluir
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}