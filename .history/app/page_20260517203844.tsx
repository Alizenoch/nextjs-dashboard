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

          {/* Cards */}
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

          {/* Revenue Chart */}
          <div className="mt-6 rounded-lg bg-white p-4 shadow">
            <h2 className="text-lg font-semibold">Recent Revenue</h2>
            <div className="mt-4 h-48 bg-gray-100 flex items-end gap-2 p-2">
              {/* Fake bars for now */}
              <div className="w-8 bg-blue-500 h-16"></div>
              <div className="w-8 bg-blue-500 h-24"></div>
              <div className="w-8 bg-blue-500 h-12"></div>
              <div className="w-8 bg-blue-500 h-20"></div>
              <div className="w-8 bg-blue-500 h-28"></div>
              <div className="w-8 bg-blue-500 h-10"></div>
            </div>
          </div>

          {/* Invoices Table */}
          <div className="mt-6 rounded-lg bg-white p-4 shadow">
            <h2 className="text-lg font-semibold">Invoices</h2>
            <table className="mt-4 w-full text-left">
              <thead>
                <tr>
                  <th className="py-2">Customer</th>
                  <th className="py-2">Email</th>
                  <th className="py-2">Amount</th>
                  <th className="py-2">Date</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-2">85842ba0…</td>
                  <td className="py-2">customer@example.com</td>
                  <td className="py-2">$1,200.00</td>
                  <td className="py-2">Dec 6, 2022</td>
                </tr>
                <tr>
                  <td className="py-2">c3a9f1d2…</td>
                  <td className="py-2">client@example.com</td>
                  <td className="py-2">$850.00</td>
                  <td className="py-2">Jan 15, 2023</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}
