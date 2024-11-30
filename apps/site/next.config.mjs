import nextra from "nextra";

const withNextra = nextra({
  // ... your Nextra config
  theme: "nextra-theme-docs",
  themeConfig: "./theme.config.tsx",
  defaultShowCopyCode: true,
});

export default withNextra({
  // ... your Next.js config
});
