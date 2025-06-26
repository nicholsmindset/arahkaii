import { AnalyticsMetrics, VendorPerformance } from './types';
import { supabase } from '@/lib/supabase';

export class AnalyticsService {
  async getDashboardMetrics(): Promise<AnalyticsMetrics> {
    try {
      // Get total sales
      const { data: ordersData, error: ordersError } = await supabase
        .from('orders')
        .select('total_amount')
        .eq('status', 'completed');

      if (ordersError) throw ordersError;

      // Get daily sales
      const { data: dailySalesData, error: dailySalesError } = await supabase
        .from('orders')
        .select('total_amount, created_at')
        .eq('status', 'completed')
        .order('created_at', { ascending: true });

      if (dailySalesError) throw dailySalesError;

      // Get user counts
      const { count: userCount, error: userCountError } = await supabase
        .from('users')
        .select('*', { count: 'exact' });

      if (userCountError) throw userCountError;

      // Get active users (last 30 days)
      const { count: activeUsers, error: activeUsersError } = await supabase
        .from('users')
        .select('*', { count: 'exact' })
        .gte('last_login', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000));

      if (activeUsersError) throw activeUsersError;

      // Get conversion rate
      const { count: totalOrders, error: totalOrdersError } = await supabase
        .from('orders')
        .select('*', { count: 'exact' });

      if (totalOrdersError) throw totalOrdersError;

      const { count: totalVisits, error: totalVisitsError } = await supabase
        .from('users')
        .select('*', { count: 'exact' });

      if (totalVisitsError) throw totalVisitsError;

      // Get top products using SQL function
      const { data: topProductsData, error: topProductsError } = await supabase
        .rpc('get_top_products', { days: 30 });

      if (topProductsError) throw topProductsError;

      // Get user demographics using SQL function
      const { data: demographicsData, error: demographicsError } = await supabase
        .rpc('get_user_demographics');

      if (demographicsError) throw demographicsError;

      // Get product categories using SQL function
      const { data: categoryData, error: categoryError } = await supabase
        .rpc('get_product_categories');

      if (categoryError) throw categoryError;

      return {
        totalSales: ordersData?.reduce((sum, order) => sum + order.total_amount, 0) || 0,
        dailySales: dailySalesData?.map(order => order.total_amount) || [],
        userCount: userCount || 0,
        activeUsers: activeUsers || 0,
        conversionRate: totalVisits > 0 ? (totalOrders / totalVisits) * 100 : 0,
        averageOrderValue: ordersData?.length > 0 ? 
          ordersData.reduce((sum, order) => sum + order.total_amount, 0) / ordersData.length : 0,
        topProducts: topProductsData?.map(product => ({
          id: product.product_id,
          name: product.name, // Add name field to match type definition
          sales: product.total_quantity,
          revenue: product.total_revenue
        })) || [],
        userDemographics: {
          ageGroups: demographicsData?.reduce((acc, item) => {
            acc[item.age_group] = item.age_count;
            return acc;
          }, {}) || {},
          locations: demographicsData?.reduce((acc, item) => {
            acc[item.location] = item.location_count;
            return acc;
          }, {}) || {}
        },
        productCategories: categoryData?.reduce((acc, item) => {
          acc[item.category] = item.count; // Simplify to match type definition
          return acc;
        }, {}) || {}
      };
    } catch (error) {
      console.error('Error fetching dashboard metrics:', error);
      throw error;
    }
  }

  async getVendorPerformance(vendorId: string): Promise<VendorPerformance> {
    try {
      // Get vendor performance using SQL function
      const { data: vendorData, error: vendorError } = await supabase
        .rpc('get_vendor_performance', { vendor_id: vendorId });

      if (vendorError) throw vendorError;

      const vendor = vendorData?.[0];
      
      if (!vendor) {
        throw new Error('Vendor not found');
      }

      return {
        vendorId: vendor.vendor_id,
        vendorName: vendor.vendor_name,
        sales: vendor.total_sales,
        revenue: vendor.total_revenue,
        averageRating: vendor.average_rating,
        orderCount: vendor.order_count,
        returnRate: 0, // Will need to implement return tracking
        deliveryPerformance: {
          onTime: vendor.on_time_deliveries,
          delayed: vendor.delayed_deliveries,
          total: vendor.total_deliveries
        }
      };
    } catch (error) {
      console.error('Error fetching vendor performance:', error);
      throw error;
    }
  }

