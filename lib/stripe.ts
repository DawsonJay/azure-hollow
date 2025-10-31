import Stripe from "stripe";

// Lazy initialization to avoid build-time errors when API key is missing
let stripeInstance: Stripe | null = null;

function getStripe(): Stripe {
  if (!stripeInstance) {
    const apiKey = process.env.STRIPE_SECRET_KEY;
    if (!apiKey) {
      throw new Error("STRIPE_SECRET_KEY is not set");
    }
    stripeInstance = new Stripe(apiKey, {
      // apiVersion will be automatically set to latest compatible version
    });
  }
  return stripeInstance;
}

// Export a getter function instead of direct instance
export const stripe = new Proxy({} as Stripe, {
  get(_target, prop) {
    return getStripe()[prop as keyof Stripe];
  },
});

/**
 * Create a Stripe checkout session for payment
 */
export async function createCheckoutSession({
  token,
  amount,
  currency = "usd",
  successUrl,
  cancelUrl,
  metadata,
}: {
  token: string;
  amount: number; // in cents
  currency?: string;
  successUrl: string;
  cancelUrl: string;
  metadata?: Record<string, string>;
}) {
  return getStripe().checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency,
          product_data: {
            name: "Tarot Reading",
          },
          unit_amount: amount * 100, // Convert to cents
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: successUrl,
    cancel_url: cancelUrl,
    metadata: {
      token,
      ...metadata,
    },
  });
}

/**
 * Verify Stripe webhook signature
 */
export function constructWebhookEvent(
  payload: string | Buffer,
  signature: string
): Stripe.Event {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    throw new Error("STRIPE_WEBHOOK_SECRET is not set");
  }

  return getStripe().webhooks.constructEvent(payload, signature, webhookSecret);
}

