import { prisma } from "@/lib/prisma";
import EditInvoiceForm from "./EditInvoiceForm";

export default async function EditInvoicePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;   // ✅ unwrap the promise

  const invoice = await prisma.invoice.findUnique({
    where: { id },
  });

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
