import clsx from "clsx";
import { PostThread } from "react-bluesky-embed";
import styles from "./app.module.css";
import "./base.css";

export default function App() {
  return (
    <div className={clsx(styles.root, "react-bluesky-embed-theme")}>
      <main className={styles.main}>
        <PostThread
          params={{
            did: "did:plc:zl7kgfro2rx3pavbslhhdhuy",
            rkey: "3lblfjf4evs2v",
          }}
        />
      </main>
    </div>
  );
}
