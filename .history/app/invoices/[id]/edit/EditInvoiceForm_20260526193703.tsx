'use client';

import { updateInvoice } from '../../../../lib/actions';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function EditInvoiceForm({ invoice }: { invoice: any }) {
  const router = useRouter();
  const [formData, setFormData] = useState(invoice);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // ✅ Pass both arguments: id and data
      await updateInvoice(invoice.id, formData);
      setSuccess(true);
      router.push('/dashboard/invoices');
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        value={formData.customer}
        onChange={(e) => setFormData({ ...formData, customer: e.target.value })}
        required
        className="border p-2 w-full"
      />
      <input
        type="number"
        value={formData.amount}
        onChange={(e) => setFormData({ ...formData, amount: Number(e.target.value) })}
        required
        className="border p-2 w-full"
      />
      <select
        value={formData.status}
        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
        required
        className="border p-2 w-full"
      >
        <option value="pending">Pending</option>
        <option value="paid">Paid</option>
      </select>
      <input
        type="date"
        value={formData.dueDate}
        onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
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
  );
}

