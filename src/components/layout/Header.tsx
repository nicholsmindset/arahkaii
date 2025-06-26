
import React from 'react';
import { Link } from 'react-router-dom';
import { Search, User, Heart, ShoppingBag } from 'lucide-react';

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-fashion-light-gray z-50">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="text-2xl font-serif font-bold tracking-tight">
            VENDORIA
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/categories" className="text-sm font-medium hover:text-fashion-accent transition-colors">
              Shop
            </Link>
            <Link to="/brands" className="text-sm font-medium hover:text-fashion-accent transition-colors">
              Brands
            </Link>
            <Link to="/trending" className="text-sm font-medium hover:text-fashion-accent transition-colors">
              Trending
            </Link>
            <Link to="/blog" className="text-sm font-medium hover:text-fashion-accent transition-colors">
              Journal
            </Link>
            <Link to="/vendor-apply" className="text-sm font-medium hover:text-fashion-accent transition-colors">
              Sell
            </Link>
          </nav>

          {/* Right side icons */}
          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-fashion-light-gray rounded-full transition-colors">
              <Search size={20} />
            </button>
            <button className="p-2 hover:bg-fashion-light-gray rounded-full transition-colors">
              <User size={20} />
            </button>
            <button className="p-2 hover:bg-fashion-light-gray rounded-full transition-colors">
              <Heart size={20} />
            </button>
            <button className="p-2 hover:bg-fashion-light-gray rounded-full transition-colors relative">
              <ShoppingBag size={20} />
              <span className="absolute -top-1 -right-1 bg-fashion-accent text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                0
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
