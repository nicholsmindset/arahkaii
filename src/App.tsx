import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Brands from "./pages/Brands";
import Categories from "./pages/Categories";
import Trending from "./pages/Trending";
import VendorApply from "./pages/VendorApply";
import VendorDashboard from "./pages/VendorDashboard";
import VendorBackoffice from "./pages/VendorBackoffice";
import VendorShop from "./pages/VendorShop";
import AdminDashboard from "./pages/AdminDashboard";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import NotFound from "./pages/NotFound";
import Analytics from "./pages/analytics";
import { VendorLogin } from "./features/auth/components/VendorLogin";
import { AdminLogin } from "./features/auth/components/AdminLogin";
import { ProtectedRoute } from "./features/auth/components/ProtectedRoute";
import { OnboardingWizard } from "./features/onboarding/components/OnboardingWizard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Index />} />
          <Route path="/brands" element={<Brands />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/trending" element={<Trending />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/vendor-apply" element={<VendorApply />} />
          
          {/* Vendor routes */}
          <Route path="/vendor" element={<VendorLogin />} />
          <Route
            path="/vendor/onboarding"
            element={
              <ProtectedRoute requiredRole="vendor">
                <OnboardingWizard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/vendor-dashboard"
            element={
              <ProtectedRoute requiredRole="vendor">
                <VendorDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/vendor-backoffice/*"
            element={
              <ProtectedRoute requiredRole="vendor">
                <VendorBackoffice />
              </ProtectedRoute>
            }
          />
          <Route path="/vendor-shop/:vendorId" element={<VendorShop />} />

          {/* Admin routes */}
          <Route path="/admin" element={<AdminLogin />} />
          <Route
            path="/admin-dashboard"
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          {/* Analytics route (requires admin access) */}
          <Route
            path="/analytics"
            element={
              <ProtectedRoute requiredRole="admin">
                <Analytics />
              </ProtectedRoute>
            }
          />

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
