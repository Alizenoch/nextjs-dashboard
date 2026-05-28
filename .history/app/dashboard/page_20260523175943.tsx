// app/dashboard/page.tsx
import { Lusitana } from "next/font/google";
import PageWrapper from "./components/PageWrapper";
import RevenueChart from "./components/RevenueChart";
import LatestInvoices from "./LatestInvoices";
import { fetchRevenue, fetchLatestInvoices, fetchCardData } from "@/app/lib/data";

const lusitana = Lusitana({ subsets: ["latin"], weight: ["400", "700"] });

export default async function DashboardPage() {
  const [revenue, latestInvoices, rawCardData] = await Promise.all([
    fetchRevenue(),
    fetchLatestInvoices(),
    fetchCardData(),
  ]);

  // ✅ Transform cardData into the array shape PageWrapper expects
  const cardData = [
    { title: "Invoices", value: rawCardData.numberOfInvoices },
    { title: "Customers", value: rawCardData.numberOfCustomers },
    { title: "Paid", value: rawCardData.totalPaidInvoices },
    { title: "Pending", value: rawCardData.totalPendingInvoices },
  ];

  // ✅ Transform revenue into { month, amount }[]
  const transformedRevenue = revenue.map((r) => ({
    month: r.date,
    amount: r.total,
  }));

  return (
    <PageWrapper cardData={cardData} lusitana={lusitana}>
      <div className="h-64 bg-gray-900 p-4 rounded-lg shadow">
        <RevenueChart revenue={transformedRevenue} currency="USD" />
      </div>
      <LatestInvoices latestInvoices={latestInvoices} currency="USD" />
    </PageWrapper>
  );
}
