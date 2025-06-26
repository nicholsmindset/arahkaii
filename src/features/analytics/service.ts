import { AnalyticsMetrics, VendorPerformance } from './types';
import { mockMetrics, mockVendorPerformance } from './mock';

export class AnalyticsService {
  async getDashboardMetrics(): Promise<AnalyticsMetrics> {
    return mockMetrics;
  }

  private calculateDailySales(orders: any[]): number[] {
    const dailySales = Array(30).fill(0);
    
    orders.forEach(order => {
      const date = new Date(order.created_at);
      const daysAgo = Math.floor((Date.now() - date.getTime()) / (1000 * 60 * 60 * 24));
      if (daysAgo < 30) {
        dailySales[daysAgo] += order.total_amount;
      }
    });

    return dailySales.reverse();
  }

  private async getUserCount(): Promise<number> {
    const { count } = await supabase
      .from('users')
      .select('*', { count: 'exact' });

    return count || 0;
  }

  private async getActiveUsers(): Promise<number> {
    const { count } = await supabase
      .from('user_activity')
      .select('*', { count: 'exact' })
      .gte('last_active_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString());

    return count || 0;
  }

  private async getConversionRate(): Promise<number> {
    const { count: visitors } = await supabase
      .from('visitors')
      .select('*', { count: 'exact' });

    const { count: orders } = await supabase
      .from('orders')
      .select('*', { count: 'exact' });

    return visitors ? (orders / visitors) * 100 : 0;
  }

  private calculateAverageOrderValue(orders: any[]): number {
    const total = orders.reduce((sum, order) => sum + order.total_amount, 0);
    return orders.length > 0 ? total / orders.length : 0;
  }

  private async getTopProducts(): Promise<AnalyticsMetrics['topProducts']> {
    const { data, error } = await supabase
      .from('products')
      .select('id, name, sales, revenue')
      .order('sales', { ascending: false })
      .limit(10);

    if (error) throw error;
    return data || [];
  }

  private async getUserDemographics(): Promise<AnalyticsMetrics['userDemographics']> {
    const { data, error } = await supabase
      .from('users')
      .select('age_group, location');

    if (error) throw error;

    const demographics = {
      ageGroups: {} as { [key: string]: number },
      locations: {} as { [key: string]: number },
    };

    data.forEach(user => {
      demographics.ageGroups[user.age_group] = (demographics.ageGroups[user.age_group] || 0) + 1;
      demographics.locations[user.location] = (demographics.locations[user.location] || 0) + 1;
    });

    return demographics;
  }

  private async getProductCategories(): Promise<AnalyticsMetrics['productCategories']> {
    const { data, error } = await supabase
      .from('products')
      .select('category')
      .group('category')
      .count();

    if (error) throw error;

    return data.reduce((acc: { [key: string]: number }, item) => {
      acc[item.category] = item.count;
      return acc;
    }, {});
  }

  async getVendorPerformance(vendorId: string): Promise<VendorPerformance> {
    return mockVendorPerformance;
  }

  private async getVendorName(vendorId: string): Promise<string> {
    const { data, error } = await supabase
      .from('vendors')
      .select('name')
      .eq('id', vendorId)
      .single();

    if (error) throw error;
    return data?.name || '';
  }

  private async getVendorReturnRate(vendorId: string): Promise<number> {
    const { count: returns } = await supabase
      .from('returns')
      .select('*', { count: 'exact' })
      .eq('vendor_id', vendorId);

    const { count: orders } = await supabase
      .from('orders')
      .select('*', { count: 'exact' })
      .eq('vendor_id', vendorId);

    return orders ? (returns / orders) * 100 : 0;
  }

  private calculateDeliveryPerformance(deliveries: any[]): {
    onTime: number;
    delayed: number;
    total: number;
  } {
    const performance = {
      onTime: 0,
      delayed: 0,
      total: deliveries.length
    };

    deliveries.forEach(delivery => {
      if (delivery.status === 'delivered') {
        const deliveryTime = new Date(delivery.delivered_at).getTime() - new Date(delivery.created_at).getTime();
        const expectedTime = delivery.expected_delivery_time * 24 * 60 * 60 * 1000;
        
        if (deliveryTime <= expectedTime) {
          performance.onTime++;
        } else {
          performance.delayed++;
        }
      }
    });

    return performance;
  }
}
