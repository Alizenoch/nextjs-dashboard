'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { deleteInvoice } from '@/app/lib/actions';

export function DeleteInvoiceButton({ id }: { id: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleDelete() {
    setLoading(true);
    setError(null);

    try {
      await deleteInvoice(id);
      // Refresh the invoices list after deletion
      router.refresh();
    } catch (err) {
      setError('Failed to delete invoice');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-start">
      <button
        onClick={handleDelete}
        disabled={loading}
        className="bg-red-600 text-white px-3 py-1 rounded"
      >
        {loading ? 'Deleting…' : 'Delete'}
      </button>
      {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
    </div>
  );
}
