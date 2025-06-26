
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Crown, Star, Package } from 'lucide-react';

const SubscriptionManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const mockSubscriptions = [
    {
      id: 1,
      vendor: "ElegantChic",
      plan: "Elite",
      price: "$179/mo",
      commission: "2%",
      listingLimit: "Unlimited",
      status: "Active",
      nextBilling: "June 1, 2025",
      revenue: "$179.00"
    },
    {
      id: 2,
      vendor: "Urban Empress",
      plan: "Pro",
      price: "$99/mo",
      commission: "5%",
      listingLimit: "100",
      status: "Active",
      nextBilling: "June 5, 2025",
      revenue: "$99.00"
    },
    {
      id: 3,
      vendor: "Luxe Couture",
      plan: "Free",
      price: "$0/mo",
      commission: "10%",
      listingLimit: "10",
      status: "Active",
      nextBilling: "N/A",
      revenue: "$0.00"
    }
  ];

  const getPlanIcon = (plan: string) => {
    switch (plan) {
      case "Elite": return <Crown className="h-4 w-4 text-purple-600" />;
      case "Pro": return <Star className="h-4 w-4 text-blue-600" />;
      case "Free": return <Package className="h-4 w-4 text-gray-600" />;
      default: return <Package className="h-4 w-4" />;
    }
  };

  const getPlanColor = (plan: string) => {
    switch (plan) {
      case "Elite": return "bg-purple-100 text-purple-800";
      case "Pro": return "bg-blue-100 text-blue-800";
      case "Free": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-green-100 text-green-800";
      case "Cancelled": return "bg-red-100 text-red-800";
      case "Past Due": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Subscription Management</CardTitle>
          <CardDescription>Manage vendor subscription plans and billing</CardDescription>
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search subscriptions..."
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
              <SelectItem value="all">All Plans</SelectItem>
              <SelectItem value="elite">Elite</SelectItem>
              <SelectItem value="pro">Pro</SelectItem>
              <SelectItem value="free">Free</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Vendor</TableHead>
              <TableHead>Plan</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Commission</TableHead>
              <TableHead>Listings</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Next Billing</TableHead>
              <TableHead>Revenue</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockSubscriptions.map((subscription) => (
              <TableRow key={subscription.id}>
                <TableCell className="font-medium">{subscription.vendor}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {getPlanIcon(subscription.plan)}
                    <Badge className={getPlanColor(subscription.plan)}>
                      {subscription.plan}
                    </Badge>
                  </div>
                </TableCell>
                <TableCell>{subscription.price}</TableCell>
                <TableCell>{subscription.commission}</TableCell>
                <TableCell>{subscription.listingLimit}</TableCell>
                <TableCell>
                  <Badge className={getStatusColor(subscription.status)}>
                    {subscription.status}
                  </Badge>
                </TableCell>
                <TableCell>{subscription.nextBilling}</TableCell>
                <TableCell className="font-medium">{subscription.revenue}</TableCell>
                <TableCell>
                  <div className="flex gap-1">
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                    <Button variant="outline" size="sm">
                      View
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

export default SubscriptionManagement;
