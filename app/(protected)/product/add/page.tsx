"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  AddProductRequest,
  Product,
} from "@/types/product";

const initialFormData: AddProductRequest = {
  title: "",
  description: "",
  category: "",
  price: 0,
  stock: 0,
  brand: "",
};

export default function AddProductPage() {
  const router = useRouter();

  const [formData, setFormData] =
    useState<AddProductRequest>(initialFormData);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  function updateField<K extends keyof AddProductRequest>(
    field: K,
    value: AddProductRequest[K],
  ) {
    setFormData((previous) => ({
      ...previous,
      [field]: value,
    }));
  }

  async function handleSubmit() {
    if (
      !formData.title.trim() ||
      !formData.description.trim() ||
      !formData.category.trim()
    ) {
      setError("Please complete all required fields.");
      return;
    }

    try {
      setError("");
      setSuccessMessage("");
      setIsSubmitting(true);

      const response = await fetch("/api/product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const contentType = response.headers.get("content-type");

      if (!contentType?.includes("application/json")) {
        throw new Error("The API returned an invalid response.");
      }

      const data = (await response.json()) as Product & {
        message?: string;
      };

      if (!response.ok) {
        throw new Error(data.message ?? "Failed to add product");
      }

      setSuccessMessage(
        `Product "${data.title}" was added successfully with ID ${data.id}.`,
      );

      setFormData(initialFormData);

      setTimeout(() => {
        router.push("/product");
        router.refresh();
      }, 1000);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Unable to add product",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/product"
          className="mb-6 inline-flex items-center text-sm font-medium text-gray-600 transition hover:text-gray-900"
        >
          ← Back to products
        </Link>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Add Product
          </h1>

          <p className="mt-2 text-gray-600">
            Enter the information for the new product.
          </p>
        </div>

        <div className="space-y-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          {error && (
            <div
              role="alert"
              className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
            >
              {error}
            </div>
          )}

          {successMessage && (
            <div
              role="status"
              className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700"
            >
              {successMessage}
            </div>
          )}

          <div>
            <label
              htmlFor="title"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Product title
            </label>

            <input
              id="title"
              type="text"
              value={formData.title}
              onChange={(event) =>
                updateField("title", event.target.value)
              }
              placeholder="Example: BMW Pencil"
              disabled={isSubmitting}
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-900 focus:ring-2 focus:ring-gray-200 disabled:cursor-not-allowed disabled:bg-gray-100"
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Description
            </label>

            <textarea
              id="description"
              value={formData.description}
              onChange={(event) =>
                updateField("description", event.target.value)
              }
              placeholder="Enter the product description"
              rows={5}
              disabled={isSubmitting}
              className="w-full resize-none rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-900 focus:ring-2 focus:ring-gray-200 disabled:cursor-not-allowed disabled:bg-gray-100"
            />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label
                htmlFor="category"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Category
              </label>

              <input
                id="category"
                type="text"
                value={formData.category}
                onChange={(event) =>
                  updateField("category", event.target.value)
                }
                placeholder="Example: stationery"
                disabled={isSubmitting}
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-900 focus:ring-2 focus:ring-gray-200 disabled:cursor-not-allowed disabled:bg-gray-100"
              />
            </div>

            <div>
              <label
                htmlFor="brand"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Brand
              </label>

              <input
                id="brand"
                type="text"
                value={formData.brand}
                onChange={(event) =>
                  updateField("brand", event.target.value)
                }
                placeholder="Example: BMW"
                disabled={isSubmitting}
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-900 focus:ring-2 focus:ring-gray-200 disabled:cursor-not-allowed disabled:bg-gray-100"
              />
            </div>

            <div>
              <label
                htmlFor="price"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Price
              </label>

              <input
                id="price"
                type="number"
                min="0"
                step="0.01"
                value={formData.price}
                onChange={(event) =>
                  updateField(
                    "price",
                    Number(event.target.value),
                  )
                }
                disabled={isSubmitting}
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 outline-none transition focus:border-gray-900 focus:ring-2 focus:ring-gray-200 disabled:cursor-not-allowed disabled:bg-gray-100"
              />
            </div>

            <div>
              <label
                htmlFor="stock"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Stock
              </label>

              <input
                id="stock"
                type="number"
                min="0"
                step="1"
                value={formData.stock}
                onChange={(event) =>
                  updateField(
                    "stock",
                    Number(event.target.value),
                  )
                }
                disabled={isSubmitting}
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 outline-none transition focus:border-gray-900 focus:ring-2 focus:ring-gray-200 disabled:cursor-not-allowed disabled:bg-gray-100"
              />
            </div>
          </div>

          <div className="flex flex-col-reverse gap-3 border-t border-gray-200 pt-6 sm:flex-row sm:justify-end">
            <Link
              href="/product"
              className="rounded-lg border border-gray-300 px-5 py-2.5 text-center text-sm font-medium text-gray-700 transition hover:bg-gray-100"
            >
              Cancel
            </Link>

            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="flex items-center justify-center gap-2 rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting && (
                <span
                  className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white"
                  aria-hidden="true"
                />
              )}

              {isSubmitting
                ? "Adding product..."
                : "Add product"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}