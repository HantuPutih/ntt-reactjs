"use client";

import Link from "next/link";

export default function Navbar() {

  return (
    <nav className="fixed left-0 top-0 z-30 w-full border-b-2 border-gray-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="text-xl font-bold tracking-tight text-gray-900"
        >
          Ntt React App
        </Link>
      </div>
    </nav>
  );
}