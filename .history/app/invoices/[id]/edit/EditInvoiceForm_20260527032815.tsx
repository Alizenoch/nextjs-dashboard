'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { updateInvoice } from '../../../lib/data';

export default function EditInvoiceForm({ invoice }: { invoice: any }) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    amount: invoice.amount,
    status: invoice.status,
    date: invoice.date.split("T")[0],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const ok = await updateInvoice(Number(invoice.id), formData);
    setLoading(false);

    if (ok) {
      setSuccess(true);
      router.push('/invoices');
    } else {
      setError('Failed to update invoice');
    }
  }

  return (
    <div className="bg-white shadow rounded-lg p-6 max-w-md mx-auto">
      <h2 className="text-lg font-semibold mb-4">Edit Invoice</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Amount</label>
          <input
            type="number"
            value={formData.amount}
            onChange={(e) => setFormData({ ...
