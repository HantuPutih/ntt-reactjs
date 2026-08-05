import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const query = request.nextUrl.searchParams.get("q")?.trim() ?? "";

    console.log(`${process.env.NEXT_PUBLIC_API_URL}search?q=${encodeURIComponent(query)}`)
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}products/search?q=${encodeURIComponent(query)}`,
      {
        cache: "no-store",
      },
    );

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        {
          message: data.message ?? "Failed to search products",
        },
        {
          status: response.status,
        },
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Search products error:", error);

    return NextResponse.json(
      {
        message: "Unable to search products",
      },
      {
        status: 500,
      },
    );
  }
}