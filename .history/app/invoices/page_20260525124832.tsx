// app/invoices/page.tsx
import Link from 'next/link';
import { DeleteInvoiceButton } from './DeleteInvoiceButton';
import { fetchLatestInvoices } from '@/app/lib/data';

export default async function InvoicesPage() {
  // Fetch invoices from your database
  const invoices = await fetchLatestInvoices();

  return (
    <main className="p-6">
      <h1 className="text-xl font-bold mb-4">Invoices</h1>
      <div className="space-y-4">
        {invoices.map((invoice) => (
          <div
            key={invoice.id}
            className="flex items-center justify-between border p-3 rounded"
          >
            <span>
              {invoice.customer} — ${invoice.amount} — {invoice.status}
            </span>

            <div className="flex gap-2">
              {/* Edit link */}
              <Link
                href={`/invoices/${invoice.id}/edit`}
                className="bg-yellow-500 text-white px-3 py-1 rounded"
              >
                Edit
              </Link>

              {/* Delete button */}
              <DeleteInvoiceButton id={invoice.id.toString()} />
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
