import { NextResponse } from "next/server";

type ProductRouteContext = {
  params: Promise<{
    id: string;
  }>;
};

const PRODUCTS_API_URL = process.env.NEXT_PUBLIC_API_URL + "products";

export async function GET(
  _request: Request,
  context: ProductRouteContext,
) {
  try {
    const { id } = await context.params;

    const response = await fetch(`${PRODUCTS_API_URL}/${id}`, {
      cache: "no-store",
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        {
          message: data.message ?? "Product not found",
        },
        {
          status: response.status,
        },
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Get product error:", error);

    return NextResponse.json(
      {
        message: "Unable to retrieve product",
      },
      {
        status: 500,
      },
    );
  }
}

export async function PATCH(
  request: Request,
  context: ProductRouteContext,
) {
  try {
    const { id } = await context.params;
    const body = await request.json();

    const response = await fetch(`${PRODUCTS_API_URL}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        {
          message: data.message ?? "Failed to update product",
        },
        {
          status: response.status,
        },
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Update product error:", error);

    return NextResponse.json(
      {
        message: "Unable to update product",
      },
      {
        status: 500,
      },
    );
  }
}

export async function PUT(
  request: Request,
  context: ProductRouteContext,
) {
  try {
    const { id } = await context.params;
    const body = await request.json();

    const response = await fetch(`${PRODUCTS_API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        {
          message: data.message ?? "Failed to update product",
        },
        {
          status: response.status,
        },
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Replace product error:", error);

    return NextResponse.json(
      {
        message: "Unable to update product",
      },
      {
        status: 500,
      },
    );
  }
}

export async function DELETE(
  _request: Request,
  context: ProductRouteContext,
) {
  try {
    const { id } = await context.params;

    const response = await fetch(`${PRODUCTS_API_URL}/${id}`, {
      method: "DELETE",
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        {
          message: data.message ?? "Failed to delete product",
        },
        {
          status: response.status,
        },
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Delete product error:", error);

    return NextResponse.json(
      {
        message: "Unable to delete product",
      },
      {
        status: 500,
      },
    );
  }
}