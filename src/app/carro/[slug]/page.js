import { formatCurrency } from "@/lib/currency"
import VehiclePage from "@/components/VehiclePage"
import { getAdBySlug, readAds } from "@/lib/file-db"
import { notFound } from "next/navigation"

export async function generateStaticParams() {
  const ads = await readAds()
  return ads.map((item) => ({
    slug: item.slug,
  }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const vehicle = await getAdBySlug(slug)

  if (!vehicle) {
    return {
      title: "Veículo não encontrado",
    }
  }

  const title = `${vehicle.model} ${vehicle.year} | Repasse`
  const description = `FIPE ${formatCurrency(vehicle.fipe)} | Investimento ${formatCurrency(vehicle.price)} | ${vehicle.store}`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://SEU-DOMINIO.com/carro/${vehicle.slug}`,
      images: [
        {
          url: vehicle.coverImage,
          width: 1200,
          height: 630,
          alt: vehicle.title,
        },
      ],
    },
  }
}

export default async function CarPage({ params }) {
  const { slug } = await params
  const vehicle = await getAdBySlug(slug)

  if (!vehicle) {
    notFound()
  }

  return <VehiclePage vehicle={vehicle} />
}