import { NextResponse } from "next/server";

const PRODUCTS_API_URL = process.env.NEXT_PUBLIC_API_URL + "products";

export async function GET() {
  try {
    const response = await fetch(PRODUCTS_API_URL, {
      cache: "no-store",
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        {
          message: data.message ?? "Failed to retrieve products",
        },
        {
          status: response.status,
        },
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Get products error:", error);

    return NextResponse.json(
      {
        message: "Unable to connect to the product service",
      },
      {
        status: 500,
      },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const response = await fetch(`${PRODUCTS_API_URL}/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        {
          message: data.message ?? "Failed to add product",
        },
        {
          status: response.status,
        },
      );
    }

    return NextResponse.json(data, {
      status: 201,
    });
  } catch (error) {
    console.error("Add product error:", error);

    return NextResponse.json(
      {
        message: "Unable to add product",
      },
      {
        status: 500,
      },
    );
  }
}