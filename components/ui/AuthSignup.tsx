import Image from "next/image";
import { Children } from "react";
import { Nunito_Sans } from "next/font/google";
const nunito_sans = Nunito_Sans({subsets:['latin']});

export default function AuthSignup({ children }) {
    return (
        <main className={`${nunito_sans.className} flex min-h-screen`}>

            <div className="hidden items-center justify-center bg-[#3A7AC3] md:flex md:w-1/2">

                <Image
                    src="/auth/bg-auth.png"
                    alt="gambar backgorund"
                    width={403}
                    height={411}
                />
            </div>
            <div className="w-full flex flex-col justify-center items-center md:w-1/2 bg-white">
                <div className="flex items-center justify-center max-w-sm w-full flex-col">
                    {children}
                </div>
            </div>
        </main>
    )
}