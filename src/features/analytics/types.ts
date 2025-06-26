export type AnalyticsMetrics = {
  totalSales: number;
  dailySales: number[];
  userCount: number;
  activeUsers: number;
  conversionRate: number;
  averageOrderValue: number;
  topProducts: {
    id: string;
    name: string;
    sales: number;
    revenue: number;
  }[];
  userDemographics: {
    ageGroups: {
      [key: string]: number;
    };
    locations: {
      [key: string]: number;
    };
  };
  productCategories: {
    [key: string]: number;
  };
};

export type VendorPerformance = {
  vendorId: string;
  vendorName: string;
  sales: number;
  revenue: number;
  averageRating: number;
  orderCount: number;
  returnRate: number;
  deliveryPerformance: {
    onTime: number;
    delayed: number;
    total: number;
  };
};
