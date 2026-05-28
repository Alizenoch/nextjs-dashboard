import { fetchCardData, fetchRevenueData, fetchLatestInvoices } from '@/lib/data';
import RevenueChart from '@/components/RevenueChart';
import Link from 'next/link';

export default async function DashboardPage() {
  const cardData = await fetchCardData();
  const revenueData = await fetchRevenueData();
  const latestInvoices = await fetchLatestInvoices();

  return (
    <section className="p-6">
      {/* ✅ Page-specific heading */}
      <h2 className="text-xl font-bold mb-6">Overview</h2>

      {/* ✅ Summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white shadow rounded p-4">
          <h3 className="text-sm text-gray-500">Collected</h3>
          <p className="text-lg font-semibold">${cardData.collected}</p>
        </div>
        <div className="bg-white shadow rounded p-4">
          <h3 className="text-sm text-gray-500">Pending</h3>
          <p className="text-lg font-semibold">${cardData.pending}</p>
        </div>
        <div className="bg-white shadow rounded p-4">
          <h3 className="text-sm text-gray-500">Invoices</h3>
          <p className="text-lg font-semibold">{cardData.invoices}</p>
        </div>
        <div className="bg-white shadow rounded p-4">
          <h3 className="text-sm text-gray-500">Customers</h3>
          <p className="text-lg font-semibold">{cardData.customers}</p>
        </div>
      </div>

      {/* ✅ Revenue chart + Latest invoices */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white shadow rounded p-4">
          <h3 className="text-sm text-gray-500 mb-2">Revenue (USD)</h3>
          <RevenueChart data={revenueData} />
        </div>

        <div className="bg-white shadow rounded p-4">
          <h3 className="text-sm text-gray-500 mb-2">Latest Invoices</h3>
          <ul className="divide-y divide-gray-200">
            {latestInvoices.map((invoice) => (
              <li key={invoice.id} className="py-2 flex justify-between">
                <div>
                  <p className="font-medium">{invoice.customer}</p>
                  <p className="text-sm text-gray-500">{invoice.email}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">${invoice.amount}</p>
                  <p
                    className={`text-xs ${
                      invoice.status === 'paid' ? 'text-green-600' : 'text-orange-600'
                    }`}
                  >
                    {invoice.status}
                  </p>
                </div>
              </li>
            ))}
          </ul>
          <Link
            href="/invoices"
            className="mt-4 inline-block text-blue-600 hover:underline"
          >
            View all invoices →
          </Link>
        </div>
      </div>
    </section>
  );
}
