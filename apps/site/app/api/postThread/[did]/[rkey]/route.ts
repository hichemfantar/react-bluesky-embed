import { NextResponse } from "next/server";
import { getPostThread } from "react-bluesky-embed/api";
import cors from "edge-cors";
import { type NextRequest } from "next/server";

type RouteSegment = { params: { did: string; rkey: string } };

export const fetchCache = "only-cache";

// TODO: refactor all [postthread] routes with nested routes [did]->[rkey]

export async function GET(req: NextRequest, { params }: RouteSegment) {
  try {
    const did = params.did;
    const rkey = params.rkey;

    const postThread = await getPostThread({
      did: did,
      rkey: rkey,
    });

    return cors(
      req,
      NextResponse.json(
        { data: postThread ?? null },
        { status: postThread ? 200 : 404 }
      )
    );
  } catch (error: any) {
    console.error(error);
    return cors(
      req,
      NextResponse.json(
        { error: error.message ?? "Bad request." },
        { status: 400 }
      )
    );
  }
}
