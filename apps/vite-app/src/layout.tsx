import { Outlet } from "react-router-dom";

export const Layout = () => (
  <div className="container mx-auto px-2 sm:px-4">
    <main>
      <Outlet />
    </main>
  </div>
);
