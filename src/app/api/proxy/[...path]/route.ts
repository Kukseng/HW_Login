import { authOptions } from "@/lib/auth/next-auth-options";
import { getServerSession } from "next-auth";

import { NextRequest, NextResponse } from "next/server";
async function proxy(
  req: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
  method: string
) {
  //  Authentication Check
  // Get the user's session from NextAuth (server-side)
  const session = await getServerSession(authOptions);
   // If no session or access token, return 401 Unauthorized
  if (!session?.access_token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  // URL Construction
  // Await params to comply with Next.js 15 dynamic API requirements
  const { path } = await params;
  // Build the target API URL:
  const url = `${process.env.BASE_URL_MBANKING_API}/${path.join('/')}${req.nextUrl.search}`;

  // Request Body Handling
  const body = ['POST', 'PUT', 'PATCH'].includes(method)
    ? JSON.stringify(await req.json())
    : undefined;

  // Forward Request to External API
  const res = await fetch(url, {
    method,
    headers: {
      // HIDDEN: Authorization header is added server-side
      // The client never sees this token in browser dev tools
      'Authorization': `Bearer ${session.access_token}`,
      'Content-Type': 'application/json'
    },
    body, // Include body only for relevant methods
  });
  // Return Response
  return NextResponse.json(await res.json(), { status: res.status });
}
// HTTP Method Handlers
// Next.js App Router requires separate exports for each HTTP method

export const GET = (req: NextRequest, ctx: { params: Promise<{ path: string[] }> }) =>
  proxy(req, ctx, 'GET');

export const POST = (req: NextRequest, ctx: { params: Promise<{ path: string[] }> }) =>
  proxy(req, ctx, 'POST');

export const PUT = (req: NextRequest, ctx: { params: Promise<{ path: string[] }> }) =>
  proxy(req, ctx, 'PUT');

export const DELETE = (req: NextRequest, ctx: { params: Promise<{ path: string[] }> }) =>
  proxy(req, ctx, 'DELETE');

export const PATCH = (req: NextRequest, ctx: { params: Promise<{ path: string[] }> }) =>
  proxy(req, ctx, 'PATCH');
