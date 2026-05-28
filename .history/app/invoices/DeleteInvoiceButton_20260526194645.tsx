'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { deleteInvoice } from '@/lib/actions';


export function DeleteInvoiceButton({ id }: { id: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  async function handleDelete() {
    setLoading(true);
    setError(null);

    try {
      await deleteInvoice(id);
      router.refresh();
      setShowModal(false); // close modal after success
    } catch {
      setError('Failed to delete invoice');
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Delete button that opens modal */}
      <button
        onClick={() => setShowModal(true)}
        className="bg-red-600 text-white px-3 py-1 rounded"
      >
        Delete
      </button>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            <h2 className="text-lg font-bold mb-4">Confirm Deletion</h2>
            <p className="mb-6">
              Are you sure you want to delete this invoice? This action cannot be undone.
            </p>

            {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded border border-gray-300"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={loading}
                className="bg-red-600 text-white px-4 py-2 rounded"
              >
                {loading ? 'Deleting…' : 'Confirm'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
