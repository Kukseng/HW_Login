import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/lib/auth/next-auth-options";
import { getServerSession } from "next-auth";
async function proxy(
  req: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
  method: string
) {
  //  Authentication Check
  // Try to get token from Authorization header first (Redux auth)
  const authHeader = req.headers.get("authorization");
  let token = authHeader?.replace("Bearer ", "");

  // If no authorization header, try to get from NextAuth session
  if (!token) {
    const session = await getServerSession(authOptions);
    token = session?.access_token;
  }

  // If no token from either source, return 401 Unauthorized
  if (!token) {
    return NextResponse.json(
      { error: "Unauthorized - No token provided" },
      { status: 401 }
    );
  }

  // URL Construction
  // Await params to comply with Next.js 15 dynamic API requirements
  const { path } = await params;
  // Build the target API URL:
  const url = `${process.env.BASE_URL_MBANKING_API}/${path.join("/")}${
    req.nextUrl.search
  }`;

  console.log(`Proxying ${method} request to:`, url);
  console.log(`Using token:`, token?.substring(0, 20) + "...");

  // Request Body Handling
  const body = ["POST", "PUT", "PATCH"].includes(method)
    ? JSON.stringify(await req.json())
    : undefined;

  // Forward Request to External API
  const res = await fetch(url, {
    method,
    headers: {
      // Use the token from either source
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body, // Include body only for relevant methods
  });

  console.log(`API Response status:`, res.status);

  // Return Response
  return NextResponse.json(await res.json(), { status: res.status });
}
// HTTP Method Handlers
// Next.js App Router requires separate exports for each HTTP method

export const GET = (
  req: NextRequest,
  ctx: { params: Promise<{ path: string[] }> }
) => proxy(req, ctx, "GET");

export const POST = (
  req: NextRequest,
  ctx: { params: Promise<{ path: string[] }> }
) => proxy(req, ctx, "POST");

export const PUT = (
  req: NextRequest,
  ctx: { params: Promise<{ path: string[] }> }
) => proxy(req, ctx, "PUT");

export const DELETE = (
  req: NextRequest,
  ctx: { params: Promise<{ path: string[] }> }
) => proxy(req, ctx, "DELETE");

export const PATCH = (
  req: NextRequest,
  ctx: { params: Promise<{ path: string[] }> }
) => proxy(req, ctx, "PATCH");
