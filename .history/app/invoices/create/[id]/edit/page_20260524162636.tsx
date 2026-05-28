'use client';

import { useState } from 'react';
import { updateInvoice } from '@/app/lib/actions';
import { fetchInvoiceById } from '@/app/lib/data';

export default async function EditInvoicePage({ params }: { params: { id: string } }) {
  const id = params.id;
  const invoice = await fetchInvoiceById(id);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await updateInvoice(id, daata);
      setSuccess(true);
      // Redirect back to invoices list
      window.location.href = '/dashboard/invoices';
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  if (!invoice) {
    return <p className="text-red-600">Invoice not found.</p>;
  }

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-xl font-bold mb-4">Edit Invoice</h1>
      <form action={handleSubmit} className="space-y-4">
        <input
          name="customer"
          defaultValue={invoice.customer}
          required
          className="border p-2 w-full"
        />
        <input
          name="amount"
          type="number"
          defaultValue={invoice.amount}
          required
          className="border p-2 w-full"
        />
        <select
          name="status"
          defaultValue={invoice.status}
          required
          className="border p-2 w-full"
        >
          <option value="pending">Pending</option>
          <option value="paid">Paid</option>
        </select>
        <input
          name="dueDate"
          type="date"
          defaultValue={invoice.date}
          required
          className="border p-2 w-full"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {loading ? 'Updating…' : 'Update Invoice'}
        </button>

        {error && <p className="text-red-600">{error}</p>}
        {success && <p className="text-green-600">Invoice updated successfully!</p>}
      </form>
    </div>
  );
}
