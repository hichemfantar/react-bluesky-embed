import { Theme } from "../utils.js";
import { Link } from "./link.js";
import { ReactNode } from "react";
import { ThemeContainer } from "./theme-container.js";

export function Container({
  children,
  href,
  theme = "light",
}: {
  children: ReactNode;
  href?: string;
  theme?: Theme;
}) {
  return (
    <ThemeContainer theme={theme}>
      <div className="text-black dark:text-gray-200 w-full dark:bg-[#161e27] bg-white hover:bg-neutral-50 dark:hover:bg-[#161e27f3] relative transition xmax-w-[600px] sm:min-w-[300px] flex border rounded-xl">
        {/* {href && <Link href={href} />} */}
        <div className="flex-1 px-4 pt-3 pb-3">{children}</div>
      </div>
    </ThemeContainer>
  );
}

// import { ComponentChildren, h } from 'preact'

// import { Link } from './link'
// import a from './container.module.css'

// export function Container({
//   children,
//   href,
// }: {
//   children: ComponentChildren
//   href?: string
// }) {
//   return (
//     <div id="bluesky-embed">
//       <div className={[a['combined-class']].join(' ')}>
//         {href && <Link href={href} />}
//         <div className={[a['children']].join(' ')}>{children}</div>
//       </div>
//     </div>
//   )
// }
