// app/invoices/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { DeleteInvoiceButton } from './DeleteInvoiceButton';
import { fetchInvoices, Invoice } from '@/app/lib/data';

export default function InvoicesPage() {
  const [search, setSearch] = useState('');
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch invoices whenever search changes
  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);

    const loadInvoices = async () => {
      try {
        const data = await fetchInvoices(search);
        if (isMounted) {
          setInvoices(data);
        }
      } catch (err) {
        if (isMounted) {
          setError('Failed to load invoices');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadInvoices();

    // Cleanup to prevent state updates after unmount
    return () => {
      isMounted = false;
    };
  }, [search]);

  return (
    <main className="p-6">
      <h1 className="text-xl font-bold mb-6">Invoices</h1>

      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search invoices..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-2 border rounded-md shadow-sm focus:ring focus:ring-blue-300"
        />
      </div>

      {loading && <p className="text-gray-500">Loading invoices...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && (
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
            {invoices.map((invoice) => (
              <tr key={invoice.id} className="hover:bg-gray-50 transition-colors">
                <td className="p-3">{invoice.customer}</td>
                <td className="p-3">${invoice.amount}</td>
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
      )}
    </main>
  );
}

