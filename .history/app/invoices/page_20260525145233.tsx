// app/invoices/page.tsx
import { DeleteInvoiceButton } from './DeleteInvoiceButton';
import { fetchInvoices, Invoice, fetchCardData } from '@/app/lib/data';

export default async function InvoicesPage() {
  const invoices: Invoice[] = await fetchInvoices();
  const cardData = await fetchCardData();

  return (
    <main className="p-6">
      <h1 className="text-xl font-bold mb-6">Invoices</h1>

      {/* Legend */}
      <div className="flex gap-4 mb-6 text-sm">
        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-green-100 text-green-700 font-semibold">
          ✔️ Paid
        </span>
        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-orange-100 text-orange-700 font-semibold">
          ⏳ Pending
        </span>
      </div>

      <table className="w-full border border-gray-300 rounded-lg shadow-sm overflow-hidden">
        <thead className="bg-gray-200 text-gray-700 uppercase text-sm">
          <tr>
            <th className="p-3 text-left">Customer</th>
            <th className="p-3 text-left">Amount</th>
            <th className="p-3 text-left">Status</th>
            <th className="p-3 text-left">Due Date</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {invoices.map((invoice, idx) => (
            <tr
              key={invoice.id}
              className={`hover:bg-gray-50 transition-colors ${
                idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'
              }`}
            >
              <td className="p-3">{invoice.customer}</td>
              <td className="p-3">${invoice.amount}</td>
              <td className="p-3">
                <span
                  className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold transition-colors duration-200 ${
                    invoice.status === 'paid'
                      ? 'bg-green-100 text-green-700 hover:bg-green-200'
                      : 'bg-orange-100 text-orange-700 hover:bg-orange-200'
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
                <a
                  href={`/invoices/${invoice.id}/edit`}
                  className="text-blue-600 mr-2 hover:underline"
                >
                  Edit
                </a>
                <DeleteInvoiceButton id={invoice.id} />
              </td>
            </tr>
          ))}

          {/* Totals Summary Row */}
          <tr className="bg-gray-100 font-semibold border-t">
            <td className="p-3">Totals</td>
            <td className="p-3">
              ${invoices.reduce((sum, inv) => sum + inv.amount, 0)}
            </td>
            <td className="p-3">
              ✔️ {cardData.paidInvoices} / ⏳ {cardData.pendingInvoices}
            </td>
            <td className="p-3 text-gray-600">—</td>
            <td className="p-3">Total: {cardData.totalInvoices} invoices</td>
          </tr>
        </tbody>
      </table>
    </main>
  );
}
