// app/dashboard/page.tsx
import { Lusitana } from "next/font/google";
import PageWrapper from "./PageWrapper";
import LatestInvoices from "./LatestInvoices";
import RevenueChart from "./RevenueChart";
import { fetchRevenue, fetchLatestInvoices, fetchCardData } from "@/app/lib/data";

const lusitana = Lusitana({ subsets: ["latin"], weight: ["400", "700"] });

export default async function DashboardPage() {
  const [revenue, latestInvoices, cardData] = await Promise.all([
    fetchRevenue(),
    fetchLatestInvoices(),
    fetchCardData(),
  ]);

  return (
    <PageWrapper
      cardData={cardData}
      lusitana={lusitana}
    >
      {/* Middle row: chart + invoices side by side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-4 bg-white rounded shadow h-80">
          <h2 className="text-lg font-semibold mb-2">Revenue</h2>
          <RevenueChart revenue={revenue} />
        </div>
        <LatestInvoices latestInvoices={latestInvoices} />
      </div>
    </PageWrapper>
  );
}
