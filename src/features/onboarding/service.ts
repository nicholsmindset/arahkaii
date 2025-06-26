import { supabase } from '@/lib/supabase';
import { BrandInfo, BusinessDetails, Product } from './types';

export class OnboardingService {
  async saveBrandInfo(brandInfo: BrandInfo) {
    try {
      const { error } = await supabase
        .from('brands')
        .insert([
          {
            name: brandInfo.brandName,
            description: brandInfo.brandDescription,
            logo_url: brandInfo.brandLogo,
            website: brandInfo.brandWebsite,
            social_media: brandInfo.brandSocialMedia,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
        ]);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error saving brand info:', error);
      throw error;
    }
  }

  async saveBusinessDetails(businessDetails: BusinessDetails) {
    try {
      const { error } = await supabase
        .from('businesses')
        .insert([
          {
            name: businessDetails.businessName,
            type: businessDetails.businessType,
            location: businessDetails.businessLocation,
            email: businessDetails.businessEmail,
            phone: businessDetails.businessPhone,
            established_date: businessDetails.businessEstablished,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
        ]);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error saving business details:', error);
      throw error;
    }
  }

  async saveProducts(products: Product[]) {
    try {
      const { error } = await supabase
        .from('products')
        .insert(
          products.map((product) => ({
            name: product.name,
            description: product.description,
            price: product.price,
            category: product.category,
            images: product.images,
            stock: product.stock,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          }))
        );

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error saving products:', error);
      throw error;
    }
  }

  async getOnboardingProgress(vendorId: string) {
    try {
      const { data: brandData, error: brandError } = await supabase
        .from('brands')
        .select('id')
        .eq('vendor_id', vendorId)
        .single();

      if (brandError) throw brandError;

      const { data: businessData, error: businessError } = await supabase
        .from('businesses')
        .select('id')
        .eq('vendor_id', vendorId)
        .single();

      if (businessError) throw businessError;

      const { data: productsData, error: productsError } = await supabase
        .from('products')
        .select('id')
        .eq('vendor_id', vendorId);

      if (productsError) throw productsError;

      return {
        brandCompleted: !!brandData?.id,
        businessCompleted: !!businessData?.id,
        productsCompleted: productsData?.length >= 3,
      };
    } catch (error) {
      console.error('Error getting onboarding progress:', error);
      throw error;
    }
  }
}
