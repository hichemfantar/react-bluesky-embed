import { Outlet } from "react-router-dom";

export const Layout = () => (
  <div className="container mx-auto p-2 sm:p-4 flex justify-center">
    <main>
      <Outlet />
    </main>
  </div>
);
