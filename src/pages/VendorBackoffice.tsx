
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import VendorSidebar from '@/components/vendor/VendorSidebar';
import VendorDashboardContent from '@/components/vendor/VendorDashboardContent';
import { SidebarProvider } from '@/components/ui/sidebar';

const VendorBackoffice: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow pt-16">
        <SidebarProvider>
          <div className="min-h-screen flex w-full">
            <VendorSidebar />
            <main className="flex-1 p-6 bg-gray-50">
              <VendorDashboardContent />
            </main>
          </div>
        </SidebarProvider>
      </div>
      <Footer />
    </div>
  );
};

export default VendorBackoffice;
