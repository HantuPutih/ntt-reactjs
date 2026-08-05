// src/lib/auth.ts

import { cookies } from "next/headers";
import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export async function getSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  if (!token || !secret) {
    return null;
  }

  try {
    const { payload } = await jwtVerify(token, secret);

    return {
      userId: payload.userId as string,
      email: payload.email as string | undefined,
    };
  } catch {
    // Invalid, modified, or expired token
    return null;
  }
}