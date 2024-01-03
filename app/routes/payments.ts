import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function createPaymentIntent() {
  return stripe.paymentIntents.create({
    amount: 2000,
    currency: "usd",
    automatic_payment_methods: { enabled: true },
  });
}

export async function retrievePaymentIntent(id: string) {
  return stripe.paymentIntents.retrieve(id);
}
