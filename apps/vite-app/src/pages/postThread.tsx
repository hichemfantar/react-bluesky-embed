import { AtpAgent } from "@atproto/api";
import { useState } from "react";
import {
  EmbeddedPostThread,
  PostThreadNotFound,
  PostThreadSkeleton,
  Theme,
} from "react-bluesky-embed";
import { getPostThread, PostThreadParams } from "react-bluesky-embed/api";
import { useSearchParams } from "react-router-dom";
import useSWR from "swr";

async function fetcher([params]: [PostThreadParams]) {
  const res = await getPostThread({
    did: params.did,
    rkey: params.rkey,
  });
  return res;
}

type SearchParamsObj = {
  did?: string;
  rkey?: string;
};

const DEFAULT_URI =
  "at://did:plc:zl7kgfro2rx3pavbslhhdhuy/app.bsky.feed.post/3lblfjf4evs2v";

export const PostThreadPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [theme, setTheme] = useState<Theme>("light");
  const [pastedUri, setPastedUri] = useState(DEFAULT_URI);
  const [resolvedUri, setResolvedUri] = useState(DEFAULT_URI);
  const searchParamsObj: SearchParamsObj = Object.fromEntries(
    searchParams.entries()
  );

  const urlp = new URL("http://localhost:3000/api/postThread");
  if (searchParamsObj.did && searchParamsObj.rkey) {
    urlp.searchParams.append("did", searchParamsObj.did);
    urlp.searchParams.append("rkey", searchParamsObj.rkey);
  }

  const { data, error, isLoading } = useSWR(
    () => [
      {
        did: searchParamsObj.did,
        rkey: searchParamsObj.rkey,
      },
    ],
    fetcher,
    {}
    // urlp.href,
    // `http://localhost:3000/api/postThread/${params.uri}`,
  );

  return (
    <div className="grid gap-y-4 sm:gap-x-4 md:grid-cols-2 py-4">
      <div className="md:col-span-1">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label htmlFor="did" className="">
              DID
            </label>
            <textarea
              className="border rounded-lg py-3 w-full max-w-[600px] px-4"
              rows={1}
              name="did"
              id="did"
              placeholder="opensauced.bsky.social"
              value={searchParamsObj.did}
              onChange={(e) => {
                setSearchParams((prev) => {
                  return {
                    ...Object.fromEntries(prev.entries()),
                    did: e.target.value.trim(),
                  };
                });
              }}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="rkey" className="">
              Rkey
            </label>
            <textarea
              className="border rounded-lg py-3 w-full max-w-[600px] px-4"
              rows={1}
              name="rkey"
              id="rkey"
              value={searchParamsObj.rkey}
              onChange={(e) => {
                setSearchParams((prev) => {
                  return {
                    ...Object.fromEntries(prev.entries()),
                    rkey: e.target.value.trim(),
                  };
                });
              }}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="Uri" className="">
              Uri
            </label>
            <textarea
              className="border rounded-lg py-3 w-full max-w-[600px] px-4"
              rows={1}
              name="Uri"
              id="Uri"
              value={pastedUri}
              onChange={(e) => {
                // setPastedUri(e.target.value.trim());
                const pastedUri = e.target.value.trim();
                async function name() {
                  if (pastedUri.startsWith("at://")) {
                    setResolvedUri(pastedUri);
                    const arr = pastedUri.split("/");
                    const did = arr[2];
                    const rkey = arr[4];
                    setSearchParams((prev) => {
                      return {
                        ...Object.fromEntries(prev.entries()),
                        did: did,
                        rkey: rkey,
                      };
                    });
                  } else {
                    try {
                      const agent = new AtpAgent({
                        service: "https://public.api.bsky.app",
                      });

                      const urlp = new URL(pastedUri);
                      if (!urlp.hostname.endsWith("bsky.app")) {
                        throw new Error("Invalid hostname");
                      }
                      const split = urlp.pathname.slice(1).split("/");
                      if (split.length < 4) {
                        throw new Error("Invalid pathname");
                      }
                      const [profile, didOrHandle, type, rkey] = split;
                      if (profile !== "profile" || type !== "post") {
                        throw new Error("Invalid profile or type");
                      }
                      let did = didOrHandle;
                      if (!didOrHandle.startsWith("did:")) {
                        const resolution = await agent.resolveHandle({
                          handle: didOrHandle,
                        });
                        if (!resolution.data.did) {
                          throw new Error("No DID found");
                        }
                        did = resolution.data.did;
                      }
                      const atUri = `at://${did}/app.bsky.feed.post/${rkey}`;
                      setResolvedUri(atUri);
                      setSearchParams((prev) => {
                        return {
                          ...Object.fromEntries(prev.entries()),
                          did: did,
                          rkey: rkey,
                        };
                      });
                    } catch (err) {
                      console.log(err);
                      throw new Error("Invalid Bluesky URL");
                    }
                  }
                }
                name();
              }}
            />
          </div>
        </div>
        <div>
          <button
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          >
            Switch Theme
          </button>
        </div>
      </div>
      <div className="md:col-span-1">
        {isLoading && <PostThreadSkeleton theme={theme} />}
        {/* {<PostThreadNotFound theme={theme} error={"error"} />} */}
        {!isLoading && (error || !data) && (
          <PostThreadNotFound theme={theme} error={error} />
        )}
        {data && <EmbeddedPostThread theme={theme} postThread={data} />}
      </div>
    </div>
  );
};
