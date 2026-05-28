// app/invoices/page.tsx
import { fetchInvoices } from '../lib/data';
import Link from 'next/link';

export default async function InvoicesPage({ searchParams }: { searchParams?: { q?: string } }) {
  const search = searchParams?.q || '';
  const invoices = await fetchInvoices(search);

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);

  const statusClass = (status: string) =>
    status.toLowerCase() === 'paid'
      ? 'text-green-600 font-semibold'
      : status.toLowerCase() === 'pending'
      ? 'text-yellow-600 font-semibold'
      : 'text-gray-600';

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold">Invoices</h1>
        <Link
          href="/invoices/create"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + New Invoice
        </Link>
      </div>

      {/* ✅ Search form submits query to server */}
      <form className="mb-4">
        <input
          type="text"
          name="q"
          defaultValue={search}
          placeholder="Search by customer or status..."
          className="border p-2 w-full rounded"
        />
      </form>

      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Customer</th>
            <th className="border p-2">Amount</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Due Date</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((i) => (
            <tr key={i.id}>
              <td className="border p-2">{i.customer}</td>
              <td className="border p-2">{formatCurrency(i.amount)}</td>
              <td className={`border p-2 ${statusClass(i.status)}`}>{i.status}</td>
              <td className="border p-2">{new Date(i.date).toLocaleDateString()}</td>
              <td className="border p-2">
                <Link
                  href={`/invoices/create/${i.id}/edit`}
                  className="text-blue-600 hover:underline"
                >
                  Edit
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
