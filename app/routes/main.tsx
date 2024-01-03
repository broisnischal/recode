import { Outlet } from "@remix-run/react";

export default function Page() {
  return (
    <div>
      {/* <h1>Main </h1> */}
      <Outlet key={"asdf"} />
    </div>
  );
}
