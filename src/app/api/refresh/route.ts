
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

// Create a GET request handler
export async function GET() {
    // Get the refresh token from the client-side cookies
    const cookieStore = cookies();
    const cookieName = "refreshToken";
    const credential = (await cookieStore).get(cookieName);
    // If the refresh token is not found, return an error message to the client-side
    if (!credential) {
        return NextResponse.json(
            {
                message: "Token not found",
            },
            {
                status: 404,
            }
        );
    }
      const refreshToken = credential.value;

    // if the refresh token is found, make a POST request to the Our API
    const response = await fetch(
        `https://car-nextjs-api.cheatdev.online/refresh-token`,
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ refresh_token: refreshToken }),
        }
    );

    
// If the request fails, return an error message to the client-side
    if (!response.ok) {
        return NextResponse.json(
            {
                message: "Failed to refresh access token",
            },
            {
                status: response.status,
            }
        );
    }

    // Parse the response body to get the data
    const data = await response.json();
    const refresh = data?.refresh_token || null;
    const access = data?.access_token || null;
// Serialize the refresh token and set it as a cookie with
// (httpOnly, secure, path, and sameSite options) in the response headers to the client-side
    (await cookieStore).set({
        name: cookieName,
        value: refresh,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        sameSite: "lax"
    });

    // Return the access token to the client-side with the serialized refresh token as a cookie
    return NextResponse.json(
        {
            accessToken: access,
        }
    );
}






