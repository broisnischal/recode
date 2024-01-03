import type { MetaFunction } from "@remix-run/node";
import { Link, Outlet } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "Recode" },
    { name: "description", content: "Welcome to Recode!" },
  ];
};

export default function Index() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1>Welcome to Recode Dev</h1>
      <Link to="/main">Main</Link>
      <Outlet />
    </div>
  );
}
