
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Link } from 'react-router-dom';

interface CategoryProps {
  id: string;
  name: string;
  image: string;
  productCount: number;
  featured?: boolean;
  description?: string;
}

const categories: CategoryProps[] = [
  {
    id: "dresses",
    name: "Dresses",
    image: "https://images.unsplash.com/photo-1568252542512-9fe8fe9c87bb?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    productCount: 458,
    featured: true,
    description: "From casual day dresses to elegant evening wear, find the perfect dress for any occasion."
  },
  {
    id: "bags",
    name: "Bags & Purses",
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    productCount: 327,
    featured: true,
    description: "Elevate your outfit with our selection of designer handbags, crossbody bags, and clutches."
  },
  {
    id: "tops",
    name: "Tops",
    image: "https://images.unsplash.com/photo-1562157873-818bc0726f68?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    productCount: 521,
    featured: true,
    description: "Blouses, t-shirts, and statement tops to refresh your wardrobe essentials."
  },
  {
    id: "skirts",
    name: "Skirts",
    image: "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    productCount: 248,
    description: "From mini to maxi, find the perfect skirt for your style."
  },
  {
    id: "pants",
    name: "Pants & Trousers",
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    productCount: 315,
    description: "Comfortable and stylish pants for work, leisure, and everything in between."
  },
  {
    id: "accessories",
    name: "Accessories",
    image: "https://images.unsplash.com/photo-1589810635657-232948472d98?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    productCount: 412,
    description: "Complete your look with our curated selection of accessories."
  },
  {
    id: "shoes",
    name: "Shoes",
    image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    productCount: 287,
    featured: true,
    description: "Step out in style with our collection of designer shoes for every occasion."
  },
  {
    id: "outerwear",
    name: "Outerwear",
    image: "https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    productCount: 193,
    description: "Coats, jackets, and blazers to keep you warm and stylish."
  },
  {
    id: "activewear",
    name: "Activewear",
    image: "https://images.unsplash.com/photo-1518459031867-a89b944bffe4?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    productCount: 176,
    description: "Performance wear that balances style and functionality."
  }
];

const Categories: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-16">
        <div className="max-w-7xl mx-auto px-4 py-12 md:px-8">
          <h1 className="text-4xl font-serif font-medium mb-3 text-center">Shop by Category</h1>
          <p className="text-fashion-dark-gray text-center max-w-2xl mx-auto mb-12">
            Explore our curated collections across popular categories
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

const CategoryCard: React.FC<{ category: CategoryProps }> = ({ category }) => {
  return (
    <Link 
      to={`/categories/${category.id}`}
      className="group relative overflow-hidden rounded-md h-80 block"
    >
      <img 
        src={category.image} 
        alt={category.name}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
      />
      <div className="absolute inset-0 bg-black bg-opacity-25 group-hover:bg-opacity-40 transition-all"></div>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4">
        <h3 className="text-2xl font-serif mb-2">{category.name}</h3>
        <p className="text-sm">{category.productCount} products</p>
        <span className="mt-4 px-4 py-2 border border-white opacity-0 group-hover:opacity-100 transition-opacity">
          Shop Now
        </span>
      </div>
    </Link>
  );
};

export default Categories;
