// app/invoices/create/page.tsx
import { createInvoice } from '@/app/lib/actions.';

export default function CreateInvoicePage() {
  async function handleSubmit(formData: FormData) {
    'use server';
    await createInvoice(formData);
  }

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-xl font-bold mb-4">Create Invoice</h1>
      <form action={handleSubmit} className="space-y-4">
        <input
          name="customer"
          placeholder="Customer ID"
          required
          className="border p-2 w-full"
        />
        <input
          name="amount"
          type="number"
          placeholder="Amount"
          required
          className="border p-2 w-full"
        />
        <select
          name="status"
          required
          className="border p-2 w-full"
        >
          <option value="pending">Pending</option>
          <option value="paid">Paid</option>
        </select>
        <input
          name="dueDate"
          type="date"
          required
          className="border p-2 w-full"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Create Invoice
        </button>
      </form>
    </div>
  );
}
