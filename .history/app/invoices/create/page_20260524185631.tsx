// app/invoices/create/page.tsx
'use client';

import { createInvoice } from '../../lib/actions';

export default function CreateInvoicePage() {
  return (
    <form action={createInvoice} className="p-6 space-y-4">
      <input
        type="text"
        name="customer"
        placeholder="Customer name"
        className="border p-2 w-full rounded"
        required
      />
      <input
        type="number"
        name="amount"
        placeholder="Amount"
        className="border p-2 w-full rounded"
        required
      />
      <select
        name="status"
        className="border p-2 w-full rounded"
        defaultValue="pending"
      >
        <option value="pending">Pending</option>
        <option value="paid">Paid</option>
      </select>
      <input
        type="date"
        name="dueDate"
        className="border p-2 w-full rounded"
        required
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Save Invoice
      </button>
    </form>
  );
}
