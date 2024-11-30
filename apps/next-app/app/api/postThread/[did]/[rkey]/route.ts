import { NextRequest, NextResponse } from "next/server";
import { getPostThread } from "react-bluesky-embed/api";

type RouteSegment = { params: { did: string; rkey: string } };

export const fetchCache = "only-cache";

export async function GET(_req: NextRequest, { params }: RouteSegment) {
  try {
    const did = params.did;
    const rkey = params.rkey;

    const postThread = await getPostThread({
      did: did,
      rkey: rkey,
    });
    return NextResponse.json(
      { data: postThread ?? null },
      { status: postThread ? 200 : 404 }
    );
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { error: error.message ?? "Bad request." },
      { status: 400 }
    );
  }
}
