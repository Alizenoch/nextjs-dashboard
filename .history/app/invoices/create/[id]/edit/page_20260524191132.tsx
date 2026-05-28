// app/invoices/create/[id]/edit/page.tsx


export default async function EditInvoicePage({ params }: { params: { id: string } }) {
  const invoice = await fetchInvoiceById(params.id);

  if (!invoice) {
    return <p className="text-red-600">Invoice not found.</p>;
  }

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-xl font-bold mb-4">Edit Invoice</h1>
      <EditInvoiceForm id={params.id} invoice={invoice} />
    </div>
  );
}
