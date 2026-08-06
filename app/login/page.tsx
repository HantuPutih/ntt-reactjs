"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [creds, setCreds] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function onLogin() {
    try {
      setError("");
      setIsLoading(true);

      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: creds.email,
          password: creds.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message ?? "Login failed");
      }

      router.push("/");
      router.refresh();
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Unable to log in",
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100 px-4 py-10">
      <div className="w-full max-w-md">
        <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-xl">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gray-900 text-lg font-bold text-white">
              N
            </div>

            <h1 className="text-2xl font-bold tracking-tight text-gray-900">
              Login to the Mini Project
            </h1>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              Enter your DummyJSON account credentials to continue.
            </p>

            <a
              href="https://dummyjson.com/users"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-block text-sm font-medium text-blue-600 transition hover:text-blue-700 hover:underline"
            >
              View available DummyJSON users
            </a>
          </div>

          <div className="space-y-5">
            {error && (
              <div
                role="alert"
                className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
              >
                {error}
              </div>
            )}

            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                email
              </label>

              <input
                id="email"
                type="text"
                value={creds.email}
                onChange={(event) =>
                  setCreds((previous) => ({
                    ...previous,
                    email: event.target.value,
                  }))
                }
                placeholder="Enter your email"
                autoComplete="email"
                required
                disabled={isLoading}
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-900 focus:ring-2 focus:ring-gray-200 disabled:cursor-not-allowed disabled:bg-gray-100"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Password
              </label>

              <input
                id="password"
                type="password"
                value={creds.password}
                onChange={(event) =>
                  setCreds((previous) => ({
                    ...previous,
                    password: event.target.value,
                  }))
                }
                onKeyDown={(event) => {
                  if (event.key === "Enter" && !isLoading) {
                    void onLogin();
                  }
                }}
                placeholder="Enter your password"
                autoComplete="current-password"
                required
                disabled={isLoading}
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-900 focus:ring-2 focus:ring-gray-200 disabled:cursor-not-allowed disabled:bg-gray-100"
              />
            </div>

            <button
              type="button"
              onClick={onLogin}
              disabled={
                isLoading ||
                !creds.email.trim() ||
                !creds.password.trim()
              }
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-gray-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoading && (
                <span
                  className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white"
                  aria-hidden="true"
                />
              )}

              {isLoading ? "Logging in..." : "Login"}
            </button>
          </div>

          <div className="mt-6 rounded-lg bg-gray-50 p-4">
            <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
              Default credentials
            </p>

            <div className="mt-2 space-y-1 text-sm text-gray-700">
              <p>
                Email:{" "}
                <span className="font-mono font-medium">emilys</span>
              </p>

              <p>
                Password:{" "}
                <span className="font-mono font-medium">
                  emilyspass
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}