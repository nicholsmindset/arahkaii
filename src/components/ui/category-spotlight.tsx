
import React from 'react';
import { Link } from 'react-router-dom';

interface CategoryProps {
  id: string;
  name: string;
  image: string;
  productCount: number;
}

const categories: CategoryProps[] = [
  {
    id: "dresses",
    name: "Dresses",
    image: "https://images.unsplash.com/photo-1568252542512-9fe8fe9c87bb?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    productCount: 458
  },
  {
    id: "bags",
    name: "Bags & Purses",
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    productCount: 327
  },
  {
    id: "tops",
    name: "Tops",
    image: "https://images.unsplash.com/photo-1562157873-818bc0726f68?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    productCount: 521
  }
];

const CategorySpotlight: React.FC = () => {
  return (
    <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
      <h2 className="text-3xl font-serif font-medium text-center mb-3">Shop by Category</h2>
      <p className="text-fashion-dark-gray text-center max-w-2xl mx-auto mb-12">
        Explore our curated collections across popular categories
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {categories.map((category) => (
          <Link 
            key={category.id}
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
        ))}
      </div>
      
      <div className="text-center mt-12">
        <Link 
          to="/categories"
          className="inline-block px-6 py-3 border border-fashion-black text-sm font-medium uppercase tracking-wider hover:bg-fashion-black hover:text-white transition-colors"
        >
          View all categories
        </Link>
      </div>
    </section>
  );
};

export default CategorySpotlight;
