import { fetchInvoiceById } from '@/lib/data';
import { updateInvoice } from '@/lib/actions';
import Link from 'next/link';

export default async function EditInvoicePage({ params }: { params: { id: string } }) {
  const invoice = await fetchInvoiceById(params.id);

  return (
    <main className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold">Edit Invoice #{invoice.id}</h1>
        <Link
          href="/invoices"
          className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
        >
          ← Back to Invoices
        </Link>
      </div>

      <form action={updateInvoice} className="space-y-4">
        <input type="hidden" name="id" value={invoice.id} />

        <div>
          <label className="block text-sm font-medium mb-1">Customer Name</label>
          <input
            type="text"
            name="customer"
            defaultValue={invoice.customer}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Amount</label>
          <input
            type="number"
            name="amount"
            defaultValue={invoice.amount}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Status</label>
          <select
            name="status"
            defaultValue={invoice.status}
            className="w-full border rounded px-3 py-2"
          >
            <option value="pending">Pending</option>
            <option value="paid">Paid</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Due Date</label>
          <input
            type="date"
            name="dueDate"
            defaultValue={invoice.date.split('T')[0]}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Update Invoice
        </button>
      </form>
    </main>
  );
}

