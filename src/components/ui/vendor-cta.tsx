
import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

const VendorCTA: React.FC = () => {
  const benefits = [
    "Access to fashion-forward consumers",
    "Lower fees than competing marketplaces",
    "Powerful brand storytelling tools",
    "Easy integration with existing systems",
    "Dedicated vendor support team",
    "Advanced analytics dashboard"
  ];

  return (
    <section className="py-16 px-4 md:px-8 bg-fashion-white">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="flex flex-col justify-center">
          <h2 className="text-3xl md:text-4xl font-serif font-medium mb-6">
            Join Our Growing Community of Premium Brands
          </h2>
          <p className="text-fashion-dark-gray mb-8">
            Partner with VENDORIA to showcase your products to fashion-forward consumers. 
            Our platform offers powerful tools, analytics, and support to help your brand thrive.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start">
                <CheckCircle className="h-5 w-5 text-fashion-accent mr-2 flex-shrink-0 mt-0.5" />
                <p className="text-sm">{benefit}</p>
              </div>
            ))}
          </div>
          
          <div className="space-y-4 sm:space-y-0 sm:flex sm:space-x-4">
            <Link
              to="/vendor-apply"
              className="block sm:inline-block text-center px-8 py-3 bg-fashion-black text-white text-sm font-medium uppercase tracking-wider hover:bg-opacity-80 transition-colors"
            >
              Apply to Sell
            </Link>
            <Link
              to="/vendor-login"
              className="block sm:inline-block text-center px-8 py-3 border border-fashion-black text-fashion-black text-sm font-medium uppercase tracking-wider hover:bg-fashion-black hover:text-white transition-colors"
            >
              Vendor Login
            </Link>
          </div>
        </div>
        
        <div className="relative h-[400px] lg:h-auto">
          <img 
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
            alt="Fashion designer working"
            className="w-full h-full object-cover rounded-md"
          />
        </div>
      </div>
    </section>
  );
};

export default VendorCTA;
