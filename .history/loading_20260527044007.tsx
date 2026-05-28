export default function Loading() {
  return (
    <main className="p-6">
      <h2 className="text-xl font-bold mb-6">Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6 animate-pulse">
        <div className="h-20 bg-gray-200 rounded"></div>
        <div className="h-20 bg-gray-200 rounded"></div>
        <div className="h-20 bg-gray-200 rounded"></div>
        <div className="h-20 bg-gray-200 rounded"></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-pulse">
        <div className="h-64 bg-gray-200 rounded"></div>
        <div className="h-64 bg-gray-200 rounded"></div>
      </div>
    </main>
  );
}
