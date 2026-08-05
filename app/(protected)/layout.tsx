import Navbar from "@/components/Navbar";
import Sidebar from "@/components/SideBar";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function ProtectedLayout({
                                                children,
                                              }: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Sidebar session={session} />

      <main className="min-h-[calc(100vh-3.75rem)] pt-15 md:ml-64">
        {children}
      </main>
    </div>
  );
}