'use client'; // error.tsx must be a Client Component

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <main className="p-6">
      <h2 className="text-xl font-bold mb-4">Invoices</h2>
      <div className="bg-red-100 text-red-700 p-4 rounded">
        <p>Something went wrong while loading invoices.</p>
        <p className="text-sm mt-2">{error.message}</p>
        <button
          onClick={reset}
          className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Try again
        </button>
      </div>
    </main>
  );
}
