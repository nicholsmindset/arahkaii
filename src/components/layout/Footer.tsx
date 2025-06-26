
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-fashion-black text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Column 1 - About */}
          <div>
            <h3 className="text-lg font-medium mb-4">VENDORIA</h3>
            <p className="text-fashion-light-gray text-sm mb-4">
              The premium marketplace connecting fashion-forward shoppers with exceptional brands and designers.
            </p>
            <div className="flex space-x-4">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-fashion-accent">
                <Instagram size={20} />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-fashion-accent">
                <Facebook size={20} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-fashion-accent">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Column 2 - Shop */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider mb-4">Shop</h3>
            <ul className="space-y-2 text-fashion-light-gray text-sm">
              <li><Link to="/categories" className="hover:text-white">New Arrivals</Link></li>
              <li><Link to="/categories" className="hover:text-white">Best Sellers</Link></li>
              <li><Link to="/categories" className="hover:text-white">Trending Now</Link></li>
              <li><Link to="/brands" className="hover:text-white">All Brands</Link></li>
              <li><Link to="/sale" className="hover:text-white">Sale</Link></li>
            </ul>
          </div>

          {/* Column 3 - Content & Community */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider mb-4">Discover</h3>
            <ul className="space-y-2 text-fashion-light-gray text-sm">
              <li><Link to="/blog" className="hover:text-white">Journal</Link></li>
              <li><Link to="/trending" className="hover:text-white">Trending</Link></li>
              <li><Link to="/help" className="hover:text-white">Contact Us</Link></li>
              <li><Link to="/help/shipping" className="hover:text-white">Shipping Information</Link></li>
              <li><Link to="/help/returns" className="hover:text-white">Returns & Exchanges</Link></li>
            </ul>
          </div>

          {/* Column 4 - Vendors */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider mb-4">Vendors</h3>
            <ul className="space-y-2 text-fashion-light-gray text-sm">
              <li><Link to="/vendor-apply" className="hover:text-white">Sell with Us</Link></li>
              <li><Link to="/vendor-terms" className="hover:text-white">Vendor Terms</Link></li>
              <li><Link to="/vendor-faq" className="hover:text-white">Vendor FAQ</Link></li>
              <li><Link to="/vendor-login" className="hover:text-white">Vendor Login</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom area with legal links */}
        <div className="border-t border-gray-700 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-fashion-light-gray text-xs mb-4 md:mb-0">
              © {new Date().getFullYear()} VENDORIA. All rights reserved.
            </p>
            <div className="flex space-x-6 text-xs text-fashion-light-gray">
              <Link to="/privacy" className="hover:text-white">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-white">Terms of Service</Link>
              <Link to="/accessibility" className="hover:text-white">Accessibility</Link>
              <Link to="/cookie-policy" className="hover:text-white">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
