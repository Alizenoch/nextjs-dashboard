import EditInvoiceForm from '@/app/invoices/edit-form';
import { fetchInvoiceById } from '@/app/lib/data';

export default async function EditInvoicePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // ✅ Unwrap the promise
  const { id } = await params;
  const numericId = Number(id);

  // Guard against invalid IDs
  if (isNaN(numericId)) {
    throw new Error('Invalid invoice ID');
  }

  // Fetch the invoice from the database
  const invoice = await fetchInvoiceById(numericId);

  if (!invoice) {
    throw new Error('Invoice not found');
  }

  return <EditInvoiceForm invoice={invoice} />;
}
