import { AnalyticsMetrics, VendorPerformance } from './types';

export const mockMetrics: AnalyticsMetrics = {
  totalSales: 15678,
  dailySales: Array(30).fill(0).map(() => Math.floor(Math.random() * 1000)),
  userCount: 12345,
  activeUsers: 8976,
  conversionRate: 2.56,
  averageOrderValue: 125.75,
  topProducts: [
    { id: '1', name: 'Summer Dress', sales: 120, revenue: 3600 },
    { id: '2', name: 'Casual T-Shirt', sales: 95, revenue: 2375 },
    { id: '3', name: 'Winter Coat', sales: 82, revenue: 4100 },
    { id: '4', name: 'Leather Bag', sales: 75, revenue: 3750 },
    { id: '5', name: 'Running Shoes', sales: 68, revenue: 2720 },
  ],
  userDemographics: {
    ageGroups: {
      '18-24': 35,
      '25-34': 45,
      '35-44': 15,
      '45+': 5,
    },
    locations: {
      'New York': 25,
      'Los Angeles': 20,
      'Chicago': 15,
      'Houston': 10,
      'Other': 30,
    },
  },
  productCategories: {
    'Dresses': 25,
    'Tops': 20,
    'Bottoms': 15,
    'Accessories': 10,
    'Shoes': 10,
    'Outerwear': 5,
  },
};

export const mockVendorPerformance: VendorPerformance = {
  vendorId: '123',
  vendorName: 'Fashion Co.',
  sales: 567,
  revenue: 28350,
  averageRating: 4.5,
  orderCount: 567,
  returnRate: 2.5,
  deliveryPerformance: {
    onTime: 540,
    delayed: 27,
    total: 567,
  },
};
