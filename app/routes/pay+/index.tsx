import { Form, useSubmit } from "@remix-run/react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { Button } from "~/components/ui/button";

export function action() {
  console.log("action");
  return null;
}

export default function Payy() {
  const elements = useElements();
  const stripe = useStripe();
  const submit = useSubmit();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await stripe?.confirmPayment({
      elements: elements!,
      confirmParams: {
        return_url: "http://localhost:3000/pay/success",
      },
    });
  };

  return (
    <div className="">
      <Form className="flex flex-col gap-3" onSubmit={handleSubmit}>
        <PaymentElement />
        <Button>Confirm Payment</Button>
      </Form>
    </div>
  );
}
