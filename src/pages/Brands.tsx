
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface BrandProps {
  id: string;
  name: string;
  logo: string;
  productCount: number;
  featured?: boolean;
  description?: string;
  yearFounded?: number;
  location?: string;
}

const brands: BrandProps[] = [
  {
    id: "brand1",
    name: "ElegantChic",
    logo: "https://images.unsplash.com/photo-1560243563-062bfc001d68?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=200&q=80",
    productCount: 125,
    featured: true,
    description: "Effortless elegance for the modern woman - our designs blend timeless silhouettes with contemporary details.",
    yearFounded: 2014,
    location: "Paris, France"
  },
  {
    id: "brand2",
    name: "Urban Empress",
    logo: "https://images.unsplash.com/photo-1544731612-de7f96afe55f?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=200&q=80",
    productCount: 93,
    featured: true,
    description: "Bold styles for the city-dwelling fashionista who isn't afraid to stand out.",
    yearFounded: 2016,
    location: "New York, USA"
  },
  {
    id: "brand3",
    name: "Luxe Couture",
    logo: "https://images.unsplash.com/photo-1529720317453-c8da503f2051?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=200&q=80",
    productCount: 78,
    description: "Luxury craftsmanship and premium materials define our exclusive collections.",
    yearFounded: 2010,
    location: "Milan, Italy"
  },
  {
    id: "brand4",
    name: "Mode Nouveau",
    logo: "https://images.unsplash.com/photo-1614846385882-0a92962e259a?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=200&q=80",
    productCount: 112,
    featured: true,
    description: "Avant-garde designs with a focus on sustainability and ethical production.",
    yearFounded: 2018,
    location: "Copenhagen, Denmark"
  },
  {
    id: "brand5",
    name: "Ethereal Style",
    logo: "https://images.unsplash.com/photo-1579298911710-9cd7e59b3a4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=200&q=80",
    productCount: 65,
    description: "Dreamy, feminine pieces inspired by nature and vintage aesthetics.",
    yearFounded: 2017,
    location: "Sydney, Australia"
  },
  {
    id: "brand6",
    name: "Aurea Design",
    logo: "https://images.unsplash.com/photo-1594969155368-f19184a7068f?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=200&q=80",
    productCount: 87,
    description: "Minimalist luxury with an emphasis on clean lines and exceptional quality.",
    yearFounded: 2015,
    location: "Stockholm, Sweden"
  },
  {
    id: "brand7",
    name: "Maison Élégance",
    logo: "https://images.unsplash.com/photo-1608228088998-57828365d486?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=200&q=80",
    productCount: 104,
    description: "French-inspired accessories and ready-to-wear for the sophisticated woman.",
    yearFounded: 2013,
    location: "Lyon, France"
  },
  {
    id: "brand8",
    name: "Velvet Rouge",
    logo: "https://images.unsplash.com/photo-1607083206968-13611e3d76db?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=200&q=80",
    productCount: 59,
    description: "Bold colors and sumptuous textures define our statement pieces.",
    yearFounded: 2019,
    location: "Barcelona, Spain"
  }
];

const Brands: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-16">
        <div className="max-w-7xl mx-auto px-4 py-12 md:px-8">
          <div className="flex flex-col md:flex-row items-baseline justify-between mb-8">
            <div>
              <h1 className="text-4xl font-serif font-medium mb-2">Our Brands</h1>
              <p className="text-fashion-dark-gray max-w-2xl">
                Discover exceptional fashion from established and emerging designers all in one place.
              </p>
            </div>
            <Link 
              to="/vendor-apply"
              className="mt-4 md:mt-0 flex items-center text-sm font-medium hover:text-fashion-accent transition-colors"
            >
              Sell with us <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>

          <Tabs defaultValue="all" className="mb-8">
            <TabsList>
              <TabsTrigger value="all">All Brands</TabsTrigger>
              <TabsTrigger value="featured">Featured</TabsTrigger>
              <TabsTrigger value="new">New Arrivals</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="mt-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {brands.map((brand) => (
                  <BrandCard key={brand.id} brand={brand} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="featured" className="mt-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {brands
                  .filter(brand => brand.featured)
                  .map((brand) => (
                    <BrandCard key={brand.id} brand={brand} />
                  ))}
              </div>
            </TabsContent>
            
            <TabsContent value="new" className="mt-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {brands
                  .filter(brand => brand.yearFounded && brand.yearFounded >= 2018)
                  .map((brand) => (
                    <BrandCard key={brand.id} brand={brand} />
                  ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

const BrandCard: React.FC<{ brand: BrandProps }> = ({ brand }) => {
  return (
    <Card className="overflow-hidden">
      <div className="h-48 overflow-hidden relative">
        <img
          src={brand.logo}
          alt={brand.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 hover:opacity-100 flex items-center justify-center transition-opacity">
          <Button variant="outline" className="bg-white text-black border-white">
            View Products
          </Button>
        </div>
      </div>
      <CardContent className="p-5">
        <h3 className="text-xl font-medium mb-1">{brand.name}</h3>
        <p className="text-fashion-dark-gray text-sm mb-2">{brand.productCount} products</p>
        {brand.location && (
          <p className="text-xs text-fashion-dark-gray">{brand.location}</p>
        )}
      </CardContent>
    </Card>
  );
};

export default Brands;
