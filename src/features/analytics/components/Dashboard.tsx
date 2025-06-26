import { useState, useEffect } from 'react';
import { AnalyticsMetrics, VendorPerformance } from '../types';
import { AnalyticsService } from '../service';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

export function AnalyticsDashboard() {
  const [metrics, setMetrics] = useState<AnalyticsMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedVendor, setSelectedVendor] = useState<string | null>(null);
  const [vendorPerformance, setVendorPerformance] = useState<VendorPerformance | null>(null);

  const analyticsService = new AnalyticsService();

  useEffect(() => {
    fetchMetrics();
  }, []);

  const fetchMetrics = async () => {
    try {
      setLoading(true);
      setError(null);
      const metrics = await analyticsService.getDashboardMetrics();
      setMetrics(metrics);
    } catch (err) {
      setError('Failed to fetch analytics data');
    } finally {
      setLoading(false);
    }
  };

  const fetchVendorPerformance = async (vendorId: string) => {
    try {
      const performance = await analyticsService.getVendorPerformance(vendorId);
      setVendorPerformance(performance);
    } catch (err) {
      console.error('Failed to fetch vendor performance:', err);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!metrics) {
    return <div>No data available</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">Analytics Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <MetricsCard
          title="Total Sales"
          value={metrics.totalSales.toLocaleString()}
          icon="💰"
        />
        <MetricsCard
          title="Active Users"
          value={metrics.activeUsers.toLocaleString()}
          icon="👥"
        />
        <MetricsCard
          title="Conversion Rate"
          value={`${metrics.conversionRate.toFixed(2)}%`}
          icon="📈"
        />
        <MetricsCard
          title="Average Order Value"
          value={`$${metrics.averageOrderValue.toFixed(2)}`}
          icon="🏷️"
        />
        <MetricsCard
          title="Unique Users"
          value={metrics.userCount.toLocaleString()}
          icon="👤"
        />
        <MetricsCard
          title="Top Products"
          value={metrics.topProducts.length}
          icon="🛍️"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-xl font-semibold mb-4">Daily Sales</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={metrics.dailySales.map((value, index) => ({
              day: `Day ${30 - index}`,
              sales: value
            }))}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="sales" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-xl font-semibold mb-4">Product Categories</h2>
          <BarChart width={600} height={300} data={
            Object.entries(metrics.productCategories).map(([category, count]) => ({
              category,
              count
            }))
          }>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="category" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#8884d8" />
          </BarChart>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="text-xl font-semibold mb-4">Vendor Performance</h2>
        <div className="flex gap-4 mb-4">
          <select
            className="px-4 py-2 border rounded"
            value={selectedVendor || ''}
            onChange={(e) => {
              setSelectedVendor(e.target.value);
              fetchVendorPerformance(e.target.value);
            }}
          >
            <option value="">Select Vendor</option>
            {/* Add vendor options from API */}
          </select>
        </div>

        {vendorPerformance && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <VendorMetricsCard
              title="Sales"
              value={vendorPerformance.sales.toLocaleString()}
              icon="💰"
            />
            <VendorMetricsCard
              title="Revenue"
              value={`$${vendorPerformance.revenue.toFixed(2)}`}
              icon="🏷️"
            />
            <VendorMetricsCard
              title="Average Rating"
              value={`${vendorPerformance.averageRating.toFixed(1)}/5`}
              icon="⭐"
            />
            <VendorMetricsCard
              title="Order Count"
              value={vendorPerformance.orderCount.toLocaleString()}
              icon="📦"
            />
            <VendorMetricsCard
              title="Return Rate"
              value={`${vendorPerformance.returnRate.toFixed(1)}%`}
              icon="🔄"
            />
            <VendorMetricsCard
              title="On-Time Delivery"
              value={`${((vendorPerformance.deliveryPerformance.onTime / 
                vendorPerformance.deliveryPerformance.total) * 100).toFixed(1)}%`}
              icon="🚚"
            />
          </div>
        )}
      </div>
    </div>
  );
}

function MetricsCard({ title, value, icon }: { title: string; value: string | number; icon: string }) {
  return (
    <Card className="bg-white shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="text-2xl font-bold">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
      </CardContent>
    </Card>
  );
}

function VendorMetricsCard({ title, value, icon }: { title: string; value: string; icon: string }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium">{title}</h3>
        <div className="text-2xl font-bold">{icon}</div>
      </div>
      <div className="text-2xl font-bold">{value}</div>
    </div>
  );
}
