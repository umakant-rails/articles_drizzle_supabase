import { PublicNavbar } from "./components/PublicNavbar";

export default function PublicLayout({ children,}: Readonly<{children: React.ReactNode;}>) {
  return (
    <div>
      <PublicNavbar />
      <main>
        <div className="mx-auto max-w-full px-4 py-6 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
    </div>
  )
}
