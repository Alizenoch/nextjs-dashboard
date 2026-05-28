import EditInvoiceForm from './EditInvoiceForm';
import { fetchInvoiceById } from '@/lib/data';

export default async function EditInvoicePage({
  params,
}: {
  params: { id: string };
}) {
  const id = params.id;
  const numericId = Number(id);

  if (isNaN(numericId)) {
    return <p className="text-red-600">Invalid invoice ID.</p>;
  }

  const invoice = await fetchInvoiceById(numericId);

  if (!invoice) {
    return <p className="text-red-600">Invoice not found.</p>;
  }

  return <EditInvoiceForm invoice={invoice} />;
}
