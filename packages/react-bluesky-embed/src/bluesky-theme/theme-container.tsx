import { ReactNode } from "react";
import { Theme } from "../utils.js";

export function ThemeContainer({
  children,
  theme = "light",
}: {
  children: ReactNode;
  theme?: Theme;
}) {
  return (
    <div id="bluesky-embed" className={theme}>
      {children}
    </div>
  );
}
