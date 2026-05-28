// app/invoices/page.tsx
import { DeleteInvoiceButton } from './DeleteInvoiceButton';
import { fetchInvoices, Invoice } from '@/app/lib/data';

export default async function InvoicesPage() {
  const invoices: Invoice[] = await fetchInvoices();

  return (
    <main className="p-6">
      <h1 className="text-xl font-bold mb-4">Invoices</h1>
      <table className="w-full border border-gray-300 rounded-md">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 text-left">Customer</th>
            <th className="p-2 text-left">Amount</th>
            <th className="p-2 text-left">Status</th>
            <th className="p-2 text-left">Due Date</th>
            <th className="p-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice) => (
            <tr key={invoice.id} className="border-t">
              <td className="p-2">{invoice.customer}</td>
              <td className="p-2">${invoice.amount}</td>
              <td className="p-2 capitalize">{invoice.status}</td>
              <td className="p-2 text-gray-600">
                {new Date(invoice.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}
              </td>
              <td className="p-2">
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
        </tbody>
      </table>
    </main>
  );
}
