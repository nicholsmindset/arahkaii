
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Settings, Eye, MessageSquare } from 'lucide-react';

const VendorManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const mockVendors = [
    {
      id: 1,
      name: "ElegantChic",
      email: "contact@elegantchic.com",
      products: 125,
      joinDate: "Jan 15, 2024",
      status: "Active",
      subscription: "Elite",
      commission: "2%",
      revenue: "$45,876.32"
    },
    {
      id: 2,
      name: "Urban Empress",
      email: "hello@urbanempress.com",
      products: 93,
      joinDate: "Feb 28, 2024",
      status: "Active",
      subscription: "Pro",
      commission: "5%",
      revenue: "$38,234.87"
    },
    {
      id: 3,
      name: "Luxe Couture",
      email: "info@luxecouture.com",
      products: 78,
      joinDate: "Mar 10, 2024",
      status: "Pending",
      subscription: "Free",
      commission: "10%",
      revenue: "$0.00"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-green-100 text-green-800";
      case "Pending": return "bg-yellow-100 text-yellow-800";
      case "Suspended": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getSubscriptionColor = (subscription: string) => {
    switch (subscription) {
      case "Elite": return "bg-purple-100 text-purple-800";
      case "Pro": return "bg-blue-100 text-blue-800";
      case "Free": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Vendor Management</CardTitle>
          <CardDescription>Manage vendors, applications, and commission settings</CardDescription>
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search vendors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 w-64"
            />
          </div>
          <Select>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="suspended">Suspended</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Vendor</TableHead>
              <TableHead>Products</TableHead>
              <TableHead>Subscription</TableHead>
              <TableHead>Commission</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Revenue</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockVendors.map((vendor) => (
              <TableRow key={vendor.id}>
                <TableCell>
                  <div>
                    <div className="font-medium">{vendor.name}</div>
                    <div className="text-sm text-gray-500">{vendor.email}</div>
                  </div>
                </TableCell>
                <TableCell>{vendor.products}</TableCell>
                <TableCell>
                  <Badge className={getSubscriptionColor(vendor.subscription)}>
                    {vendor.subscription}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Button variant="outline" size="sm">
                    {vendor.commission}
                  </Button>
                </TableCell>
                <TableCell>
                  <Badge className={getStatusColor(vendor.status)}>
                    {vendor.status}
                  </Badge>
                </TableCell>
                <TableCell className="font-medium">{vendor.revenue}</TableCell>
                <TableCell>
                  <div className="flex gap-1">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Settings className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <MessageSquare className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default VendorManagement;
