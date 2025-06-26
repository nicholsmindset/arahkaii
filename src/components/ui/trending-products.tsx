
import React from 'react';
import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ProductProps {
  id: string;
  name: string;
  brandName: string;
  price: number;
  image: string;
  isNew?: boolean;
}

const products: ProductProps[] = [
  {
    id: "p1",
    name: "Serena Silk Blouse",
    brandName: "ElegantChic",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1554412933-514a83d2f3c8?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    isNew: true
  },
  {
    id: "p2",
    name: "Claire Crossbody Bag",
    brandName: "Urban Empress",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "p3",
    name: "Olivia Pleated Skirt",
    brandName: "Luxe Couture",
    price: 75.99,
    image: "https://images.unsplash.com/photo-1582142306909-195724d0a735?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    isNew: true
  },
  {
    id: "p4",
    name: "Emma Structured Tote",
    brandName: "Mode Nouveau",
    price: 159.99,
    image: "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "p5",
    name: "Sofia Summer Dress",
    brandName: "Ethereal Style",
    price: 69.99,
    image: "https://images.unsplash.com/photo-1572122269747-3fc878fea3b5?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    isNew: true
  },
  {
    id: "p6",
    name: "Isabelle Leather Clutch",
    brandName: "Aurea Design",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1559563458-527698bf5295?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "p7",
    name: "Luna Wide-Leg Pants",
    brandName: "ElegantChic",
    price: 95.99,
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "p8",
    name: "Victoria Canvas Tote",
    brandName: "Urban Empress",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    isNew: true
  }
];

const TrendingProducts: React.FC = () => {
  return (
    <section className="py-16 px-4 md:px-8 bg-fashion-cream">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-serif font-medium text-center mb-3">Trending Now</h2>
        <p className="text-fashion-dark-gray text-center max-w-2xl mx-auto mb-12">
          Discover the season's most coveted styles from our exclusive brands
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id} className="group">
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
          ))}
        </div>

        <div className="text-center mt-12">
          <Link 
            to="/trending"
            className="inline-block px-6 py-3 bg-fashion-black text-white text-sm font-medium uppercase tracking-wider hover:bg-opacity-80 transition-all"
          >
            View all trending items
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TrendingProducts;
