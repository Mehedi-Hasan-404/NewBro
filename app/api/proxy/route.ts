import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get("url");
  if (!url) {
    return new Response("Missing url", { status: 400 });
  }

  try {
    const response = await fetch(url);
    if (!response.ok) {
      return new Response("Failed to fetch stream", { status: response.status });
    }

    // ✅ Clone headers and add CORS
    const headers = new Headers(response.headers);
    headers.set("Access-Control-Allow-Origin", "*");
    headers.set("Content-Type", response.headers.get("content-type") || "video/mp2t");

    return new Response(response.body, { headers });
  } catch (err) {
    return new Response("Error fetching stream", { status: 500 });
  }
}
