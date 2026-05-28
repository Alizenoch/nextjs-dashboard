'use client';

import { createInvoice } from '@/lib/actions'; 
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

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
        status: formData.get('status') as 'pending' | 'paid',
        dueDate: formData.get('dueDate') as string,
      });

      toast.success('Invoice created successfully!');
      router.push('/invoices');
    } catch {
      toast.error('Something went wrong. Please try again.');
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-xl font-bold mb-4">Create Invoice</h1>
      <form action={handleSubmit} className="space-y-4">
        {/* Customer name */}
        <label htmlFor="customer" className="block text-sm font-medium text-gray-700">
          Customer Name
        </label>
        <input
          id="customer"
          name="customer"
          placeholder="e.g. Alice"
          required
          className="border p-2 w-full rounded"
        />

        {/* Amount */}
        <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
          Amount
        </label>
        <input
          id="amount"
          name="amount"
          type="number"
          placeholder="e.g. 500"
          required
          aria-describedby={error ? 'form-error' : undefined}
          className="border p-2 w-full rounded"
        />

        {/* Status */}
        <label htmlFor="status" className="block text-sm font-medium text-gray-700">
          Status
        </label>
        <select
          id="status"
          name="status"
          defaultValue="pending"
          required
          className="border p-2 w-full rounded"
        >
          <option value="pending">Pending</option>
          <option value="paid">Paid</option>
        </select>

        {/* Due date */}
        <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700">
          Due Date
        </label>
        <input
          id="dueDate"
          name="dueDate"
          type="date"
          required
          className="border p-2 w-full rounded"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-green-600 text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          {loading ? 'Creating…' : 'Create Invoice'}
        </button>

        {error && (
          <p id="form-error" className="text-red-600 mt-2">
            {error}
          </p>
        )}
        {success && (
          <p className="text-green-600 mt-2">Invoice created successfully!</p>
        )}
      </form>
    </div>
  );
}
