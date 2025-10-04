'use client';

import { createContext, useContext } from 'react';
import { authClient } from '../../lib/auth-client';

// Create auth context for better performance and state management
const AuthContext = createContext(null);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}

export default function AuthProvider({ children }) {
  // Get session data using better-auth's hook
  const session = authClient.useSession();
  
  // Provide auth state and methods to children
  const authValue = {
    session: session.data,
    isLoading: session.isPending,
    isAuthenticated: !!session.data,
    signOut: () => authClient.signOut(),
  };

  return (
    <AuthContext.Provider value={authValue}>
      {children}
    </AuthContext.Provider>
  );
}