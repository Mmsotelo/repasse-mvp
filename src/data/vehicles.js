export const vehicles = [
  {
    slug: "vwpolo-16-20102011-vaapty-braganca-paulista-e9",
    code: "E****9",
    title: "VW/Polo 1.6 2010/2011 | Repasse",
    store: "Vaapty Bragança Paulista",

    headline: "",
    callout: "",
    previousPrice: 0,
    note: "",

    model: "VW/Polo 1.6",
    year: "2010/2011",
    km: "319.982",
    transmission: "Manual",
    fuel: "Flex",
    plate: "E****9",

    fipe: 35976,
    price: 23976,

    options: [],
    positives: [
      "IPVA 26 aberto",
      "Suspensão ok",
      "Motor feito (com nota)",
      "Câmbio ok",
      "Ar gelando",
      "Interna boa",
      "2 pneus bons"
    ],
    attention: [
      "4/5 peças pintura",
      "2 pneus ruins",
      "Parabrisa trincado",
      "Volante gasto"
    ],

    negotiator: {
      name: "Jonathan",
      phone: "5511915723724"
    },

    coverImage: "/cars/polo.png",
    images: ["/cars/polo.png"],

    evaluationUntil: "2026-03-31"
  }
]

export function getVehicleBySlug(slug) {
  return vehicles.find((vehicle) => vehicle.slug === slug)
}