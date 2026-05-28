// app/invoices/create/page.tsx
'use client';

import { useState } from 'react';

export default function CreateInvoicePage() {
  const [customer, setCustomer] = useState('');
  const [amount, setAmount] = useState('');
  const [status, setStatus] = useState('pending');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Call server action or API route here
  }

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-4">
      <input
        type="text"
        placeholder="Customer name"
        value={customer}
        onChange={(e) => setCustomer(e.target.value)}
        className="border p-2 w-full rounded"
        required
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="border p-2 w-full rounded"
        required
      />
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="border p-2 w-full rounded"
      >
        <option value="pending">Pending</option>
        <option value="paid">Paid</option>
      </select>
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Save Invoice
      </button>
    </form>
  );
}
