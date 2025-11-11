"use client"
import { useRouter } from "next/navigation";
import { useState } from "react";
import { authClient, sendEmailVerification } from "../../lib/auth-client";


export default function VerifyEmail ({ email = "your email address", setDisplayVerifyEmail }) {
const [isResending, setIsResending] = useState(false);
  const [resendMessage, setResendMessage] = useState('');
  const router = useRouter();

  const handleResendEmail = async () => {
    
    setIsResending(true);
    setResendMessage('');
    
    try {
      // await sendEmailVerification(email);
      await authClient.sendVerificationEmail({
          email: email,
          callbackURL: "/dashboard" // The redirect URL after verification
      })
      setResendMessage('Verification email resent successfully!');
    } catch (error) {
      setResendMessage('Failed to send verification email. Please try again.');
    } finally {
      setIsResending(false);
    }
  };

  const handleSignOut = async () => {
    // display sign in form back
    setDisplayVerifyEmail(() => false);
  };

    return(
        <div className="min-h-screen bg-base-100 flex flex-col">
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="card w-full max-w-md bg-base-100 shadow-xl border">
          <div className="card-body items-center text-center">
            <div className="avatar placeholder mb-6">
              <div className="bg-neutral text-neutral-content rounded-full w-16">
                <span className="text-2xl">✉</span>
              </div>
            </div>
            
            <h1 className="card-title text-2xl mb-4">Please verify your email</h1>
            
            <p className="text-base-content/70 mb-2">
              We just sent an email to <span className="font-semibold text-primary">{email}</span>.
            </p>
            <p className="text-base-content/70 mb-6">
              Click the link in the email to verify your account.
            </p>
            
            {resendMessage && (
              <div className={`alert ${resendMessage.includes('success') ? 'alert-success' : 'alert-error'} mb-4`}>
                <span>{resendMessage}</span>
              </div>
            )}
            
            <div className="card-actions justify-center w-full space-x-4">
              <button 
                className="btn btn-primary"
                onClick={handleResendEmail}
                disabled={isResending}
              >
                {isResending ? (
                  <>
                    <span className="loading loading-spinner loading-sm"></span>
                    Sending...
                  </>
                ) : (
                  'Resend email'
                )}
              </button>
            </div>
            
            <div className="divider"></div>
            
            <button 
              className="link link-hover text-base-content/70"
              onClick={handleSignOut}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
    )
}