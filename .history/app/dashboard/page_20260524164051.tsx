// app/dashboard/page.tsx
import { fetchCardData, fetchRevenue } from '@/app/lib/data';
import { Line } from 'react-chartjs-2';

export default async function DashboardPage() {
  const cardData = await fetchCardData();
  const revenue = await fetchRevenue();

  const chartData = {
    labels: revenue.map(r => r.date.toLocaleDateString()), // ✅ correct property
    datasets: [
      {
        label: 'Revenue',
        data: revenue.map(r => r.amount), // ✅ correct property
        borderColor: 'rgb(37, 99, 235)',
        backgroundColor: 'rgba(37, 99, 235, 0.2)',
        tension: 0.3,
      },
    ],
  };

  return (
    <div className="space-y-8 p-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white shadow p-4 rounded">
          <h2 className="text-sm font-medium">Total Invoices</h2>
          <p className="text-2xl font-bold">{cardData.totalInvoices}</p>
        </div>
        <div className="bg-white shadow p-4 rounded">
          <h2 className="text-sm font-medium">Paid</h2>
          <p className="text-2xl font-bold text-green-600">{cardData.paidInvoices}</p>
        </div>
        <div className="bg-white shadow p-4 rounded">
          <h2 className="text-sm font-medium">Pending</h2>
          <p className="text-2xl font-bold text-yellow-600">{cardData.pendingInvoices}</p>
        </div>
        <div className="bg-white shadow p-4 rounded">
          <h2 className="text-sm font-medium">Customers</h2>
          <p className="text-2xl font-bold">{cardData.totalCustomers}</p>
        </div>
      </div>

      {/* Revenue Chart */}
      <div className="bg-white shadow p-6 rounded">
        <h2 className="text-lg font-bold mb-4">Revenue Over Time</h2>
        <Line data={chartData} />
      </div>
    </div>
  );
}
