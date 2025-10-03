'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '../../app/providers/AuthProvider';
import { useEffect } from 'react';

export default function WithAuth({ 
  children, 
  fallback = null, 
  redirectTo = '/sign-in',
  requiredRole = null 
}) {
  const { session, isLoading, isAuthenticated } = useAuth();
  const router = useRouter();

  // Check if user has required role
  const hasRequiredRole = () => {
    if (!requiredRole) return true;
    if (!session?.user) return false;
    return session.user.role === requiredRole;
  };

  useEffect(() => {
    // Clean up URL parameters after successful authentication
    if (!isLoading && isAuthenticated) {
      const currentUrl = new URL(window.location);
      if (currentUrl.searchParams.has('redirectTo')) {
        // Remove the redirectTo parameter from URL
        currentUrl.searchParams.delete('redirectTo');
        // Replace the current URL without the parameter (no page reload)
        window.history.replaceState({}, '', currentUrl.pathname + currentUrl.search);
      }

      // Handle redirect after social login (from sessionStorage)
      const storedRedirect = sessionStorage.getItem('auth_redirect_to');
      if (storedRedirect && storedRedirect !== window.location.pathname) {
        sessionStorage.removeItem('auth_redirect_to');
        router.push(storedRedirect);
        return;
      }
    }

    // If not loading and not authenticated, redirect
    if (!isLoading && !isAuthenticated) {
      const currentPath = window.location.pathname;
      const redirectUrl = `${redirectTo}?redirectTo=${encodeURIComponent(currentPath)}`;
      router.push(redirectUrl);
    }

    // If authenticated but doesn't have required role, redirect to unauthorized page
    if (!isLoading && isAuthenticated && requiredRole && !hasRequiredRole()) {
      router.push('/unauthorized');
    }
  }, [isLoading, isAuthenticated, router, redirectTo, requiredRole, session]);

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      fallback || (
        <div className="flex items-center justify-center min-h-screen">
          <div className="flex flex-col items-center gap-4">
            <div className="loading loading-spinner loading-lg"></div>
            <p className="text-base-content/70">Checking authentication...</p>
          </div>
        </div>
      )
    );
  }

  // Don't render children if not authenticated (will redirect)
  if (!isAuthenticated) {
    return (
      fallback || (
        <div className="flex items-center justify-center min-h-screen">
          <div className="flex flex-col items-center gap-4">
            <div className="loading loading-spinner loading-lg"></div>
            <p className="text-base-content/70">Redirecting to sign in...</p>
          </div>
        </div>
      )
    );
  }

  // Don't render children if user doesn't have required role (will redirect)
  if (requiredRole && !hasRequiredRole()) {
    return (
      fallback || (
        <div className="flex items-center justify-center min-h-screen">
          <div className="flex flex-col items-center gap-4">
            <div className="loading loading-spinner loading-lg"></div>
            <p className="text-base-content/70">Checking permissions...</p>
          </div>
        </div>
      )
    );
  }

  // User is authenticated and has required role, render the protected content
  return <>{children}</>;
}

// HOC version for wrapping entire page components
export function withAuth(WrappedComponent, options = {}) {
  const displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component';
  
  const WithAuthComponent = (props) => {
    return (
      <WithAuth {...options}>
        <WrappedComponent {...props} />
      </WithAuth>
    );
  };

  WithAuthComponent.displayName = `withAuth(${displayName})`;
  return WithAuthComponent;
}

// HOC version for role-based authentication
export function withRole(WrappedComponent, requiredRole, options = {}) {
  const displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component';
  
  const WithRoleComponent = (props) => {
    return (
      <WithAuth requiredRole={requiredRole} {...options}>
        <WrappedComponent {...props} />
      </WithAuth>
    );
  };

  WithRoleComponent.displayName = `withRole(${displayName})`;
  return WithRoleComponent;
}