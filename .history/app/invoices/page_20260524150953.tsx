// app/invoices/page.tsx
import { deleteInvoice } from '@/app/lib/actions';
import { fetchLatestInvoices } from '@/app/lib/data';
import Link from 'next/link';

export default async function InvoicesPage() {
  // Fetch invoices from the database
  const invoices = await fetchLatestInvoices();

  return (
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
            {/* Edit button */}
            <Link
              href={`/invoices/${invoice.id}/edit`}
              className="bg-yellow-500 text-white px-3 py-1 rounded"
            >
              Edit
            </Link>

            {/* Delete button */}
            <form
              action={async () => {
                'use server';
                await deleteInvoice(invoice.id.);
              }}
            >
              <button
                type="submit"
                className="bg-red-600 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </form>
          </div>
        </div>
      ))}
    </div>
  );
}
