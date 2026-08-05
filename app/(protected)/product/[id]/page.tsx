import Link from "next/link";
import { notFound } from "next/navigation";
import { headers } from "next/headers";
import { Product } from "@/types/product";

type ProductDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

type ApiErrorResponse = {
  message?: string;
};

async function getProduct(id: string): Promise<Product | null> {
  /*
   * Server Components cannot reliably use a relative URL such as
   * fetch(`/api/products/${id}`), so construct the full internal URL.
   */
  const headerStore = await headers();

  const host = headerStore.get("host");
  const protocol =
    process.env.NODE_ENV === "production" ? "https" : "http";

  if (!host) {
    throw new Error("Unable to determine application host");
  }

  const response = await fetch(
    `${protocol}://${host}/api/product/${encodeURIComponent(id)}`,
    {
      cache: "no-store",
    },
  );

  if (response.status === 404) {
    return null;
  }

  const data = (await response.json()) as Product | ApiErrorResponse;

  if (!response.ok) {
    throw new Error(
      "message" in data
        ? data.message ?? "Failed to retrieve product"
        : "Failed to retrieve product",
    );
  }

  return data as Product;
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { id } = await params;

  let product: Product | null = null;
  let error = "";

  try {
    product = await getProduct(id);
  } catch (caughtError) {
    error =
      caughtError instanceof Error
        ? caughtError.message
        : "Unable to retrieve product";
  }

  if (!product && !error) {
    notFound();
  }

  if (error) {
    return (
      <section className="min-h-[calc(100vh-3.75rem)] bg-gray-50 p-6">
        <div className="mx-auto max-w-xl">
          <div className="rounded-2xl border border-red-200 bg-white p-8 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-xl font-bold text-red-600">
              !
            </div>

            <h1 className="mt-5 text-xl font-bold text-gray-900">
              Unable to load product
            </h1>

            <p className="mt-3 text-sm text-red-600">
              {error}
            </p>

            <Link
              href="/product"
              className="mt-6 inline-flex rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-gray-700"
            >
              Back to products
            </Link>
          </div>
        </div>
      </section>
    );
  }

  if (!product) {
    return null;
  }

  return (
    <section className="min-h-[calc(100vh-3.75rem)] bg-gray-50 p-6">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/product"
          className="mb-6 inline-flex items-center text-sm font-medium text-gray-600 transition hover:text-gray-900"
        >
          ← Back to products
        </Link>

        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="grid lg:grid-cols-2">
            <div className="flex min-h-96 items-center justify-center bg-gray-100 p-8">
              {product.thumbnail ? (
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="h-96 w-full object-contain"
                />
              ) : (
                <div className="flex h-96 w-full items-center justify-center rounded-xl bg-gray-200 text-sm text-gray-500">
                  No product image
                </div>
              )}
            </div>

            <div className="p-6 sm:p-8">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium capitalize text-gray-600">
                  {product.category}
                </span>

                {product.stock !== undefined && product.stock > 0 ? (
                  <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                    In stock
                  </span>
                ) : (
                  <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-700">
                    Out of stock
                  </span>
                )}
              </div>

              <h1 className="mt-5 text-3xl font-bold tracking-tight text-gray-900">
                {product.title}
              </h1>

              {product.brand && (
                <p className="mt-2 text-sm text-gray-500">
                  Brand:{" "}
                  <span className="font-medium text-gray-700">
                    {product.brand}
                  </span>
                </p>
              )}

              <p className="mt-6 leading-7 text-gray-600">
                {product.description}
              </p>

              <div className="mt-8 flex flex-wrap items-end justify-between gap-4 border-y border-gray-200 py-6">
                <div>
                  <p className="text-sm text-gray-500">Price</p>

                  <p className="mt-1 text-3xl font-bold text-gray-900">
                    ${product.price.toFixed(2)}
                  </p>
                </div>

                {product.rating !== undefined && (
                  <div className="rounded-lg bg-amber-50 px-4 py-2">
                    <p className="text-xs text-amber-700">
                      Customer rating
                    </p>

                    <p className="mt-1 font-semibold text-amber-800">
                      ★ {product.rating.toFixed(1)}
                    </p>
                  </div>
                )}
              </div>

              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="rounded-xl bg-gray-50 p-4">
                  <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                    Product ID
                  </p>

                  <p className="mt-2 font-semibold text-gray-900">
                    {product.id}
                  </p>
                </div>

                <div className="rounded-xl bg-gray-50 p-4">
                  <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                    Available stock
                  </p>

                  <p className="mt-2 font-semibold text-gray-900">
                    {product.stock ?? "Not specified"}
                  </p>
                </div>
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href={`/product/${product.id}/edit`}
                  className="flex-1 rounded-lg bg-gray-900 px-5 py-3 text-center text-sm font-medium text-white transition hover:bg-gray-700"
                >
                  Edit product
                </Link>

                <Link
                  href={`/product/${product.id}/delete`}
                  className="flex-1 rounded-lg border border-red-300 px-5 py-3 text-center text-sm font-medium text-red-600 transition hover:bg-red-50"
                >
                  Delete product
                </Link>
              </div>
            </div>
          </div>

          {product.images && product.images.length > 1 && (
            <div className="border-t border-gray-200 p-6 sm:p-8">
              <h2 className="text-lg font-semibold text-gray-900">
                Product images
              </h2>

              <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                {product.images.map((image, index) => (
                  <div
                    key={`${image}-${index}`}
                    className="flex h-44 items-center justify-center rounded-xl border border-gray-200 bg-gray-50 p-3"
                  >
                    <img
                      src={image}
                      alt={`${product.title} image ${index + 1}`}
                      className="h-full w-full object-contain"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}