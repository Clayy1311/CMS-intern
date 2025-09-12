import { Shapes } from "lucide-react";
import Image from "next/image";
import { Nunito_Sans } from "next/font/google";
const nunito_sans = Nunito_Sans({subsets:['latin']});


export default function AuthLayout({ children }) {
  return (
    <main className={`${nunito_sans.className} flex min-h-screen`}>
      {/* Kolom Kiri (Konten Dinamis) */}
      <div className="flex w-full flex-col items-center justify-center bg-white md:w-1/2">
        <div className="flex w-full max-w-sm flex-col text-center">
          {children}
        </div>
      </div>
      {/* Kolom Kanan (Branding) */}
      <div className="hidden items-center justify-center bg-[#3A7AC3] md:flex md:w-1/2">
      <Image
        src="/auth/bg-auth.png" // Gunakan variabel yang diimpor
        alt="Deskripsi gambar yang relevan"
        width={403}
        height={411}
      />
      </div>
    </main>
  );
}