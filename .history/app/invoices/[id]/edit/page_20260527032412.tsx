import EditInvoiceForm from './EditInvoiceForm';
import { fetchInvoiceById } from '@/lib/data'; // or '../../../lib/data' if alias not set

export default async function EditInvoicePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // Unwrap the promise
  const { id } = await params;
  const numericId = Number(id);

  if (isNaN(numericId)) {
    throw new Error('Invalid invoice ID');
  }

  const invoice = await fetchInvoiceById(numericId);

  if (!invoice) {
    throw new Error('Invoice not found');
  }

  return <EditInvoiceForm invoice={invoice} />;
}
