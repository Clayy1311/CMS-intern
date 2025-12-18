// src/components/layout/Sidebar.tsx
// Client Component (jika ada interactivity) atau Server Component (jika statis)
"use client";
import Link from "next/link";
export default function Sidebar() {
    return (
      <aside className="w-64 bg-white border-r shadow-lg p-4">
        <div className="text-xl font-bold mb-8 text-blue-700">CMSLABS</div>
        
        {/* Tombol Dashboard Aktif */}
        <div className="space-y-4">
          <div className="bg-blue-600 text-white p-2 rounded-lg font-medium cursor-pointer">
            Dashboard
          </div>
          {/* Tombol Lain */}
          <div className="text-gray-600 p-2 rounded-lg hover:bg-gray-100 cursor-pointer">
           <Link href={`/dashboard/organizational`}> Organizational </Link>
          </div>
          <div className="text-gray-600 p-2 rounded-lg hover:bg-gray-100 cursor-pointer">
            Personal Project
          </div>
          {/* ... Lanjutkan item menu lainnya ... */}
        </div>
      </aside>
    );
  }