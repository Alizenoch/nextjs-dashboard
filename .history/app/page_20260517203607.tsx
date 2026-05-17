import Image from "next/image";
import { Lusitana } from "next/font/google";

const lusitana = Lusitana({ subsets: ["latin"], weight: ["400", "700"] });

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col p-6">
      {/* Hero Section */}
      <div className="flex h-20 shrink-0 items-end rounded-lg bg-blue-500 p-4 md:h-52">
        <Image
          src="/hero-desktop.png"
          alt="Screenshots of the dashboard project showing desktop and mobile versions"
          width={1000}
          height={760}
          className="hidden md:block"
          loading="eager"
        />
        <Image
          src="/hero-mobile.png"
          alt="Screenshot of the dashboard project on mobile"
          width={560}
          height={620}
          className="block md:hidden"
        />
      </div>

      {/* Sidebar + Dashboard */}
      <div className="flex flex-1 flex-col md:flex-row">
        <aside className="w-full md:w-64 bg-gray-100 dark:bg-gray-900 p-4">
          <nav className="flex flex-col gap-4">
            <a href="#" className="text-lg font-semibold">Home</a>
            <a href="#" className="text-lg font-semibold">Invoices</a>
            <a href="#" className="text-lg font-semibold">Customers</a>
            <a href="#" className="text-lg font-semibold text-red-600">Sign Out</a>
          </nav>
        </aside>

        <section className="flex-1 p-6">
          <h1 className={`${lusitana.className} text-2xl font-bold`}>
            Dashboard
          </h1>
          <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg bg-white p-4 shadow">
              <p className="text-sm text-gray-500">Collected</p>
              <p className="text-xl font-bold">$2,689.26</p>
            </div>
            <div className="rounded-lg bg-white p-4 shadow">
              <p className="text-sm text-gray-500">Pending</p>
              <p className="text-xl font-bold">$3,468.09</p>
            </div>
            <div className="rounded-lg bg-white p-4 shadow">
              <p className="text-sm text-gray-500">Invoices</p>
              <p className="text-xl font-bold">22</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
