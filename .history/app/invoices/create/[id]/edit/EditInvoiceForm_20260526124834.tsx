// app/invoices/create/[id]/edit/EditInvoiceForm.tsx
'use client';

import { useFormState } from 'react-dom';
import { updateInvoice } from '@/app/lib/actions';

const initialState = { errors: {} };

export default function EditInvoiceForm({ id, invoice }: { id: string; invoice: any }) {
  // Pass the server action directly, not a custom async wrapper
  const [state, formAction] = useFormState(updateInvoice.bind(null, id), initialState);

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <input
          name="customer"
          defaultValue={invoice.customer}
          className="border p-2 w-full"
        />
        {state.errors?.customer && <p className="text-red-600">{state.errors.customer}</p>}
      </div>

      <div>
        <input
          name="amount"
          type="number"
          defaultValue={invoice.amount}
          className="border p-2 w-full"
        />
        {state.errors?.amount && <p className="text-red-600">{state.errors.amount}</p>}
      </div>

      <div>
        <select
          name="status"
          defaultValue={invoice.status}
          className="border p-2 w-full"
        >
          <option value="pending">Pending</option>
          <option value="paid">Paid</option>
        </select>
        {state.errors?.status && <p className="text-red-600">{state.errors.status}</p>}
      </div>

      <div>
        <input
          name="dueDate"
          type="date"
          defaultValue={invoice.dueDate}
          className="border p-2 w-full"
        />
        {state.errors?.dueDate && <p className="text-red-600">{state.errors.dueDate}</p>}
      </div>

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Update Invoice
      </button>
    </form>
  );
}

