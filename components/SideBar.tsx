"use client";

import Link from "next/link";
import {usePathname, useRouter} from "next/navigation";
import { useState } from "react";
import {UserSessionInterFace} from "@/types/user";
import Image from "next/image";
import {useAppSelector} from "@/lib/hooks";


const menuItems = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Product",
    href: "/product",
  },
];

export default function Sidebar() {
  const user = useAppSelector(
    (state) => state.auth.user,
  );
  const pathname = usePathname();
  const router = useRouter();
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
      router.push("/login");
      router.refresh();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoggingOut(false);
    }
  }

  if (!user?.id) {
    return
  }
  return (
    <div className="z-5">
      <aside
        className={`fixed left-0 top-15 z-50 flex h-[calc(100vh-3.75rem)] w-64 flex-col border-r border-gray-200 bg-white"
        }`}
      >
        <nav className="flex-1 space-y-1 overflow-y-auto p-4">
          {menuItems.map((item) => {
            const isActive =
              pathname === item.href ||
              pathname.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.href}
                href={item.href}
                // onClick={() => setIsOpen(false)}
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
              {/*{initials}*/}
              <Image src={user.image || '/'} alt="profile picture" width={40} height={40} />
            </div>

            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-gray-900">
                {user?.firstName} {user?.lastName}
              </p>
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