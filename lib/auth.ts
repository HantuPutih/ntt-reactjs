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
    let result = null
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}auth/me`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      credentials: 'include'
    });

    const data = await res.json();

    return {
      id: data.id,
      firstName: data.firstName,
      lastName: data.lastName,
      image: data.image,
    };

  } catch(err) {
    console.log({err});
    return null;
  }
}