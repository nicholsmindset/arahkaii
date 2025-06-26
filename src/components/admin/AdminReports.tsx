
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { Download, TrendingUp, DollarSign, Users, ShoppingBag } from 'lucide-react';

const AdminReports: React.FC = () => {
  const revenueData = [
    { month: 'Jan', revenue: 15000, vendors: 35 },
    { month: 'Feb', revenue: 18000, vendors: 38 },
    { month: 'Mar', revenue: 22000, vendors: 42 },
    { month: 'Apr', revenue: 25000, vendors: 45 },
    { month: 'May', revenue: 28000, vendors: 48 }
  ];

  const categoryData = [
    { name: 'Clothing', value: 35, color: '#8884d8' },
    { name: 'Accessories', value: 25, color: '#82ca9d' },
    { name: 'Shoes', value: 20, color: '#ffc658' },
    { name: 'Beauty', value: 15, color: '#ff7300' },
    { name: 'Other', value: 5, color: '#00ff00' }
  ];

  const performanceData = [
    { metric: 'Platform Revenue', value: '$45,987.65', change: '+22.1%', positive: true },
    { metric: 'Total Orders', value: '5,687', change: '+12.4%', positive: true },
    { metric: 'Active Vendors', value: '48', change: '+5', positive: true },
    { metric: 'Avg Order Value', value: '$87.50', change: '+3.2%', positive: true }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold">Reports & Analytics</h2>
          <p className="text-gray-600">Platform performance insights and trends</p>
        </div>
        <div className="flex gap-2">
          <Select>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Performance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {performanceData.map((item, index) => (
          <Card key={index}>
            <CardContent className="pt-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600 text-sm">{item.metric}</span>
                <div className="text-white bg-fashion-black rounded-full p-2">
                  {index === 0 && <DollarSign className="h-4 w-4" />}
                  {index === 1 && <ShoppingBag className="h-4 w-4" />}
                  {index === 2 && <Users className="h-4 w-4" />}
                  {index === 3 && <TrendingUp className="h-4 w-4" />}
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-semibold">{item.value}</span>
                <span className={`text-xs mt-1 ${item.positive ? 'text-green-600' : 'text-red-600'}`}>
                  {item.change} from previous period
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue Trends</CardTitle>
            <CardDescription>Monthly platform revenue and vendor growth</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="revenue" stroke="#8884d8" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Category Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Sales by Category</CardTitle>
            <CardDescription>Product category performance breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Vendor Growth */}
        <Card>
          <CardHeader>
            <CardTitle>Vendor Growth</CardTitle>
            <CardDescription>Active vendor count over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="vendors" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Key Metrics */}
        <Card>
          <CardHeader>
            <CardTitle>Key Performance Indicators</CardTitle>
            <CardDescription>Essential marketplace metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Conversion Rate</span>
                <span className="font-semibold">3.2%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Customer Acquisition Cost</span>
                <span className="font-semibold">$25.50</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Customer Lifetime Value</span>
                <span className="font-semibold">$450.00</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Return Rate</span>
                <span className="font-semibold">2.1%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Vendor Retention Rate</span>
                <span className="font-semibold">92%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Platform Commission Revenue</span>
                <span className="font-semibold">$8,750.00</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminReports;
