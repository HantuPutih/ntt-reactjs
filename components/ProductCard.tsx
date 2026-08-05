import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types/product";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      href={`/product/${product.id}`}
      className="group overflow-hidden rounded-xl border border-gray-200 bg-white transition hover:-translate-y-1 hover:border-gray-300 hover:shadow-lg"
    >
      <div className="relative h-52 bg-gray-100">
        <Image
          src={product.thumbnail}
          alt={product.title}
          fill
          className="object-contain p-4 transition duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>

      <div className="p-5">
        <p className="mb-2 text-xs font-medium uppercase tracking-wide text-gray-500">
          {product.category}
        </p>

        <h2 className="line-clamp-1 text-lg font-semibold text-gray-900">
          {product.title}
        </h2>

        <p className="mt-2 line-clamp-2 text-sm text-gray-600">
          {product.description}
        </p>

        <div className="mt-4 flex items-center justify-between">
          <p className="text-lg font-bold text-gray-900">
            ${product.price.toFixed(2)}
          </p>

          {product.rating !== undefined && (
            <p className="text-sm text-gray-500">
              ★ {product.rating}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}