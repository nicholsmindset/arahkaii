
import React from 'react';
import { Star } from 'lucide-react';

interface TestimonialProps {
  id: string;
  quote: string;
  author: string;
  role: string;
  image: string;
  stars: number;
}

const testimonials: TestimonialProps[] = [
  {
    id: "t1",
    quote: "VENDORIA has been transformative for our brand. The platform makes it so easy to showcase our products and reach new customers. Our sales increased by 45% in just three months.",
    author: "Sophia Chen",
    role: "Founder, ElegantChic",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
    stars: 5
  },
  {
    id: "t2",
    quote: "The vendor dashboard is intuitive and provides valuable insights into our sales performance. The support team is responsive and helpful. Truly a premium marketplace experience.",
    author: "Marcus Lee",
    role: "CEO, Urban Empress",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
    stars: 5
  },
  {
    id: "t3",
    quote: "As an emerging designer, VENDORIA gave me the visibility I needed without the typical high fees of other platforms. The brand presentation tools are exceptional.",
    author: "Elena Rodríguez",
    role: "Designer, Luxe Couture",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
    stars: 4
  }
];

const TestimonialSection: React.FC = () => {
  const renderStars = (count: number) => {
    return Array(5).fill(0).map((_, i) => (
      <Star 
        key={i} 
        className={`h-4 w-4 ${i < count ? 'text-fashion-accent fill-fashion-accent' : 'text-gray-300'}`} 
      />
    ));
  };
  
  return (
    <section className="py-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-serif font-medium text-center mb-3">What Our Vendors Say</h2>
        <p className="text-fashion-dark-gray text-center max-w-2xl mx-auto mb-12">
          Hear from the brands and designers who have joined our marketplace
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id} 
              className="bg-white p-6 rounded-md shadow-sm border border-fashion-light-gray flex flex-col h-full"
            >
              <div className="flex mb-4">
                {renderStars(testimonial.stars)}
              </div>
              <blockquote className="flex-grow mb-6">
                <p className="text-fashion-dark-gray italic">"{testimonial.quote}"</p>
              </blockquote>
              <div className="flex items-center">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.author} 
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <p className="font-medium">{testimonial.author}</p>
                  <p className="text-sm text-fashion-dark-gray">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
