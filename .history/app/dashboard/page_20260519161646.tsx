// app/dashboard/page.tsx
import { lusitana } from "@/app/ui/fonts";
import Card from "@/app/dashboard/Card";
import RevenueChart from "@/app/dashboard/RevenueChart";
import LatestInvoices from "@/app/dashboard/LatestInvoices";
import { fetchRevenue, fetchLatestInvoices, fetchCardData } from "@/app/lib/data";

export default async function DashboardPage() {
  // Fetch all data in parallel
  const [rawRevenue, rawInvoices, cardData] = await Promise.all([
    fetchRevenue(),
    fetchLatestInvoices(),
    fetchCardData(),
  ]);

  // Map DB rows into the expected shapes
  const revenue = rawRevenue.map((row: any) => ({
    date: String(row.date),
    total: Number(row.total),
  }));

  const latestInvoices = rawInvoices.map((row: any) => ({
    amount: Number(row.amount),
    name: String(row.name),
    email: String(row.email),
    image_url: String(row.image_url),
  }));

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
