import { buildWhatsAppUrl } from "@/lib/whatsapp"

export default function WhatsAppCTA({ vehicle }) {
  return (
    <a
      href={buildWhatsAppUrl(vehicle)}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 left-4 right-4 z-50 rounded-2xl bg-green-500 px-4 py-4 text-center text-base font-bold text-black shadow-xl shadow-green-500/30"
    >
      Fazer proposta agora
    </a>
  )
}