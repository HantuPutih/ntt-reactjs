"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  ApiErrorResponse,
  Product,
} from "@/types/product";

type DeleteProductResponse = {
  message: string;
  product: Product;
};

export default function DeleteProductPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();

  const productId = params.id;

  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProduct() {
      try {
        setError("");
        setIsLoading(true);

        const response = await fetch(
          `/api/product/${encodeURIComponent(productId)}`,
          {
            method: "GET",
            cache: "no-store",
          },
        );

        const data = (await response.json()) as
          | Product
          | ApiErrorResponse;

        if (!response.ok) {
          const message =
            "message" in data
              ? data.message
              : "Failed to retrieve product";

          throw new Error(message);
        }

        setProduct(data as Product);
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : "Unable to retrieve product",
        );
      } finally {
        setIsLoading(false);
      }
    }

    if (productId) {
      void loadProduct();
    }
  }, [productId]);

  async function handleDelete() {
    if (!product) {
      return;
    }

    try {
      setError("");
      setIsDeleting(true);

      const response = await fetch(
        `/api/product/${encodeURIComponent(productId)}`,
        {
          method: "DELETE",
        },
      );

      const data = (await response.json()) as
        | DeleteProductResponse
        | ApiErrorResponse;

      if (!response.ok) {
        throw new Error(
          data.message ?? "Failed to delete product",
        );
      }

      router.push("/product");
      router.refresh();
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Unable to delete product",
      );
    } finally {
      setIsDeleting(false);
    }
  }

  if (isLoading) {
    return (
      <div className="flex min-h-[calc(100vh-3.75rem)] items-center justify-center bg-gray-50">
        <div
          className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-gray-900"
          role="status"
          aria-label="Loading product"
        />
      </div>
    );
  }

  if (error && !product) {
    return (
      <section className="min-h-[calc(100vh-3.75rem)] bg-gray-50 p-6">
        <div className="mx-auto max-w-xl">
          <div className="rounded-2xl border border-red-200 bg-white p-8 shadow-sm">
            <h1 className="text-xl font-bold text-gray-900">
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
      <div className="mx-auto max-w-xl">
        <Link
          href={`/product/${product.id}`}
          className="mb-6 inline-flex items-center text-sm font-medium text-gray-600 transition hover:text-gray-900"
        >
          ← Back to product
        </Link>

        <div className="rounded-2xl border border-red-200 bg-white p-8 shadow-sm">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-xl font-bold text-red-600">
            !
          </div>

          <h1 className="mt-5 text-2xl font-bold text-gray-900">
            Delete product
          </h1>

          <p className="mt-3 leading-6 text-gray-600">
            Are you sure you want to delete this product?
          </p>

          <div className="mt-6 rounded-xl border border-gray-200 bg-gray-50 p-4">
            <div className="flex items-center gap-4">
              {product.thumbnail && (
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="h-20 w-20 shrink-0 rounded-lg bg-white object-contain p-2"
                />
              )}

              <div className="min-w-0">
                <h2 className="truncate font-semibold text-gray-900">
                  {product.title}
                </h2>

                <p className="mt-1 text-sm capitalize text-gray-500">
                  {product.category}
                </p>

                <p className="mt-2 font-semibold text-gray-900">
                  ${product.price.toFixed(2)}
                </p>
              </div>
            </div>
          </div>

          <p className="mt-5 text-sm text-red-600">
            This action cannot be undone.
          </p>

          {error && (
            <div
              role="alert"
              className="mt-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
            >
              {error}
            </div>
          )}

          <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <Link
              href={`/product/${product.id}`}
              className={`rounded-lg border border-gray-300 px-5 py-2.5 text-center text-sm font-medium text-gray-700 transition hover:bg-gray-100 ${
                isDeleting
                  ? "pointer-events-none opacity-50"
                  : ""
              }`}
            >
              Cancel
            </Link>

            <button
              type="button"
              onClick={handleDelete}
              disabled={isDeleting}
              className="flex items-center justify-center gap-2 rounded-lg bg-red-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isDeleting && (
                <span
                  className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white"
                  aria-hidden="true"
                />
              )}

              {isDeleting
                ? "Deleting product..."
                : "Delete product"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}