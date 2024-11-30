import type { ReactNode } from "react";
import clsx from "clsx";
import s from "./postThread-page.module.css";

type Props = { children?: ReactNode; footer?: boolean };

export const PostThreadPage = ({ children, footer }: Props) => (
  <div>
    <div className={clsx(s.root, "react-bluesky-embed-theme")}>
      <main className={s.main}>{children}</main>
      {footer && (
        <footer className={s.footer}>
          <p>🤯 This post thread was statically generated.</p>
        </footer>
      )}
    </div>
  </div>
);
