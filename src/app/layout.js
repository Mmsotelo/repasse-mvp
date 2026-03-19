import "./globals.css"

export const metadata = {
  title: "VAAPTY Repasse MVP",
  description: "MVP de repasse com página pública por veículo"
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}