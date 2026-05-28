// app/invoices/page.tsx
import { fetchInvoices } from '../lib/data';
import Link from 'next/link';

export default async function InvoicesPage() {
  const invoices = await fetchInvoices();

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);

  const statusClass = (status: string) => {
    switch (status.toLowerCase()) {
      case 'paid':
        return 'text-green-600 font-semibold';
      case 'pending':
        return 'text-yellow-600 font-semibold';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold">Invoices</h1>
        {/* ✅ New Invoice button */}
        <Link
          href="/invoices/create"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + New Invoice
        </Link>
      </div>

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
          {invoices.map(
            (i: { id: string; customer: string; amount: number; status: string; date: string }) => (
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
            )
          )}
        </tbody>
      </table>
    </div>
  );
}

