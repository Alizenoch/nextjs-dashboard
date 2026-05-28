'use client';

import { createInvoice } from '../../lib/actions';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CreateInvoicePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await createInvoice({
        customer: formData.get('customer') as string,
        amount: Number(formData.get('amount')),
        status: formData.get('status') as 'pending' | 'paid', // ✅ narrowed union type
        dueDate: formData.get('dueDate') as string,
      });

      setSuccess(true);
      router.push('/dashboard/invoices');
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-xl font-bold mb-4">Create Invoice</h1>
      <form action={handleSubmit} className="space-y-4">
        <input name="customer" required className="border p-2 w-full" />
        <input name="amount" type="number" required className="border p-2 w-full" />
        <select
          name="status"
          defaultValue="pending" // ✅ default value
          required
          className="border p-2 w-full"
        >
          <option value="pending">Pending</option>
          <option value="paid">Paid</option>
        </select>
        <input name="dueDate" type="date" required className="border p-2 w-full" />

        <button
          type="submit"
          disabled={loading}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          {loading ? 'Creating…' : 'Create Invoice'}
        </button>

        {error && <p className="text-red-600">{error}</p>}
        {success && <p className="text-green-600">Invoice created successfully!</p>}
      </form>
    </div>
  );
}
