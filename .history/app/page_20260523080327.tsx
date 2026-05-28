import Image from "next/image";
import { Lusitana } from "next/font/google";
import { Card } from "@/app/dashboard/card";
import RevenueChart from "@/app/ui/dashboard/revenue-chart";
import LatestInvoices from "@/app/ui/dashboard/latest-invoices";
import { fetchRevenue, fetchLatestInvoices, fetchCardData } from "@/app/lib/data";

const lusitana = Lusitana({ subsets: ["latin"], weight: ["400", "700"] });

export default async function Page() {
  // Fetch all data in parallel
  const [revenue, latestInvoices, cardData] = await Promise.all([
    fetchRevenue(),
    fetchLatestInvoices(),
    fetchCardData(),
  ]);

  const {
    numberOfInvoices,
    numberOfCustomers,
    totalPaidInvoices,
    totalPendingInvoices,
  } = cardData;

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
            <Card title="Collected" value={totalPaidInvoices} type="collected" />
            <Card title="Pending" value={totalPendingInvoices} type="pending" />
            <Card title="Invoices" value={numberOfInvoices} type="invoices" />
            <Card title="Customers" value={numberOfCustomers} type="customers" />
          </div>

          {/* Revenue Chart + Latest Invoices */}
          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
            <RevenueChart revenue={revenue} />
            <LatestInvoices latestInvoices={latestInvoices} />
          </div>
        </section>
      </div>
    </main>
  );
}
