
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, User } from 'lucide-react';

interface VendorReviewsProps {
  vendorId: string;
}

const VendorReviews: React.FC<VendorReviewsProps> = ({ vendorId }) => {
  const mockReviews = [
    {
      id: 1,
      customerName: "Sarah M.",
      rating: 5,
      date: "2 weeks ago",
      review: "Absolutely love my purchase! The quality is amazing and the fit is perfect. The customer service was also excellent.",
      product: "Elegant Midi Dress",
      verified: true
    },
    {
      id: 2,
      customerName: "Emma L.",
      rating: 4,
      date: "1 month ago",
      review: "Beautiful pieces and fast shipping. The fabric quality exceeded my expectations. Will definitely shop here again!",
      product: "Silk Blouse",
      verified: true
    },
    {
      id: 3,
      customerName: "Jessica R.",
      rating: 5,
      date: "3 weeks ago",
      review: "This brand understands what women want. Stylish, comfortable, and empowering clothing. Highly recommend!",
      product: "Wide Leg Trousers",
      verified: true
    }
  ];

  const averageRating = 4.8;
  const totalReviews = 346;
  const ratingDistribution = [
    { stars: 5, count: 278, percentage: 80 },
    { stars: 4, count: 52, percentage: 15 },
    { stars: 3, count: 14, percentage: 4 },
    { stars: 2, count: 2, percentage: 1 },
    { stars: 1, count: 0, percentage: 0 }
  ];

  return (
    <div className="space-y-6">
      {/* Rating Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Customer Reviews</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Overall Rating */}
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-900 mb-2">
                {averageRating}
              </div>
              <div className="flex justify-center items-center gap-1 mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-5 w-5 ${
                      star <= averageRating
                        ? 'text-yellow-500 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <p className="text-gray-600">Based on {totalReviews} reviews</p>
            </div>
            
            {/* Rating Distribution */}
            <div className="space-y-2">
              {ratingDistribution.map((rating) => (
                <div key={rating.stars} className="flex items-center gap-3">
                  <span className="text-sm w-6">{rating.stars}★</span>
                  <div className="flex-grow bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-yellow-500 h-2 rounded-full"
                      style={{ width: `${rating.percentage}%` }}
                    />
                  </div>
                  <span className="text-sm text-gray-600 w-8">
                    {rating.count}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Individual Reviews */}
      <div className="space-y-4">
        {mockReviews.map((review) => (
          <Card key={review.id}>
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                  <User className="h-6 w-6 text-gray-500" />
                </div>
                
                <div className="flex-grow">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-medium text-gray-900">{review.customerName}</h4>
                    {review.verified && (
                      <Badge variant="outline" className="text-xs">
                        Verified Purchase
                      </Badge>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-4 w-4 ${
                            star <= review.rating
                              ? 'text-yellow-500 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500">{review.date}</span>
                  </div>
                  
                  <p className="text-gray-700 mb-2">{review.review}</p>
                  
                  <p className="text-sm text-gray-500">
                    Product: {review.product}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default VendorReviews;
