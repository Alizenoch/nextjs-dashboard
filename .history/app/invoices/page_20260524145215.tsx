import { deleteInvoice } from '@/app/lib/actions';
import { invoices } from '../lib/placeholder-data';


<form action={async () => {
  'use server';
  await deleteInvoice(invoices.id);
}}>
  <button
    type="submit"
    className="bg-red-600 text-white px-3 py-1 rounded"
  >
    Delete
  </button>
</form>
