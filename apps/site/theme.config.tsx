import React from "react";
import { DocsThemeConfig, Link, useConfig } from "nextra-theme-docs";

const projectName = "React Bluesky Embed";

const config: DocsThemeConfig = {
  logo: (
    <div className="flex gap-2 items-center">
      <svg
        className="h-6 w-6"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 360 320"
      >
        <path
          fill="#0085ff"
          d="M180 142c-16.3-31.7-60.7-90.8-102-120C38.5-5.9 23.4-1 13.5 3.4 2.1 8.6 0 26.2 0 36.5c0 10.4 5.7 84.8 9.4 97.2 12.2 41 55.7 55 95.7 50.5-58.7 8.6-110.8 30-42.4 106.1 75.1 77.9 103-16.7 117.3-64.6 14.3 48 30.8 139 116 64.6 64-64.6 17.6-97.5-41.1-106.1 40 4.4 83.5-9.5 95.7-50.5 3.7-12.4 9.4-86.8 9.4-97.2 0-10.3-2-27.9-13.5-33C336.5-1 321.5-6 282 22c-41.3 29.2-85.7 88.3-102 120Z"
        ></path>
      </svg>
      <span className="font-bold">{projectName}</span>
    </div>
  ),
  head: function useHead() {
    const { title } = useConfig();

    return (
      <>
        <title>{title + " - " + projectName}</title>
        <meta name="msapplication-TileColor" content="#fff" />
        <meta name="theme-color" content="#fff" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="Content-Language" content="en" />
        <meta
          name="description"
          content="Embed post threads in your React application."
        />
        <meta
          name="og:description"
          content="Embed post threads in your React application."
        />
        <link rel="icon" href="/favicon.ico" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:site:domain"
          content="react-bluesky-embed.vercel.app"
        />
        <meta
          name="twitter:url"
          content="https://react-bluesky-embed.vercel.app"
        />
        <meta
          name="og:title"
          content={title ? title + " - " + projectName : projectName}
        />
        <meta name="apple-mobile-web-app-title" content={projectName} />
      </>
    );
  },
  project: {
    link: "https://github.com/hichemfantar/react-bluesky-embed",
  },
  sidebar: {
    defaultMenuCollapseLevel: 1,
  },
  banner: {
    // content: "🎉 React Bluesky Embed is now in Beta.",
    key: "beta",
    dismissible: false,

    // key: '3.0-release',
    content: (
      <div className='before:content-["🌐_"] whitespace-break-spaces'>
        {/* React Bluesky Embed is now in Beta.{" "} */}
        <span>Bluesky Community needs you. </span>
        <Link
          href="https://github.com/hichemfantar/bluesky-community"
          className='after:content-["_→"]'
        >
          Read more
        </Link>
      </div>
    ),
  },
  docsRepositoryBase: "https://github.com/hichemfantar/react-bluesky-embed",
  editLink: {
    content: "Edit this page on GitHub →",
  },
  footer: {
    content: (
      <div className="flex w-full flex-col items-center sm:items-start">
        <p className="text-xs">
          © {new Date().getFullYear()} Hichem Fantar. All rights reserved.
        </p>
      </div>
    ),
  },
};

export default config;
