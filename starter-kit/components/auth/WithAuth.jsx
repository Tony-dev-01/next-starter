'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '../../app/providers/AuthProvider';
import { useEffect } from 'react';

export default function WithAuth({ 
  children, 
  fallback = null, 
  redirectTo = '/sign-in' 
}) {
  const { session, isLoading, isAuthenticated } = useAuth();
  const router = useRouter();

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
  }, [isLoading, isAuthenticated, router, redirectTo]);

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

  // User is authenticated, render the protected content
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