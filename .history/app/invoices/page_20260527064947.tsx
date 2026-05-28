import { fetchInvoices } from '@/lib/data';
import { DeleteInvoiceButton } from './DeleteInvoiceButton';
import Link from 'next/link';

export default async function InvoicesPage() {
  // ✅ Artificial delay to test loading.tsx
  await new Promise((resolve) => setTimeout(resolve, 3000));

  const invoices = await fetchInvoices();

  return (
    <main className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold">Invoices</h1>
        <div className="flex gap-2">
          <Link
            href="/"
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
          >
            ← Back to Dashboard
          </Link>
          <Link


        </div>
      </div>

      <table className="w-full border border-gray-300 rounded-lg shadow-sm overflow-hidden">
        <thead className="bg-gray-200 text-gray-700 uppercase text-sm">
          <tr>
            <th scope="col" className="p-3 text-left">Customer</th>
            <th scope="col" className="p-3 text-left">Amount</th>
            <th scope="col" className="p-3 text-left">Status</th>
            <th scope="col" className="p-3 text-left">Due Date</th>
            <th scope="col" className="p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {invoices.map((invoice) => (
            <tr key={invoice.id} className="hover:bg-gray-50 transition-colors">
              <td className="p-3">{invoice.customer}</td>
              <td className="p-3">
                {new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'USD',
                }).format(invoice.amount)}
              </td>
              <td className="p-3">
                <span
                  className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${
                    invoice.status === 'paid'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-orange-100 text-orange-700'
                  }`}
                >
                  {invoice.status === 'paid' ? '✔️' : '⏳'}
                  {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                </span>
              </td>
              <td className="p-3 text-gray-600">
                {new Date(invoice.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}
              </td>
              <td className="p-3">
                <Link
                  href={`/invoices/${invoice.id}/edit`}
                  className="text-blue-600 mr-2 hover:underline"
                >
                  Edit
                </Link>
                {/* Accessible delete button with aria-label */}
                <DeleteInvoiceButton
                  id={invoice.id}
                  aria-label={`Delete invoice for ${invoice.customer}`}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
