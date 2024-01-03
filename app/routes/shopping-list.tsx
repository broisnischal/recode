import { Outlet } from "@remix-run/react";

export default function ShoppingList() {
  return (
    <div>
      <h1>Shoping List</h1>
      <div>
        <Outlet />
      </div>
    </div>
  );
}
