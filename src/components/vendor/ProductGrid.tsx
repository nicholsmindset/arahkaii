
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Heart, ShoppingCart, Star, Filter } from 'lucide-react';

interface ProductGridProps {
  filter: 'all' | 'best-sellers' | 'new-arrivals';
  vendorId: string;
}

const ProductGrid: React.FC<ProductGridProps> = ({ filter, vendorId }) => {
  const [sortBy, setSortBy] = useState('featured');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [priceFilter, setPriceFilter] = useState('all');

  // Mock products data
  const mockProducts = [
    {
      id: 1,
      name: "Elegant Midi Dress",
      price: 89.99,
      originalPrice: 120.00,
      image: "/placeholder.svg",
      rating: 4.5,
      reviews: 23,
      category: "dresses",
      sizes: ["S", "M", "L", "XL"],
      colors: ["Black", "Navy", "Rose"],
      isBestSeller: true,
      isNew: false
    },
    {
      id: 2,
      name: "Silk Blouse",
      price: 65.00,
      image: "/placeholder.svg",
      rating: 4.8,
      reviews: 45,
      category: "tops",
      sizes: ["XS", "S", "M", "L"],
      colors: ["White", "Cream", "Blush"],
      isBestSeller: false,
      isNew: true
    },
    {
      id: 3,
      name: "Wide Leg Trousers",
      price: 75.00,
      image: "/placeholder.svg",
      rating: 4.3,
      reviews: 18,
      category: "bottoms",
      sizes: ["S", "M", "L", "XL"],
      colors: ["Black", "Camel", "Navy"],
      isBestSeller: true,
      isNew: false
    },
    {
      id: 4,
      name: "Statement Earrings",
      price: 32.00,
      image: "/placeholder.svg",
      rating: 4.7,
      reviews: 67,
      category: "accessories",
      sizes: ["One Size"],
      colors: ["Gold", "Silver", "Rose Gold"],
      isBestSeller: false,
      isNew: true
    }
  ];

  const filteredProducts = mockProducts.filter(product => {
    if (filter === 'best-sellers') return product.isBestSeller;
    if (filter === 'new-arrivals') return product.isNew;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-gray-500" />
          <span className="text-sm text-gray-600">
            {filteredProducts.length} products found
          </span>
        </div>
        
        <div className="flex flex-wrap gap-3">
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="dresses">Dresses</SelectItem>
              <SelectItem value="tops">Tops</SelectItem>
              <SelectItem value="bottoms">Bottoms</SelectItem>
              <SelectItem value="accessories">Accessories</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={priceFilter} onValueChange={setPriceFilter}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Price" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Prices</SelectItem>
              <SelectItem value="under-50">Under $50</SelectItem>
              <SelectItem value="50-100">$50 - $100</SelectItem>
              <SelectItem value="over-100">Over $100</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">Featured</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <Card key={product.id} className="group cursor-pointer hover:shadow-lg transition-shadow">
            <CardContent className="p-0">
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover rounded-t-lg"
                />
                {product.isNew && (
                  <Badge className="absolute top-2 left-2 bg-green-500">New</Badge>
                )}
                {product.isBestSeller && (
                  <Badge className="absolute top-2 right-2 bg-yellow-500">Best Seller</Badge>
                )}
                <Button
                  size="sm"
                  variant="outline"
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Heart className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="p-4 space-y-2">
                <h3 className="font-medium text-gray-900 line-clamp-2">{product.name}</h3>
                
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-yellow-500 fill-current" />
                  <span className="text-sm text-gray-600">
                    {product.rating} ({product.reviews})
                  </span>
                </div>
                
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-gray-900">${product.price}</span>
                  {product.originalPrice && (
                    <span className="text-sm text-gray-500 line-through">
                      ${product.originalPrice}
                    </span>
                  )}
                </div>
                
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <span>Sizes: {product.sizes.join(', ')}</span>
                </div>
                
                <Button className="w-full mt-3" size="sm">
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Add to Cart
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Shop CTA */}
      <div className="text-center py-8">
        <Button size="lg" className="bg-fashion-accent hover:bg-fashion-accent/90">
          Shop from this Brand
        </Button>
      </div>
    </div>
  );
};

export default ProductGrid;
