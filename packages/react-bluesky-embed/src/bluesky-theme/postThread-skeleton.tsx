import { Theme } from "../utils";
import { ThemeContainer } from "./theme-container.js";

export const PostThreadSkeleton = ({ theme = "light" }: { theme?: Theme }) => {
  return (
    <ThemeContainer theme={theme}>
      <div className="dark:bg-[#161e27] bg-white transition max-w-[600px] sm:min-w-[300px] rounded-xl p-4 border">
        <div className="flex-1 flex-col flex gap-2">
          <div className="flex gap-2.5 items-center">
            <div className="w-10 h-10 overflow-hidden rounded-full bg-neutral-100 dark:bg-gray-700 shrink-0 animate-pulse" />
            <div className="flex-1">
              <div className="bg-neutral-100 dark:bg-gray-700 animate-pulse w-64 h-4 rounded" />
              <div className="bg-neutral-100 dark:bg-gray-700 animate-pulse w-32 h-3 mt-1 rounded" />
            </div>
          </div>
          <div className="w-full h-4 mt-2 bg-neutral-100 dark:bg-gray-700 rounded animate-pulse" />
          <div className="w-5/6 h-4 bg-neutral-100 dark:bg-gray-700 rounded animate-pulse" />
          <div className="w-3/4 h-4 bg-neutral-100 dark:bg-gray-700 rounded animate-pulse" />
        </div>
      </div>
    </ThemeContainer>
  );
};
