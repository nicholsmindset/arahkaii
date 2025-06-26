
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface BrandProps {
  id: string;
  name: string;
  logo: string;
  productCount: number;
}

const brands: BrandProps[] = [
  {
    id: "brand1",
    name: "ElegantChic",
    logo: "https://images.unsplash.com/photo-1560243563-062bfc001d68?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=200&q=80",
    productCount: 125
  },
  {
    id: "brand2",
    name: "Urban Empress",
    logo: "https://images.unsplash.com/photo-1544731612-de7f96afe55f?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=200&q=80",
    productCount: 93
  },
  {
    id: "brand3",
    name: "Luxe Couture",
    logo: "https://images.unsplash.com/photo-1529720317453-c8da503f2051?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=200&q=80",
    productCount: 78
  },
  {
    id: "brand4",
    name: "Mode Nouveau",
    logo: "https://images.unsplash.com/photo-1614846385882-0a92962e259a?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=200&q=80",
    productCount: 112
  },
  {
    id: "brand5",
    name: "Ethereal Style",
    logo: "https://images.unsplash.com/photo-1579298911710-9cd7e59b3a4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=200&q=80",
    productCount: 65
  },
  {
    id: "brand6",
    name: "Aurea Design",
    logo: "https://images.unsplash.com/photo-1594969155368-f19184a7068f?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=200&q=80",
    productCount: 87
  }
];

const FeaturedBrands: React.FC = () => {
  return (
    <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-end mb-10">
        <div>
          <h2 className="text-3xl font-serif font-medium mb-2">Featured Brands</h2>
          <p className="text-fashion-dark-gray">Discover curated collections from our premium vendors</p>
        </div>
        <Link to="/brands" className="hidden md:flex items-center text-sm font-medium hover:text-fashion-accent transition-colors">
          View all brands <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {brands.map((brand) => (
          <Link 
            key={brand.id} 
            to={`/brands/${brand.id}`}
            className="group block overflow-hidden bg-fashion-cream rounded-md product-card-shadow transition-all duration-300 hover:-translate-y-1"
          >
            <div className="h-48 overflow-hidden relative">
              <img
                src={brand.logo}
                alt={brand.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-white font-medium px-4 py-2 border border-white rounded">Explore Brand</span>
              </div>
            </div>
            <div className="p-5">
              <h3 className="text-xl font-medium mb-1">{brand.name}</h3>
              <p className="text-fashion-dark-gray text-sm">{brand.productCount} products</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-10 text-center md:hidden">
        <Link 
          to="/brands" 
          className="inline-flex items-center text-sm font-medium px-5 py-2 border border-fashion-black rounded hover:bg-fashion-black hover:text-white transition-colors"
        >
          View all brands <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </div>
    </section>
  );
};

export default FeaturedBrands;
