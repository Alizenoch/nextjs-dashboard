'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { updateInvoice, InvoiceUpdate } from '@/app/lib/actions';

export default function EditInvoiceForm({ id, invoice }: { id: string; invoice: any }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setError(null);
    setSuccess(false);

    // Convert FormData → InvoiceUpdate typed object
    const data: InvoiceUpdate = {
      customer: formData.get('customer') as string,
      amount: Number(formData.get('amount')),
      status: formData.get('status') as 'pending' | 'paid',
      dueDate: formData.get('dueDate') as string,
    };

    try {
      await updateInvoice(id, data);
      setSuccess(true);
      router.push('/dashboard/invoices');
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
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
  );
}

