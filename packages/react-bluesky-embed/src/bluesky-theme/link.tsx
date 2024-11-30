import React from "react";

export function Link({
  href,
  className,
  disableTracking,
  ...props
}: {
  href: string;
  className?: string;
  disableTracking?: boolean;
} & React.DetailedHTMLProps<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
>) {
  // const searchParam = new URLSearchParams(window.location.search)
  // const ref_url = searchParam.get('ref_url')

  // const newSearchParam = new URLSearchParams()
  // newSearchParam.set('ref_src', 'embed')
  // if (ref_url) {
  //   newSearchParam.set('ref_url', ref_url)
  // }

  return (
    <a
      href={`${href.startsWith("http") ? href : `https://bsky.app${href}`}${
        disableTracking ? "" : `?`
      }`}
      target="_blank"
      rel="noopener noreferrer nofollow"
      className={`cursor-pointer ${className || ""}`}
      {...props}
    />
  );
}
