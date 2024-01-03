import { LoaderFunctionArgs } from "@remix-run/node";
import { retrievePaymentIntent } from "../payments";
import { useLoaderData } from "@remix-run/react";

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const id = url.searchParams.get("payment_intent");
  return await retrievePaymentIntent(id!);
}
export default function Success() {
  const data = useLoaderData<typeof loader>();

  return (
    <div>
      <h1>Thank you for your payment!</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
