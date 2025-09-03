'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authClient } from "../../lib/auth-client.js"; //import the auth client
import Link from 'next/link.js';

export default function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();
  // const {session} = useSession();

    const githubIcon = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512" className='w-4'><path fill="#ffffff" d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"/></svg>;
    const appleIcon = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" className='w-4'><path fill="#ffffff" d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/></svg>;
    const googleIcon = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512" className='w-4'><path fill="#ffffff" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"/></svg>;


const handleGithubLogin = async (e) => {
  e.preventDefault();
  setLoading(true);
  console.log('Signing in with GitHub...');
  try {
    // Store redirect URL in sessionStorage for after OAuth flow
    const urlParams = new URLSearchParams(window.location.search);
    const redirectTo = urlParams.get('redirectTo') || '/dashboard';
    sessionStorage.setItem('auth_redirect_to', redirectTo);
    
    // Use standard better-auth social login (don't modify callback URL)
    await authClient.signIn.social({
      provider: "github",
      callbackURL: "/dashboard", // Will be overridden by our logic
      errorCallbackURL: "/sign-in?error=github_error",
    });
    setLoading(false);
  } catch(error){
    console.error('GitHub login error:', error);
    setLoading(false);
  }
};

const handleGoogleLogin = async (e) => {
  e.preventDefault();
  setLoading(true);
  console.log('Signing in with Google...');
  try {
    // Store redirect URL in sessionStorage for after OAuth flow
    const urlParams = new URLSearchParams(window.location.search);
    const redirectTo = urlParams.get('redirectTo') || '/dashboard';
    sessionStorage.setItem('auth_redirect_to', redirectTo);
    
    // Use standard better-auth social login (don't modify callback URL)
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/dashboard", // Will be overridden by our logic
      errorCallbackURL: "/sign-in?error=google_error", 
    });
    setLoading(false);
  } catch(error){
    console.error('Google login error:', error);
    setLoading(false);
  }
};

const handleEmailPasswordLogin = async (e) => {
  e.preventDefault();
  setLoading(true);
  console.log('Logging in with email and password...');
  try {
    // Get redirect URL from query params (set by middleware)
    const urlParams = new URLSearchParams(window.location.search);
    const redirectTo = urlParams.get('redirectTo') || '/dashboard';
    
    // Sign in without callbackURL to prevent server redirect
    const result = await authClient.signIn.email({
      email,
      password,
    });
    
    if (result.data && !result.error) {
      // Success! Navigate client-side (no page refresh)
      console.log('Login successful, navigating to:', redirectTo);
      router.push(redirectTo);
    } else {
      console.error('Login failed:', result.error);
    }
    setLoading(false);
  } catch(error){
    console.error('Login error:', error);
    setLoading(false);
  }
};


  return (
    <section className="py-10 md:py-16">
      <div className="container">
          <div className="flex flex-col items-center justify-center gap-4">
              <form className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4" >
                <legend className="fieldset-legend text-2xl">Login</legend>
              <div>
              <input className="input validator" type="email" value={email}
                onChange={(e) => setEmail(e.target.value)} required placeholder="Email Address" />
              <div className="validator-hint">Enter valid email address</div>
              </div>
              <div>
              <input type="password" className="input validator" required placeholder="Password" minLength="8" value={password}
                onChange={(e) => setPassword(e.target.value)}
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" 
                title="Must be more than 8 characters, including number, lowercase letter, uppercase letter" />
                <p className="validator-hint">
                  Must be more than 8 characters, including
                  <br/>At least one number
                  <br/>At least one lowercase letter
                  <br/>At least one uppercase letter
                </p>
                </div>
              <button 
                type="submit" 
                className="btn btn-primary w-full mb-4" 
                onClick={handleEmailPasswordLogin} 
                disabled={loading}>
                {loading ? 'Logging in...' : 'Login'}
              </button>
              
              <div className="divider">OR</div>
              
              <button className="btn btn-neutral flex flex-row gap-2 mb-2" 
                onClick={handleGithubLogin} disabled={loading}>
                {loading ? 'Logging in...' : 'Login with GitHub'} {githubIcon}</button>
                <button className="btn btn-neutral flex flex-row gap-2" 
                onClick={handleGoogleLogin} disabled={loading}>
                {loading ? 'Logging in...' : 'Login with Google'} {googleIcon}</button>
            </form>
            
            <div className="text-center mt-4">
              <p className="text-sm text-base-content/70">
                Don't have an account?{' '}
                <Link href="/sign-up" className="link link-primary">
                  Sign up
                </Link>
              </p>
            </div>
        </div>
    </div>
    </section>
  );
}