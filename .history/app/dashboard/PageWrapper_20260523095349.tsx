"use client";
import { useState } from "react";
import Card from "./Card";
import RevenueChart from "./RevenueChart";
import LatestInvoices from "./LatestInvoices";

export default function PageWrapper({ revenue, latestInvoices, cardData }) {
  const [currency, setCurrency] = useState<"USD" | "PGK">("USD");
  const { numberOfInvoices, numberOfCustomers, totalPaidInvoices, totalPendingInvoices } = cardData;

  return (
    <main>
      <button onClick={() => setCurrency(currency === "USD" ? "PGK" : "USD")}>
        Switch to {currency === "USD" ? "PGK" : "USD"}
      </button>

      <Card title="Collected" value={totalPaidInvoices} type="collected" currency={currency} />
      <Card title="Pending" value={totalPendingInvoices} type="pending" currency={currency} />
      <Card title="Invoices" value={numberOfInvoices} type="invoices" />
      <Card title="Customers" value={numberOfCustomers} type="customers" />

      <RevenueChart revenue={revenue} currency={currency} />
      <LatestInvoices latestInvoices={latestInvoices} currency={currency} />
    </main>
  );
}
