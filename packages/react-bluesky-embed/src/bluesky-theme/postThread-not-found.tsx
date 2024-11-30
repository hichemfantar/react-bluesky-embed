import { Theme } from "../utils";
import { ThemeContainer } from "./theme-container.js";

// TODO: handle error properly

export const PostThreadNotFound = ({
  error,
  theme,
}: {
  error?: string;
  theme: Theme;
}) => {
  return (
    <ThemeContainer theme={theme}>
      <div className="transition w-full bg-red-50 dark:bg-gray-800 p-4 px-6 rounded-xl max-w-[600px] sm:min-w-[300px]">
        <p className="text-red-800 dark:text-red-400 text-center text-lg font-bold">
          Post Thread not found
        </p>
        <p className="text-red-800 dark:text-red-400 text-center mt-2 text-sm">
          The embedded post thread could not be found...
          {/* {JSON.stringify(error)} */}
        </p>
      </div>
    </ThemeContainer>
  );
};
