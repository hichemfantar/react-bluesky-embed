import type { FC, ReactNode } from "react";
import clsx from "clsx";
import s from "./layout.module.css";

const Layout: FC<{ children: ReactNode }> = ({ children }) => (
  <div>
    <div className={clsx(s.root, "react-bluesky-embed-theme")}>
      <main className={s.main}>{children}</main>
      <footer className={s.footer}>
        <p>🤯 This post thread was statically generated.</p>
      </footer>
    </div>
  </div>
);

export default Layout;
