
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/SideBar";
import AuthInitializer from "@/components/AuthInitializer";
import { UserSessionInterFace } from "@/types/user";

async function getSession(): Promise<UserSessionInterFace | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  if (!token) {
    return null;
  }

  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    if (!apiUrl) {
      console.error("NEXT_PUBLIC_API_URL is not configured");
      return null;
    }

    const response = await fetch(`${apiUrl}auth/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();

    return {
      id: data.id,
      firstName: data.firstName,
      lastName: data.lastName,
      image: data.image,
    };
  } catch (error) {
    console.error("Session error:", error);
    return null;
  }
}

export default async function ProtectedLayout({
                                                children,
                                              }: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  return (
    <>
      <AuthInitializer session={session} />
      <Navbar />
      <Sidebar />
      <main className="min-h-screen pt-15 md:ml-64">
        {children}
      </main>
    </>
  );
}