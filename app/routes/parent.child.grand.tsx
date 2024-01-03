import { Link } from "@remix-run/react";

export const handle = {
  breadcrumb: () => <Link to="/parent/child/grand">Grand</Link>,
};

export default function Page() {
  return <div>grand</div>;
}
