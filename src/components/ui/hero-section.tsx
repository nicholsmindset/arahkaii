
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroSection: React.FC = () => {
  return (
    <section className="relative h-screen min-h-[600px] max-h-[800px] mt-16">
      {/* Hero Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80"
          alt="Fashion collection"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 hero-gradient"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center text-white text-center px-4 md:px-8">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium max-w-4xl leading-tight mb-6">
          Discover Exceptional Fashion from Premium Brands
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mb-10">
          Your destination for curated collections from established and emerging designers
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link 
            to="/categories"
            className="px-8 py-3 bg-white text-fashion-black text-sm font-medium uppercase tracking-wider hover:bg-opacity-90 transition-colors"
          >
            Shop Now
          </Link>
          <Link 
            to="/vendor-apply"
            className="px-8 py-3 border border-white text-white text-sm font-medium uppercase tracking-wider hover:bg-white hover:text-fashion-black transition-colors flex items-center justify-center"
          >
            Sell with Us <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
