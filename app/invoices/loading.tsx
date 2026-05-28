export default function Loading() {
  return (
    <main className="p-6">
      <h2 className="text-xl font-bold mb-4">Invoices</h2>
      <div className="animate-pulse space-y-4">
        <div className="h-6 bg-gray-200 rounded w-1/3"></div>
        <div className="h-6 bg-gray-200 rounded w-2/3"></div>
        <div className="h-6 bg-gray-200 rounded w-1/2"></div>
      </div>
    </main>
  );
}
