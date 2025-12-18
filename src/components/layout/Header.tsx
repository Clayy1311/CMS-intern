// src/components/layout/Header.tsx
// Client Component (karena ada Night Mode toggle, dll)
"use client";

import { Sun, Moon, Search } from 'lucide-react'; // Asumsi Lucide diinstal

export default function Header() {
  // Tanpa logic fetch user yang rumit dulu

  return (
    <header className="flex justify-between items-center p-4 bg-white border-b shadow-sm h-16">
      
      {/* Kiri: Breadcrumb / Filter Data (Placeholder) */}
      <div className="flex items-center space-x-4">
        <h1 className="text-xl font-semibold">Dashboard / Dashboard</h1>
      </div>
      
      {/* Kanan: Utilities & User */}
      <div className="flex items-center space-x-6">
        
        {/* Night Mode & Quick Access (UI Sederhana) */}
        <div className="flex space-x-3 text-gray-500">
            <Moon className="h-5 w-5 cursor-pointer hover:text-gray-800" />
            <Search className="h-5 w-5 cursor-pointer hover:text-gray-800" />
        </div>
        
        {/* User Info */}
        <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-700">Welcome back</span>
            {/* 💡 Nama User Sederhana (Placeholder) */}
            <span className="font-semibold text-gray-900">Jarwo Saputra</span>
            
            {/* Avatar */}
            <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden border-2 border-gray-300">
                {/* <img src="/avatar.jpg" alt="User Avatar" /> */}
            </div> 
        </div>
      </div>
    </header>
  );
}