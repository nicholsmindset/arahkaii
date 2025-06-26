
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, Star, Users, Instagram, User } from 'lucide-react';

interface VendorHeaderProps {
  vendor: {
    name: string;
    logo: string;
    banner: string;
    bio: string;
    mission: string;
    followers: number;
    rating: number;
    totalReviews: number;
    socialLinks: {
      instagram: string;
      facebook: string;
    };
  };
  isFollowing: boolean;
  onFollow: () => void;
}

const VendorHeader: React.FC<VendorHeaderProps> = ({ vendor, isFollowing, onFollow }) => {
  return (
    <div className="relative">
      {/* Banner Image */}
      <div 
        className="h-64 md:h-80 bg-cover bg-center relative"
        style={{ backgroundImage: `url(${vendor.banner})` }}
      >
        <div className="absolute inset-0 bg-black/30" />
      </div>
      
      {/* Vendor Info */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="relative -mt-16 md:-mt-20">
          <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              {/* Logo */}
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
                <img 
                  src={vendor.logo} 
                  alt={vendor.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Vendor Details */}
              <div className="flex-grow">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div>
                    <h1 className="text-2xl md:text-3xl font-serif font-medium text-gray-900">
                      {vendor.name}
                    </h1>
                    <p className="text-gray-600 mt-2 max-w-2xl leading-relaxed">
                      {vendor.bio}
                    </p>
                    <p className="text-sm text-gray-500 mt-2 max-w-2xl">
                      {vendor.mission}
                    </p>
                    
                    {/* Stats */}
                    <div className="flex items-center gap-6 mt-4">
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-600">
                          {vendor.followers.toLocaleString()} followers
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="text-sm text-gray-600">
                          {vendor.rating} ({vendor.totalReviews} reviews)
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Actions */}
                  <div className="flex flex-col gap-3">
                    <Button 
                      onClick={onFollow}
                      variant={isFollowing ? "outline" : "default"}
                      className="flex items-center gap-2"
                    >
                      <Heart className={`h-4 w-4 ${isFollowing ? 'fill-current text-red-500' : ''}`} />
                      {isFollowing ? 'Following' : 'Follow'}
                    </Button>
                    
                    {/* Social Links */}
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="p-2">
                        <Instagram className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" className="p-2">
                        <User className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorHeader;
