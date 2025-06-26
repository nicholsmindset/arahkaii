
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ArrowRight, TrendingUp, Package, DollarSign, Users, ShoppingCart } from 'lucide-react';

const VendorDashboard: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-16">
        <div className="max-w-7xl mx-auto px-4 py-8 md:px-8">
          {/* Dashboard Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-serif font-medium">Vendor Dashboard</h1>
            <p className="text-fashion-dark-gray">Welcome back, ElegantChic</p>
          </div>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatsCard 
              title="Total Sales" 
              value="$12,456.78" 
              change="+14.5%" 
              icon={<DollarSign className="h-6 w-6" />}
              positive={true}
            />
            <StatsCard 
              title="Orders" 
              value="253" 
              change="+7.2%" 
              icon={<ShoppingCart className="h-6 w-6" />}
              positive={true}
            />
            <StatsCard 
              title="Products" 
              value="125" 
              change="+2" 
              icon={<Package className="h-6 w-6" />}
              positive={true}
            />
            <StatsCard 
              title="Customers" 
              value="1,856" 
              change="+32.1%" 
              icon={<Users className="h-6 w-6" />}
              positive={true}
            />
          </div>
          
          {/* Main Dashboard Content */}
          <Tabs defaultValue="orders" className="mb-8">
            <TabsList>
              <TabsTrigger value="orders">Recent Orders</TabsTrigger>
              <TabsTrigger value="products">Products</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>
            
            <TabsContent value="orders" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Orders</CardTitle>
                  <CardDescription>Manage your latest customer orders</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Order ID</TableHead>
                        <TableHead>Customer</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">#ORD-7851</TableCell>
                        <TableCell>Sophie Chen</TableCell>
                        <TableCell>May 20, 2025</TableCell>
                        <TableCell>
                          <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Completed</span>
                        </TableCell>
                        <TableCell className="text-right">$159.99</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">#ORD-7850</TableCell>
                        <TableCell>Maria Johnson</TableCell>
                        <TableCell>May 20, 2025</TableCell>
                        <TableCell>
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">Processing</span>
                        </TableCell>
                        <TableCell className="text-right">$89.99</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">#ORD-7849</TableCell>
                        <TableCell>Alexis Wong</TableCell>
                        <TableCell>May 19, 2025</TableCell>
                        <TableCell>
                          <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">Shipped</span>
                        </TableCell>
                        <TableCell className="text-right">$175.98</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">#ORD-7848</TableCell>
                        <TableCell>Emma Davis</TableCell>
                        <TableCell>May 19, 2025</TableCell>
                        <TableCell>
                          <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Completed</span>
                        </TableCell>
                        <TableCell className="text-right">$215.99</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">#ORD-7847</TableCell>
                        <TableCell>Jasmine Taylor</TableCell>
                        <TableCell>May 18, 2025</TableCell>
                        <TableCell>
                          <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Completed</span>
                        </TableCell>
                        <TableCell className="text-right">$69.99</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                  
                  <div className="mt-4 text-right">
                    <a href="#" className="inline-flex items-center text-sm text-fashion-accent">
                      View all orders <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="products" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Your Products</CardTitle>
                  <CardDescription>Manage your product catalog</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Product</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Stock</TableHead>
                        <TableHead>Sales</TableHead>
                        <TableHead className="text-right">Price</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">Serena Silk Blouse</TableCell>
                        <TableCell>Tops</TableCell>
                        <TableCell>23</TableCell>
                        <TableCell>145</TableCell>
                        <TableCell className="text-right">$89.99</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Luna Wide-Leg Pants</TableCell>
                        <TableCell>Pants</TableCell>
                        <TableCell>15</TableCell>
                        <TableCell>78</TableCell>
                        <TableCell className="text-right">$95.99</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Amara Mini Dress</TableCell>
                        <TableCell>Dresses</TableCell>
                        <TableCell>8</TableCell>
                        <TableCell>62</TableCell>
                        <TableCell className="text-right">$110.00</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Zoe Cardigan</TableCell>
                        <TableCell>Outerwear</TableCell>
                        <TableCell>31</TableCell>
                        <TableCell>56</TableCell>
                        <TableCell className="text-right">$75.99</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Lila Silk Scarf</TableCell>
                        <TableCell>Accessories</TableCell>
                        <TableCell>42</TableCell>
                        <TableCell>93</TableCell>
                        <TableCell className="text-right">$45.00</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                  
                  <div className="mt-4 text-right">
                    <a href="#" className="inline-flex items-center text-sm text-fashion-accent">
                      View all products <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="analytics" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Performance Analytics</CardTitle>
                  <CardDescription>Track your store performance metrics</CardDescription>
                </CardHeader>
                <CardContent className="h-80 flex items-center justify-center">
                  <div className="text-center">
                    <TrendingUp className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                    <p className="text-fashion-dark-gray">Analytics visualization will appear here</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

interface StatsCardProps {
  title: string;
  value: string;
  change: string;
  icon: React.ReactNode;
  positive?: boolean;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, change, icon, positive = true }) => {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-fashion-dark-gray text-sm">{title}</span>
          <div className="text-white bg-fashion-black rounded-full p-2">
            {icon}
          </div>
        </div>
        <div className="flex flex-col">
          <span className="text-2xl font-semibold">{value}</span>
          <span className={`text-xs mt-1 ${positive ? 'text-green-600' : 'text-red-600'}`}>
            {change} from previous month
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default VendorDashboard;
