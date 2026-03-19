import EvaluationBanner from "@/components/EvaluationBanner";
import FinancialBlock from "@/components/FinancialBlock";
import InfoGrid from "@/components/InfoGrid";
import HighlightsList from "@/components/HighlightsList";
import AttentionList from "@/components/AttentionList";
import WhatsAppCTA from "@/components/WhatsAppCTA";

function buildWhatsAppUrl(vehicle) {
  const message = `Olá, tenho interesse no ${vehicle.model} ${vehicle.year} (cód: ${vehicle.code}).`

  return `https://wa.me/${vehicle.negotiator.phone}?text=${encodeURIComponent(message)}`
}
  
export default function VehiclePage({ vehicle }) {
  return (
    <main className="min-h-screen bg-zinc-950 pb-28 text-white">
      <div className="mx-auto max-w-md px-4 py-4">
        <EvaluationBanner until={vehicle.evaluationUntil} />

        <div className="relative overflow-hidden rounded-3xl border border-white/10">
          <img
            src={vehicle.coverImage}
            alt={vehicle.title}
            className="h-72 w-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

          <div className="absolute bottom-0 left-0 right-0 p-4">
            <p className="text-xs text-zinc-300">{vehicle.store}</p>
            <h1 className="mt-1 text-xl font-bold leading-tight text-white">
              {vehicle.title}
            </h1>
            <p className="mt-1 text-xs text-zinc-300">Cód. {vehicle.code}</p>
          </div>
        </div>

        <div className="mt-5 space-y-4">
          <InfoGrid vehicle={vehicle} />

          <section className="rounded-2xl border border-white/10 bg-zinc-900 p-4">
            <h2 className="mb-3 text-lg font-semibold text-white">Opcionais</h2>
            <div className="flex flex-wrap gap-2 text-xs">
              {vehicle.options.map((item, index) => (
                <span
                  key={index}
                  className="rounded-full bg-white/10 px-3 py-1 text-zinc-200"
                >
                  {item}
                </span>
              ))}
            </div>
          </section>

          <FinancialBlock fipe={vehicle.fipe} price={vehicle.price} />
          <HighlightsList items={vehicle.positives} />
          <AttentionList items={vehicle.attention} />
        </div>
      </div>

      <WhatsAppCTA vehicle={vehicle} />
    </main>
  );
}