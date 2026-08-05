"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

type NavbarProps = {
  isLoggedIn: boolean;
};

export default function Navbar({ isLoggedIn }: NavbarProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  async function handleLogout() {
    try {
      setIsLoggingOut(true);

      const response = await fetch("/api/auth/logout", {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Logout failed");
      }

      setIsOpen(false);
      router.push("/login");
      router.refresh();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoggingOut(false);
    }
  }

  return (
    <nav className=" z-50 border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="text-xl font-bold tracking-tight text-gray-900"
        >
          Ntt React App
        </Link>

        {isLoggedIn && (
          <>

            <button
              type="button"
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="hidden rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-60 md:block"
            >
              {isLoggingOut ? "Logging out..." : "Logout"}
            </button>

            <button
              type="button"
              onClick={() => setIsOpen((previous) => !previous)}
              className="inline-flex items-center justify-center rounded-lg p-2 text-gray-700 transition hover:bg-gray-100 md:hidden"
              aria-label="Toggle navigation menu"
              aria-expanded={isOpen}
            >
              {isOpen ? (
                <svg
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </>
        )}
      </div>

      {isLoggedIn && isOpen && (
        <div className="border-t border-gray-200 px-4 py-4 md:hidden">
          <div className="flex flex-col gap-2">

            <button
              type="button"
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="mt-2 rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoggingOut ? "Logging out..." : "Logout"}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}