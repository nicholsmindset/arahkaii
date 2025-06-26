
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, DollarSign, Download, Settings } from 'lucide-react';

const PaymentManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const mockPayments = [
    {
      id: 1,
      vendor: "ElegantChic",
      amount: "$1,250.00",
      commission: "$187.50",
      netPayout: "$1,062.50",
      status: "Completed",
      date: "May 20, 2025",
      method: "Stripe"
    },
    {
      id: 2,
      vendor: "Urban Empress",
      amount: "$980.00",
      commission: "$147.00",
      netPayout: "$833.00",
      status: "Pending",
      date: "May 19, 2025",
      method: "PayPal"
    },
    {
      id: 3,
      vendor: "Luxe Couture",
      amount: "$2,100.00",
      commission: "$105.00",
      netPayout: "$1,995.00",
      status: "Processing",
      date: "May 18, 2025",
      method: "Bank Transfer"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed": return "bg-green-100 text-green-800";
      case "Pending": return "bg-yellow-100 text-yellow-800";
      case "Processing": return "bg-blue-100 text-blue-800";
      case "Failed": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Payment & Payout Management</CardTitle>
            <CardDescription>Manage vendor payouts and commission settings</CardDescription>
          </div>
          <div className="flex gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search payments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 w-64"
              />
            </div>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button>
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Vendor</TableHead>
                <TableHead>Gross Amount</TableHead>
                <TableHead>Commission</TableHead>
                <TableHead>Net Payout</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Method</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockPayments.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell className="font-medium">{payment.vendor}</TableCell>
                  <TableCell>{payment.amount}</TableCell>
                  <TableCell className="text-red-600">{payment.commission}</TableCell>
                  <TableCell className="font-medium text-green-600">{payment.netPayout}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(payment.status)}>
                      {payment.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{payment.date}</TableCell>
                  <TableCell>{payment.method}</TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                      <Button variant="outline" size="sm">
                        <DollarSign className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentManagement;
