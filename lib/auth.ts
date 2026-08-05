// src/lib/auth.ts

import { cookies } from "next/headers";
import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET);

export async function getSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  if (!token || !secret) {
    return null;
  }

  try {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}auth/me`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`, // Pass JWT via Authorization header
      },
      credentials: 'include' // Include cookies (e.g., accessToken) in the request
    })
      .then(res => res.json())
      .then((data) =>{
        return {
          firstName: data.firstName,
          lastName: data.lastName,
        }
      });

  } catch(err) {
    console.log({err});
    // Invalid, modified, or expired token
    return null;
  }
}