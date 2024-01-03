import { Outlet, useLoaderData } from "@remix-run/react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { createPaymentIntent } from "./payments";

const stripePromise = loadStripe(
  "pk_test_51OUZjlIZGRpFqZEF0l8FqGQfWAI5q5To732JXJuY2Kqk5n5D9hYBWq8jMT8ynm1JDIZ2nhpVb3WCSq3dDQzZsCQs00ZNZWNSIY"
);

export async function loader() {
  return await createPaymentIntent();
}

export default function Pay() {
  const paymentintent = useLoaderData<typeof loader>();

  return (
    <div className="max-w-[30vw] mx-auto h-screen flex items-center flex-col justify-center">
      <h1>Donate me money!</h1>

      <Elements
        stripe={stripePromise}
        options={{
          clientSecret: paymentintent.client_secret!,
        }}
      >
        <Outlet />
      </Elements>
    </div>
  );
}
