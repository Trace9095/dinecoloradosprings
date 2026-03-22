import { Header } from './_components/header'
import { Footer } from './_components/footer'

export default function WebsiteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Header />
      <main className="min-h-[100dvh]">{children}</main>
      <Footer />
    </>
  )
}
