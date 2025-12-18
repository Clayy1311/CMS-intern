// src/app/(auth)/login/page.tsx
import LoginForm from "@/components/features/LoginForm";
import Image from "next/image"; // Untuk mengoptimalkan gambar

// Kita asumsikan ini adalah Route Group (auth)
// Jadi layout.tsx di level (auth) mungkin mengatur tata letak global

export default function LoginPage() {
  return (
    <div className="flex min-h-screen">
      <div className="w-full lg:w-3/5 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          <div className="flex justify-end mb-8">
            <div className="flex space-x-2 text-gray-600">
             
            </div>
          </div>
          <LoginForm />
        </div>
      </div>
      
      <div className="hidden lg:flex lg:w-3/5 items-center justify-center bg-[#3A7AC3]">
        <div className="hidden lg:flex lg:w-1/2 bg-[#3A7AC3] min-h-screen items-center justify-center">
          <Image
              src="/auth/bg-auth.png"
              alt="Authentikasi Background"
              width={400}
              height={900}
              className="object-contain" // Menjaga rasio gambar tetap bagus
          />
      </div>
      </div>
      
    </div>
  );
}