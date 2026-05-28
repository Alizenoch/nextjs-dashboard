import { fetchInvoiceById } from '../../../lib/data';
import EditInvoiceForm from './EditInvoiceForm';

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const invoice = await fetchInvoiceById(id);

  if (!invoice) {
    return <p>Invoice not found.</p>;
  }

  return <EditInvoiceForm invoice={invoice} />;
}
