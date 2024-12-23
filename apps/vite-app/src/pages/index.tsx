import { PostThread } from "react-bluesky-embed";

export const IndexPage = () => (
  <div className="max-w-2xl">
    <PostThread
      params={{
        did: "did:plc:zl7kgfro2rx3pavbslhhdhuy",
        rkey: "3lblfjf4evs2v",
      }}
      config={{
        depth: 6,
      }}
      theme="dark"
      hidePost={false}
    />
  </div>
);
