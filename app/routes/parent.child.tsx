import { Link, useLoaderData } from "@remix-run/react";

export const handle = {
  breadcrumb: () => <Link to="/parent/child">Child Route</Link>,
};

export async function clientLoader() {
  const data = await fetch("/api/hello");
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return data;
}

export function HydrateFallback() {
  return <p>Loading Game...</p>;
}

export default function Page() {
  const data = useLoaderData<typeof clientLoader>();
  console.log(data);

  return (
    <div>
      <h1>Hey {data.hello}</h1>
    </div>
  );
}
