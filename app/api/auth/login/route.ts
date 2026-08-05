import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    const backendResponse = await fetch(
      `https://dummyjson.com/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: email,
          password: password,
          expiresInMins: 30, // optional, defaults to 60
        }),
        credentials: 'include' // Include cookies (e.g., accessToken) in the request
      }
    );
    if (!backendResponse.ok) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
      );
    }

    const { accessToken } = await backendResponse.json();

    const cookieStore = await cookies();

    cookieStore.set("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60, // 60 minutes
    });

    return NextResponse.json({
      message: "Login successful",
    });
  } catch {
    return NextResponse.json(
      { message: "Unable to process login" },
      { status: 500 }
    );
  }
}