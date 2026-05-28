

import { fetchInvoices } from '@/lib/data';
import { DeleteInvoiceButton } from './DeleteInvoiceButton';
import Link from 'next/link';

export default async function InvoicesPage() {
  const invoices = await fetchInvoices();

  return (
    <main className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold">Invoices</h1>
        <div className="flex gap-2">
          {/* ✅ Back to Dashboard button */}
          <Link
            href="/dashboard"
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
          >
            ← Back to Dashboard
          </Link>

          {/* ✅ New Invoice button */}
          <Link
            href="/invoices/create"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            + New Invoice
          </Link>
        </div>
      </div>

      {/* ... your table code stays the same ... */}
    </main>
  );
}
