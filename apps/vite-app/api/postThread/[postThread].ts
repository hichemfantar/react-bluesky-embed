import type { VercelRequest, VercelResponse } from "@vercel/node";
import { getPostThread } from "react-bluesky-embed/api";

const handler = async (req: VercelRequest, res: VercelResponse) => {
  const postThreadId = req.query.postThread;

  if (req.method !== "GET" || typeof postThreadId !== "string") {
    res.status(400).json({ error: "Bad Request." });
    return;
  }

  try {
    const postThread = await getPostThread(postThreadId);
    res.status(postThread ? 200 : 404).json({ data: postThread ?? null });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message ?? "Bad request." });
  }
};

export default handler;
