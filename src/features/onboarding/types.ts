export type BrandInfo = {
  brandName: string;
  brandDescription: string;
  brandLogo: string;
  brandWebsite: string;
  brandSocialMedia: {
    instagram?: string;
    facebook?: string;
    twitter?: string;
  };
};

export type BusinessDetails = {
  businessName: string;
  businessType: string;
  businessLocation: string;
  businessEmail: string;
  businessPhone: string;
  businessEstablished: string;
};

export type Product = {
  name: string;
  description: string;
  price: number;
  category: string;
  images: string[];
  stock: number;
};

export type OnboardingProgress = {
  step: number;
  totalSteps: number;
  completedSteps: number[];
  currentStep: 'brand' | 'business' | 'products' | 'complete';
};

export type OnboardingData = {
  brandInfo: BrandInfo;
  businessDetails: BusinessDetails;
  products: Product[];
};
