"use client";

import Spinner from "@/components/spinner";
import { useAppSelector } from "@/lib/hooks";

export default function Home() {
  const user = useAppSelector((state) => state.auth.user);

  if (!user?.id) {
    return (
      <div className="flex min-h-[calc(100vh-3.75rem)] w-full items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-4">
          <Spinner />

          <p className="text-sm font-medium text-gray-500">
            Loading your account...
          </p>
        </div>
      </div>
    );
  }

  return (
    <section className="min-h-[calc(100vh-3.75rem)] bg-gray-50 p-6">
      <div className="mx-auto max-w-6xl">
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="bg-gray-900 px-6 py-10 text-white sm:px-10">

            <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              Welcome back, {user.firstName}!
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-300 sm:text-base">
              Manage your products, review product details, and perform
              add, edit, or delete operations from one place.
            </p>
          </div>

          <div className="grid gap-6 p-6 sm:p-10 lg:grid-cols-3">
            <div className="rounded-xl border border-gray-200 bg-gray-50 p-5">
              <p className="text-sm font-medium text-gray-500">
                Logged in as
              </p>

              <p className="mt-2 text-lg font-semibold text-gray-900">
                {user.firstName} {user.lastName}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}