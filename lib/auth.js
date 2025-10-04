import { authClient } from "./auth-client";

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

if (!process.env.GITHUB_CLIENT_ID || !process.env.GITHUB_CLIENT_SECRET) {
  throw new Error(
    "Please define the GITHUB_CLIENT_ID or GITHUB_CLIENT_SECRET environment variable inside .env.local"
  );
}

if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
  throw new Error(
    "Please define the GOOGLE_CLIENT_ID or GOOGLE_CLIENT_SECRET environment variable inside .env.local"
  );
}

const stripeClient = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2025-02-24.acacia",
});

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
  database: mongodbAdapter(db),
  emailAndPassword: {
    enabled: true,
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
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60 * 1000, // Cache duration in milliseconds
    },
  },
});
