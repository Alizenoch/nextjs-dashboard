// app/dashboard/page.tsx
import { Lusitana } from "next/font/google";
import PageWrapper from "./components/PageWrapper";
import RevenueChart from "./components/RevenueChart";
import LatestInvoices from "./LatestInvoices";
import { fetchRevenue, fetchLatestInvoices, fetchCardData } from "@/app/lib/data";

const lusitana = Lusitana({ subsets: ["latin"], weight: ["400", "700"] });

export default async function DashboardPage() {
  const [revenue, latestInvoices, cardData] = await Promise.all([
    fetchRevenue(),
    fetchLatestInvoices(),
    fetchCardData(),
  ]);

  return (
    <PageWrapper cardData={cardData} lusitana={lusitana}>
      <div className="h-64 bg-gray-900 p-4 rounded-lg shadow">
        <RevenueChart revenue={revenue} />
      </div>
      <LatestInvoices latestInvoices={latestInvoices} currency="USD" />
    </PageWrapper>
  );
}

