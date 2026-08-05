"use client";

import Link from "next/link";
import {usePathname, useRouter} from "next/navigation";
import { useState } from "react";

type SidebarProps = {
  firstName: string;
  lastName: string;
};

const menuItems = [
  {
    name: "Home",
    href: "/dashboard",
  },
  {
    name: "Product",
    href: "/dashboard/product",
  },
];

export default function Sidebar({firstName, lastName,}: SidebarProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
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
    <div className="z-5">
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="fixed left-4 top-4 z-40 rounded-lg border border-gray-200 bg-white p-2 text-gray-700 shadow-sm md:hidden"
        aria-label="Open sidebar"
      >
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
      </button>

      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen w-64 flex-col border-r border-gray-200 bg-white transition-transform duration-300"
        }`}
      >
        <div className="flex h-16 items-center justify-between px-5">

          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 md:hidden"
            aria-label="Close sidebar"
          >
            <svg
              className="h-5 w-5"
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
          </button>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto p-4">
          {menuItems.map((item) => {
            const isActive =
              pathname === item.href ||
              pathname.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`block rounded-lg px-4 py-3 text-sm font-medium transition ${
                  isActive
                    ? "bg-gray-900 text-white"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-gray-200 p-4">
          <div className="flex items-center gap-3 rounded-xl bg-gray-50 p-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-900 text-sm font-semibold text-white">
              {initials}
            </div>

            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-gray-900">
                {firstName} {lastName}
              </p>

              <p className="text-xs text-gray-500">Logged in</p>
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
        </div>
      </aside>
    </div>
  );
}