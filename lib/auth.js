import { authClient } from "./auth-client";
import { resend } from "../src/helpers/email/resend";

import { betterAuth } from "better-auth";
import { admin } from "better-auth/plugins";

import { stripe } from "@better-auth/stripe";
import Stripe from "stripe";

import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { db } from "./db";

if (!process.env.BETTER_AUTH_SECRET) {
  throw new Error(
    "Please define the BETTER_AUTH_SECRET environment variable inside .env.local"
  );
}

if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
  throw new Error(
    "Please define the GOOGLE_CLIENT_ID or GOOGLE_CLIENT_SECRET environment variable inside .env.local"
  );
}

if (!process.env.GITHUB_CLIENT_ID || !process.env.GITHUB_CLIENT_SECRET) {
  throw new Error(
    "Please define the GITHUB_CLIENT_ID or GITHUB_CLIENT_SECRET environment variable inside .env.local"
  );
}

const stripeClient = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2025-02-24.acacia",
});

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
  // database: mongodbAdapter(db),
  database: mongodbAdapter(db),
  emailVerification: {
    sendVerificationEmail: async ({ user, url, token }, request) => {
      await resend.emails.send({
        from: "testing <onboarding@resend.dev>", // You could add your custom domain
        to: user.email, // email of the user to want to end
        subject: "Email Verification", // Main subject of the email
        html: `Click the link to verify your email: ${url}`, // Content of the email
        // you could also use "React:" option for sending the email template and there content to user
      });
      console.log("sending email...");
    },
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    expiresIn: 3600, // 1 hour
  },
  emailAndPassword: {
    requireEmailVerification: true,
    enabled: true,
    autoSignIn: true,
  },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      redirectURI: `${
        process.env.BETTER_AUTH_URL || "http://localhost:3000"
      }/api/auth/callback/github`,
    },
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      redirectURI: `${
        process.env.BETTER_AUTH_URL || "http://localhost:3000"
      }/api/auth/callback/google`,
    },
  },
  plugins: [
    admin(),
    stripe({
      stripeClient,
      stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
      createCustomerOnSignUp: true,
      subscription: {
        //if you want to enable subscription management
        enabled: false,
      },
    }),
  ],
  secret: process.env.BETTER_AUTH_SECRET,
  trustedOrigins: [
    process.env.BETTER_AUTH_URL || "http://localhost:3000",
    ...(process.env.NODE_ENV === "development"
      ? ["http://localhost:3000"]
      : []),
  ].filter(Boolean),
  session: {
    expiresIn: 60 * 60 * 24, // 1 day
    updateAge: 60 * 60, // 1 hour (every 1 hour the session expiration is updated)
    freshAge: 0, // Disable freshness check
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60 * 1000, // Cache duration in milliseconds
    },
  },
});
