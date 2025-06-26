
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface ProductProps {
  id: string;
  name: string;
  brandName: string;
  price: number;
  image: string;
  isNew?: boolean;
  category?: string;
  isPopular?: boolean;
}

const products: ProductProps[] = [
  {
    id: "p1",
    name: "Serena Silk Blouse",
    brandName: "ElegantChic",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1554412933-514a83d2f3c8?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    isNew: true,
    category: "tops",
    isPopular: true
  },
  {
    id: "p2",
    name: "Claire Crossbody Bag",
    brandName: "Urban Empress",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    category: "bags",
    isPopular: true
  },
  {
    id: "p3",
    name: "Olivia Pleated Skirt",
    brandName: "Luxe Couture",
    price: 75.99,
    image: "https://images.unsplash.com/photo-1582142306909-195724d0a735?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    isNew: true,
    category: "skirts"
  },
  {
    id: "p4",
    name: "Emma Structured Tote",
    brandName: "Mode Nouveau",
    price: 159.99,
    image: "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    category: "bags",
    isPopular: true
  },
  {
    id: "p5",
    name: "Sofia Summer Dress",
    brandName: "Ethereal Style",
    price: 69.99,
    image: "https://images.unsplash.com/photo-1572122269747-3fc878fea3b5?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    isNew: true,
    category: "dresses",
    isPopular: true
  },
  {
    id: "p6",
    name: "Isabelle Leather Clutch",
    brandName: "Aurea Design",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1559563458-527698bf5295?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    category: "bags"
  },
  {
    id: "p7",
    name: "Luna Wide-Leg Pants",
    brandName: "ElegantChic",
    price: 95.99,
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    category: "pants",
    isPopular: true
  },
  {
    id: "p8",
    name: "Victoria Canvas Tote",
    brandName: "Urban Empress",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    isNew: true,
    category: "bags"
  },
  {
    id: "p9",
    name: "Stella Maxi Dress",
    brandName: "Ethereal Style",
    price: 110.00,
    image: "https://images.unsplash.com/photo-1495385794356-15371f348c31?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    category: "dresses",
    isPopular: true
  },
  {
    id: "p10",
    name: "Amelia Blazer",
    brandName: "Mode Nouveau",
    price: 145.99,
    image: "https://images.unsplash.com/photo-1591369822096-ffd140ec948f?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    category: "outerwear",
    isNew: true
  },
  {
    id: "p11",
    name: "Bianca Leather Boots",
    brandName: "Aurea Design",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    category: "shoes",
    isPopular: true
  },
  {
    id: "p12",
    name: "Aria Statement Earrings",
    brandName: "Luxe Couture",
    price: 45.00,
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    category: "accessories",
    isNew: true
  }
];

const Trending: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-16">
        <div className="max-w-7xl mx-auto px-4 py-12 md:px-8">
          <h1 className="text-4xl font-serif font-medium mb-3 text-center">Trending Now</h1>
          <p className="text-fashion-dark-gray text-center max-w-2xl mx-auto mb-12">
            Discover the season's most coveted styles from our exclusive brands
          </p>
          
          <Tabs defaultValue="all" className="mb-8">
            <TabsList className="mx-auto flex justify-center mb-8">
              <TabsTrigger value="all">All Trending</TabsTrigger>
              <TabsTrigger value="new">New Arrivals</TabsTrigger>
              <TabsTrigger value="popular">Most Popular</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="mt-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="new" className="mt-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {products
                  .filter(product => product.isNew)
                  .map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
              </div>
            </TabsContent>
            
            <TabsContent value="popular" className="mt-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {products
                  .filter(product => product.isPopular)
                  .map((product) => (
                    <ProductCard key={product.id} product={product} />
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

const ProductCard: React.FC<{ product: ProductProps }> = ({ product }) => {
  return (
    <div className="group">
      <Link 
        to={`/products/${product.id}`}
        className="block relative overflow-hidden rounded-md bg-white product-card-shadow mb-4"
      >
        <div className="h-72 overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
        <button 
          className="absolute top-4 right-4 h-8 w-8 rounded-full bg-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={(e) => e.preventDefault()}
        >
          <Heart className="h-4 w-4" />
        </button>
        {product.isNew && (
          <span className="absolute top-4 left-4 bg-fashion-black text-white text-xs px-2 py-1 uppercase tracking-wider">
            New
          </span>
        )}
      </Link>
      <div>
        <Link 
          to={`/brands/${product.brandName.toLowerCase().replace(/\s+/g, '-')}`} 
          className="text-sm text-fashion-dark-gray hover:underline"
        >
          {product.brandName}
        </Link>
        <h3 className="font-medium mt-1 mb-1">
          <Link to={`/products/${product.id}`} className="hover:text-fashion-accent transition-colors">
            {product.name}
          </Link>
        </h3>
        <p className="font-medium">${product.price.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default Trending;
