// app/page.tsx
import { Lusitana } from "next/font/google";
import PageWrapper from "./dashboard/PageWrapper";
import { fetchRevenue, fetchLatestInvoices, fetchCardData } from "@/app/lib/data";

const lusitana = Lusitana({ subsets: ["latin"], weight: ["400", "700"] });

export default async function Page() {
  const [revenue, latestInvoices, cardData] = await Promise.all([
    fetchRevenue(),
    fetchLatestInvoices(),
    fetchCardData(),
  ]);

  return (
    <PageWrapper
      revenue={revenue}
      latestInvoices={latestInvoices}
      cardData={cardData}
      lusitana={lusitana}
    />
  );
}
