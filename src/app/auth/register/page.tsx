import RegisterPage from "@/components/features/auth/RegisterForm";
import Image from "next/image";

export default function AuthPage() {
    return (
        //kanan
        <div className="flex min-h-screen">
            <div className="hidden lg:flex lg:w-1/2 bg-[#3A7AC3] min-h-screen items-center justify-center">
                <Image
                    src="/auth/bg-auth.png"
                    alt="Authentikasi Background"
                    width={400}
                    height={900}
                    className="object-contain" // Menjaga rasio gambar tetap bagus
                />
            </div>
            {/* kiri */}

            <div className="w-full lg:w-1/2 flex justify-center items-center">
                <RegisterPage />
            </div>
        </div>

        // kiri
    )
}