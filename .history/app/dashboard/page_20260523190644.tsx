// app/dashboard/page.tsx
import { fetchRevenue, fetchLatestInvoices, fetchCardData } from "../lib/data";
import PageWrapper from "./PageWrapper";
import RevenueChart from "./components/RevenueChart";
import LatestInvoices from "./LatestInvoices";
import { Lusitana } from "next/font/google";

const lusitana = Lusitana({ subsets: ["latin"], weight: ["400", "700"] });

export default async function DashboardPage() {
  const [revenue, latestInvoices, cardData] = await Promise.all([
    fetchRevenue(),
    fetchLatestInvoices(),
    fetchCardData(),
  ]);

  // ✅ Simplify date labels for the chart
  const transformedRevenue = revenue.map((r) => ({
    month: new Date(r.date).toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    }),
    amount: r.total,
  }));

  return (
    <PageWrapper cardData={cardData} lusitana={lusitana}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <RevenueChart revenue={transformedRevenue} />
        <LatestInvoices latestInvoices={latestInvoices} currency="USD" />
      </div>
    </PageWrapper>
  );
}
