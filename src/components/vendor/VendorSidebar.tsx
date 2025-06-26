
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  TrendingUp, 
  Star, 
  MessageSquare,
  Settings
} from 'lucide-react';

const menuItems = [
  {
    title: "Dashboard",
    url: "/vendor-backoffice",
    icon: LayoutDashboard,
  },
  {
    title: "Products", 
    url: "/vendor-backoffice/products",
    icon: Package,
  },
  {
    title: "Orders",
    url: "/vendor-backoffice/orders", 
    icon: ShoppingCart,
  },
  {
    title: "Analytics",
    url: "/vendor-backoffice/analytics",
    icon: TrendingUp,
  },
  {
    title: "Marketing",
    url: "/vendor-backoffice/marketing",
    icon: Star,
  },
  {
    title: "Support",
    url: "/vendor-backoffice/support",
    icon: MessageSquare,
  },
];

const VendorSidebar: React.FC = () => {
  const location = useLocation();

  return (
    <Sidebar className="w-64 border-r border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <SidebarTrigger className="md:hidden" />
          <h2 className="text-lg font-semibold text-gray-900">Vendor Backoffice</h2>
        </div>
      </div>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild
                    isActive={location.pathname === item.url}
                    className="w-full justify-start"
                  >
                    <Link to={item.url} className="flex items-center gap-3 px-3 py-2">
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default VendorSidebar;
