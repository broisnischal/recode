import { Link, Outlet } from "@remix-run/react";

export const handle = {
  breadcrumb: () => <Link to="/parent">Some Route</Link>,
};

export default function Page() {
  return (
    <div>
      <h1>Parent</h1>
      <Outlet />
    </div>
  );
}
