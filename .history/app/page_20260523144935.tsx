import PageWrapper from "./dashboard/PageWrapper";

// Example fetch functions – replace with your actual data sources
async function fetchRevenue() {
  return [
    { date: "Jan", total: 500 },
    { date: "Feb", total: 832 },
    { date: "Mar", total: 1332 },
  ];
}

async function fetchLatestInvoices() {
  return [
    { customer: "Alice", email: "alice@example.com", amount: 666, date: "2026-05-01", total: 666 },
    { customer: "Bob", email: "bob@example.com", amount: 500, date: "2026-05-02", total: 500 },
    { customer: "Charlie", email: "charlie@example.com", amount: 666, date: "2026-05-03", total: 666 },
  ];
}

export default async function Page() {
  const revenue = await fetchRevenue();
  const latestInvoices = await fetchLatestInvoices();

  // Build cardData as an array of objects
  const cardData = [
    { title: "Collected", value: 1332 },
    { title: "Pending", value: 500 },
    { title: "Invoices", value: 3 },
    { title: "Customers", value: 3 },
  ];

  return (
    <PageWrapper
      revenue={revenue}
      latestInvoices={latestInvoices}
      cardData={cardData}
    />
  );
}
