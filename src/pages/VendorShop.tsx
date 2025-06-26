
import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import VendorHeader from '@/components/vendor/VendorHeader';
import VendorTabs from '@/components/vendor/VendorTabs';
import { Button } from '@/components/ui/button';
import { MessageSquare } from 'lucide-react';

const VendorShop: React.FC = () => {
  const [isFollowing, setIsFollowing] = useState(false);

  const mockVendor = {
    id: "elegantchic",
    name: "ElegantChic",
    logo: "/placeholder.svg",
    banner: "/placeholder.svg",
    bio: "Empowering women through timeless, elegant fashion pieces that celebrate femininity and confidence.",
    mission: "Creating sustainable, ethically-made clothing that makes every woman feel powerful and beautiful.",
    followers: 12500,
    rating: 4.8,
    totalReviews: 346,
    socialLinks: {
      instagram: "@elegantchic",
      facebook: "ElegantChicFashion"
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-16">
        <VendorHeader 
          vendor={mockVendor}
          isFollowing={isFollowing}
          onFollow={() => setIsFollowing(!isFollowing)}
        />
        <div className="max-w-7xl mx-auto px-4 py-8">
          <VendorTabs vendorId={mockVendor.id} />
        </div>
        
        {/* Floating Message Button */}
        <div className="fixed bottom-6 right-6 z-50">
          <Button 
            size="lg" 
            className="rounded-full bg-fashion-accent hover:bg-fashion-accent/90 text-white shadow-lg"
          >
            <MessageSquare className="h-5 w-5 mr-2" />
            Message Vendor
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default VendorShop;
