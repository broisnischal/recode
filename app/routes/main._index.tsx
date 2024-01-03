import { Outlet, useOutletContext } from "@remix-run/react";
import { supportsVibrationAPI } from "./feature-check.client";

export default function Page() {
  const data = useOutletContext();
  console.log(supportsVibrationAPI);

  return (
    <div>
      Index page <Outlet key={"one"} /> {data.hello}
    </div>
  );
}
