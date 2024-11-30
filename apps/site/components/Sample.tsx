import { useTheme } from "nextra-theme-docs";
import React, { useEffect, useState } from "react";
import { PostThread, Theme } from "react-bluesky-embed";

export function Sample() {
  const { resolvedTheme } = useTheme();

  return (
    <div className="">
      <PostThread
        params={{
          did: "did:plc:gru662w3omynujkgwebgeeof",
          rkey: "3lbirib5xnc2u",
        }}
        theme={resolvedTheme as Theme}
      />
    </div>
  );
}