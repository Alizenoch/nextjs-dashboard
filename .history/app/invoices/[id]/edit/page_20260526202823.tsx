import { fetchInvoiceById } from "@/lib/data";
import EditInvoiceForm from "./EditInvoiceForm";

export default async function EditInvoicePage({ params }: { params: { id: string } }) {
  const id = Number(params.id); // ensure it's a number
  const invoice = await fetchInvoiceById(id);

  if (!invoice) {
    return <p className="text-red-600">Invoice not found.</p>;
  }

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-xl font-bold mb-4">Edit Invoice</h1>
      <EditInvoiceForm invoice={invoice} />
    </div>
  );
}

