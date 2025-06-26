
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/ui/hero-section';
import FeaturedBrands from '@/components/ui/featured-brands';
import CategorySpotlight from '@/components/ui/category-spotlight';
import TrendingProducts from '@/components/ui/trending-products';
import VendorCTA from '@/components/ui/vendor-cta';
import TestimonialSection from '@/components/ui/testimonial-section';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <CategorySpotlight />
        <TrendingProducts />
        <FeaturedBrands />
        <VendorCTA />
        <TestimonialSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
