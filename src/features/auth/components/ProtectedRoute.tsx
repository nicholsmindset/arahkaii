import { Navigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole: 'vendor' | 'admin';
}

export const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
  const { data: { session } } = supabase.auth.getSession();
  const userRole = localStorage.getItem('userRole');

  // If no session or wrong role, redirect to login
  if (!session?.user || userRole !== requiredRole) {
    return <Navigate to={requiredRole === 'vendor' ? '/vendor/login' : '/admin/login'} replace />;
  }

  return <>{children}</>;
};
