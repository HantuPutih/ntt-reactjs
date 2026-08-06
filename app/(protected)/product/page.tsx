"use client";

import Link from "next/link";
import {useCallback, useEffect, useState} from "react";
import {Product, ProductResponse} from "@/types/product";
import Spinner from "@/components/spinner";
import {useAppSelector} from "@/lib/hooks";
import ProductCard from "@/components/ProductCard";

export default function ProductPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const deletedProducts = useAppSelector((state) => state.product.deletedProducts);

  const filtered = useCallback((data:ProductResponse) => {
    return data.products.filter(
      (product: Product) =>
        !deletedProducts.some(
          (deletedProduct: { id: number; }) => deletedProduct.id === product.id,
        ),
    );
  }, []);

  const loadProducts = useCallback(async () => {
    try {
      setError("");
      setIsLoading(true);

      const response = await fetch("/api/product");

      const data = (await response.json()) as ProductResponse & {
        message?: string;
      };

      if (!response.ok) {
        throw new Error(data.message ?? "Failed to load products");
      }

      setProducts(filtered(data));
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Unable to load products",
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadProducts();
  }, [loadProducts]);

  async function handleSearch() {
    const query = searchQuery.trim();

    if (!query) {
      await loadProducts();
      return;
    }

    try {
      setError("");
      setIsLoading(true);

      const response = await fetch(
        `/api/product/search?q=${encodeURIComponent(query)}`,
      );

      const data = (await response.json()) as ProductResponse & {
        message?: string;
      };

      if (!response.ok) {
        throw new Error(data.message ?? "Search failed");
      }

      setProducts(data.products);
    } catch (error) {
      console.log(error, 'error')
      setError(
        error instanceof Error
          ? error.message
          : "Unable to search products",
      );
    } finally {
      setIsLoading(false);
    }
  }

  async function handleReset() {
    setSearchQuery("");
    await loadProducts();
  }

  return (
    <section className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Products
            </h1>

            <p className="mt-2 text-gray-600">
              Browse and manage products.
            </p>
          </div>

          <Link
            href="/product/add"
            className="rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-700"
          >
            Add product
          </Link>
        </div>

        <div className="mb-8 flex gap-3 rounded-xl border border-gray-200 bg-white p-4">
          <input
            type="search"
            value={searchQuery}
            onChange={(event) =>
              setSearchQuery(event.target.value)
            }
            onKeyDown={(event) => {
              if (event.key === "Enter" && !isLoading) {
                void handleSearch();
              }
            }}
            placeholder="Search products"
            className="min-w-0 flex-1 rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-gray-900"
          />

          <button
            type="button"
            onClick={handleSearch}
            disabled={isLoading}
            className="rounded-lg bg-gray-900 px-6 py-2.5 text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            Search
          </button>

          <button
            type="button"
            onClick={handleReset}
            disabled={isLoading}
            className="rounded-lg border border-gray-300 px-6 py-2.5 text-gray-700 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Reset
          </button>
        </div>

        {error && (
          <div className="mb-6 rounded-lg bg-red-50 p-4 text-red-700">
            {error}
          </div>
        )}

        {isLoading ? (
          <div className="flex min-h-80 items-center justify-center">
            <Spinner />
          </div>
        ) : products.length === 0 ? (
          <div className="rounded-xl border border-gray-200 bg-white p-10 text-center">
            <h2 className="text-lg font-semibold text-gray-900">
              No products found
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Try another search keyword.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}