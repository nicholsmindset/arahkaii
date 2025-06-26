
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ProductGrid from '@/components/vendor/ProductGrid';
import VendorReviews from '@/components/vendor/VendorReviews';

interface VendorTabsProps {
  vendorId: string;
}

const VendorTabs: React.FC<VendorTabsProps> = ({ vendorId }) => {
  return (
    <Tabs defaultValue="all-products" className="w-full">
      <TabsList className="grid w-full grid-cols-4 mb-8">
        <TabsTrigger value="all-products">All Products</TabsTrigger>
        <TabsTrigger value="best-sellers">Best Sellers</TabsTrigger>
        <TabsTrigger value="new-arrivals">New Arrivals</TabsTrigger>
        <TabsTrigger value="reviews">Reviews</TabsTrigger>
      </TabsList>
      
      <TabsContent value="all-products">
        <ProductGrid filter="all" vendorId={vendorId} />
      </TabsContent>
      
      <TabsContent value="best-sellers">
        <ProductGrid filter="best-sellers" vendorId={vendorId} />
      </TabsContent>
      
      <TabsContent value="new-arrivals">
        <ProductGrid filter="new-arrivals" vendorId={vendorId} />
      </TabsContent>
      
      <TabsContent value="reviews">
        <VendorReviews vendorId={vendorId} />
      </TabsContent>
    </Tabs>
  );
};

export default VendorTabs;
