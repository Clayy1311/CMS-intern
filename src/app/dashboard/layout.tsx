import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <div className="flex flex-col flex-1">
        <Header />

        <main className="p-6 flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}
