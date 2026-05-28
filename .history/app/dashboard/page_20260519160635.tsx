// app/dashboard/page.tsx
// app/dashboard/page.tsx
import { lusitana } from "@/app/ui/fonts";
import  Card  from "@/app/dashboard/Card";
import RevenueChart from "@/app/dashboard/revenue-chart";
import LatestInvoices from "@/app/ui/dashboard/latest-invoices";
import { fetchRevenue, fetchLatestInvoices, fetchCardData } from "@/app/lib/data";

export default async function DashboardPage() {
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
    <main>
      <h1 className={`${lusitana.className} text-2xl font-bold text-gray-900 mb-6`}>
        Dashboard
      </h1>

      {/* Summary cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card title="Collected" value={totalPaidInvoices} type="collected" />
        <Card title="Pending" value={totalPendingInvoices} type="pending" />
        <Card title="Total Invoices" value={numberOfInvoices} type="invoices" />
        <Card title="Total Customers" value={numberOfCustomers} type="customers" />
      </div>

      {/* Revenue chart + latest invoices */}
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <RevenueChart revenue={revenue} />
        <LatestInvoices latestInvoices={latestInvoices} />
      </div>
    </main>
  );
}
