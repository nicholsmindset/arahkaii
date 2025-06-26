
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Check, CheckCircle2, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const formSchema = z.object({
  brandName: z.string().min(2, { message: "Brand name must be at least 2 characters" }),
  website: z.string().url({ message: "Please enter a valid URL" }).optional().or(z.literal('')),
  contactName: z.string().min(2, { message: "Contact name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().min(10, { message: "Please enter a valid phone number" }),
  description: z.string().min(20, { message: "Description must be at least 20 characters" }),
  productsCount: z.string().min(1, { message: "Please provide an approximate number" }),
  termsAccepted: z.boolean().refine(val => val === true, { message: "You must accept the terms" }),
});

type FormValues = z.infer<typeof formSchema>;

const VendorApply = () => {
  const { toast } = useToast();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      brandName: "",
      website: "",
      contactName: "",
      email: "",
      phone: "",
      description: "",
      productsCount: "",
      termsAccepted: false,
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log(data);
    // In a real application, send this data to your backend
    toast({
      title: "Application Submitted!",
      description: "We've received your application and will be in touch soon.",
    });
    form.reset();
  };

  const benefits = [
    "Access to 100k+ monthly active shoppers",
    "No upfront costs or listing fees",
    "Competitive commission structure",
    "Dedicated account manager",
    "Powerful analytics dashboard",
    "Seamless inventory management"
  ];

  return (
    <>
      <Header />
      <main className="pt-16">
        {/* Hero Section */}
        <section className="bg-fashion-black text-white py-16 px-4 md:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-serif font-medium mb-4">Sell With VENDORIA</h1>
            <p className="text-lg md:text-xl max-w-3xl mx-auto">
              Join our curated marketplace of premium fashion brands and reach style-conscious consumers around the globe.
            </p>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16 px-4 md:px-8">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Benefits Column */}
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-serif font-medium mb-8">Why Join VENDORIA?</h2>
              
              <div className="space-y-6">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex">
                    <CheckCircle2 className="h-6 w-6 text-fashion-accent mr-4 flex-shrink-0" />
                    <p className="text-fashion-dark-gray">{benefit}</p>
                  </div>
                ))}
              </div>
              
              <div className="mt-12 p-6 bg-fashion-cream rounded-md">
                <h3 className="text-lg font-medium mb-4">How It Works</h3>
                <ol className="space-y-4">
                  <li className="flex">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-fashion-black text-white flex items-center justify-center mr-4 text-sm">1</div>
                    <p>Submit your application</p>
                  </li>
                  <li className="flex">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-fashion-black text-white flex items-center justify-center mr-4 text-sm">2</div>
                    <p>Our team reviews your brand</p>
                  </li>
                  <li className="flex">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-fashion-black text-white flex items-center justify-center mr-4 text-sm">3</div>
                    <p>Complete onboarding & upload products</p>
                  </li>
                  <li className="flex">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-fashion-black text-white flex items-center justify-center mr-4 text-sm">4</div>
                    <p>Start selling & growing with us</p>
                  </li>
                </ol>
              </div>
            </div>
            
            {/* Application Form */}
            <div className="lg:col-span-3 bg-white p-8 rounded-md border border-fashion-light-gray">
              <h2 className="text-2xl font-serif font-medium mb-6">Brand Application</h2>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="brandName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Brand Name*</FormLabel>
                          <FormControl>
                            <Input placeholder="Your brand name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="website"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Website</FormLabel>
                          <FormControl>
                            <Input placeholder="https://yourbrand.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="contactName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Contact Name*</FormLabel>
                          <FormControl>
                            <Input placeholder="Full name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address*</FormLabel>
                          <FormControl>
                            <Input placeholder="you@yourbrand.com" type="email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number*</FormLabel>
                          <FormControl>
                            <Input placeholder="Your contact number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="productsCount"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Approximate Number of Products*</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. 50, 100, 500+" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tell Us About Your Brand*</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Please describe your brand, products, target customers, and any other relevant information."
                            className="min-h-[120px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="termsAccepted"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            I agree to the <a href="/vendor-terms" className="text-fashion-accent underline">vendor terms</a> and <a href="/privacy" className="text-fashion-accent underline">privacy policy</a>
                          </FormLabel>
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />
                  
                  <Button type="submit" className="w-full bg-fashion-black hover:bg-fashion-black/90">
                    Submit Application <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default VendorApply;
