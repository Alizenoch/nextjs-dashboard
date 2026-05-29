// app/invoices/create/page.tsx
'use client';

import { useFormState } from 'react-dom';
import { createInvoice } from '@/lib/actions';

type FormState = {
  errors: {
    customer?: string[];
    amount?: string[];
    status?: string[];
    dueDate?: string[];
  };
};

const initialState: FormState = { errors: {} };

export default function CreateInvoiceForm() {
  const action = async (prevState: FormState, formData: FormData): Promise<FormState> => {
    return await createInvoice({
      customer: formData.get('customer')?.toString() || '',
      amount: Number(formData.get('amount')),
      status: formData.get('status')?.toString() as 'pending' | 'paid',
      dueDate: formData.get('dueDate')?.toString() || '',
    });
  };

  const [state, formAction] = useFormState(action, initialState);

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <input name="customer" placeholder="Customer name" className="border p-2 w-full" />
        {state.errors?.customer && <p className="text-red-600">{state.errors.customer}</p>}
      </div>

      <div>
        <input name="amount" type="number" placeholder="Amount" className="border p-2 w-full" />
        {state.errors?.amount && <p className="text-red-600">{state.errors.amount}</p>}
      </div>

      <div>
        <select name="status" className="border p-2 w-full">
          <option value="pending">Pending</option>
          <option value="paid">Paid</option>
        </select>
        {state.errors?.status && <p className="text-red-600">{state.errors.status}</p>}
      </div>

      <div>
        <input name="dueDate" type="date" className="border p-2 w-full" />
        {state.errors?.dueDate && <p className="text-red-600">{state.errors.dueDate}</p>}
      </div>

      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
        Create Invoice
      </button>
    </form>
  );
}
