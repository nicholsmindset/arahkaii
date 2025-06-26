
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Eye, Edit, Trash2, Plus } from 'lucide-react';

const AdvertisingManager: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const mockAds = [
    {
      id: 1,
      vendor: "ElegantChic",
      adType: "Banner",
      placement: "Homepage",
      startDate: "May 1, 2025",
      endDate: "May 31, 2025",
      status: "Active",
      impressions: 15420,
      clicks: 342,
      revenue: "$156.00"
    },
    {
      id: 2,
      vendor: "Urban Empress",
      adType: "Featured",
      placement: "Category Page",
      startDate: "May 15, 2025",
      endDate: "June 15, 2025",
      status: "Pending",
      impressions: 0,
      clicks: 0,
      revenue: "$0.00"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-green-100 text-green-800";
      case "Pending": return "bg-yellow-100 text-yellow-800";
      case "Paused": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Advertising Manager</CardTitle>
          <CardDescription>Manage vendor advertisements and promotional content</CardDescription>
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search ads..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 w-64"
            />
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Ad Campaign
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Vendor</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Placement</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Performance</TableHead>
              <TableHead>Revenue</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockAds.map((ad) => (
              <TableRow key={ad.id}>
                <TableCell className="font-medium">{ad.vendor}</TableCell>
                <TableCell>{ad.adType}</TableCell>
                <TableCell>{ad.placement}</TableCell>
                <TableCell>
                  <div className="text-sm">
                    <div>{ad.startDate}</div>
                    <div className="text-gray-500">to {ad.endDate}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className={getStatusColor(ad.status)}>
                    {ad.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="text-sm">
                    <div>{ad.impressions.toLocaleString()} views</div>
                    <div className="text-gray-500">{ad.clicks} clicks</div>
                  </div>
                </TableCell>
                <TableCell className="font-medium">{ad.revenue}</TableCell>
                <TableCell>
                  <div className="flex gap-1">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Trash2 className="h-4 w-4" />
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

export default AdvertisingManager;
