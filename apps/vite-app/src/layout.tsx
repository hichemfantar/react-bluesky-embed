import { Outlet } from "react-router-dom";

export const Layout = () => (
  <div className="container mx-auto px-2 sm:px-4 flex justify-center">
    <main>
      <Outlet />
    </main>
  </div>
);
