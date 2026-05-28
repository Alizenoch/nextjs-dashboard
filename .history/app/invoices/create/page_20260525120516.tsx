'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { createInvoice, InvoiceCreate } from '@/app/lib/actions';

export default function CreateInvoiceForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);

    // Convert FormData → InvoiceCreate typed object
    const data: InvoiceCreate = {
      customer: formData.get('customer') as string,
      amount: Number(formData.get('amount')),
      status: formData.get('status') as 'pending' | 'paid',
      dueDate: formData.get('dueDate') as string,
    };

    try {
      const result = await createInvoice(data);
      setSuccess(true);
      // Redirect back to invoices list after success
      router.push('/dashboard/invoices');
    } catch (err) {
      setError('Failed to create invoice');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input name="customer" placeholder="Customer name" required />
      <input name="amount" type="number" placeholder="Amount" required />
      <select name="status" required>
        <option value="pending">Pending</option>
        <option value="paid">Paid</option>
      </select>
      <input name="dueDate" type="date" required />

      <button type="submit" disabled={loading}>
        {loading ? 'Creating...' : 'Create Invoice'}
      </button>

      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">Invoice created successfully!</p>}
    </form>
  );
}
