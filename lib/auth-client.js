import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL:
    typeof window !== "undefined"
      ? window.location.origin
      : "http://localhost:3000",
});

// Email sign-in function
export const signInWithEmail = async (email, password) => {
  return await authClient.signIn.email(
    {
      email,
      password,
    },
    {
      onError: (ctx) => {
        // Handle the error
        if (ctx.error.status === 403) {
          throw new Error("EMAIL_NOT_VERIFIED");
        }
        // Throw other errors to be handled by the component
        throw ctx.error;
      },
    }
  );
};

// Email sign-up function
export const signUpWithEmail = async (email, password, name) => {
  return await authClient.signUp.email(
    {
      email,
      password,
      name,
    },
    {
      onError: (ctx) => {
        if (ctx.error.status === 403) {
          throw new Error("EMAIL_NOT_VERIFIED");
        }
        // Throw other errors to be handled by the component
        throw ctx.error;
      },
    }
  );
};

// Send email verification
export const sendEmailVerification = async (email) => {
  return await authClient.sendVerificationEmail(
    { email },
    {
      onError: (ctx) => {
        throw ctx.error;
      },
    }
  );
};

// Verify email with token
export const verifyEmail = async (token) => {
  return await authClient.verifyEmail(
    { token },
    {
      onError: (ctx) => {
        alert(ctx.error.message);
      },
    }
  );
};

// Reset password
export const resetPassword = async (email) => {
  return await authClient.forgetPassword(
    { email },
    {
      onError: (ctx) => {
        alert(ctx.error.message);
      },
    }
  );
};

// Sign out function
export const signOut = async () => {
  return await authClient.signOut({
    onError: (ctx) => {
      throw ctx.error;
    },
    onSuccess: () => {
      router.push("/"); // redirect to login page
    },
  });
};
