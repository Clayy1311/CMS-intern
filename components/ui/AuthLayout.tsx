
"use client";
import Image from "next/image";
import { Nunito_Sans } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { Children } from "react";
import { useTheme } from 'next-themes'; 


const nunito_sans = Nunito_Sans({subsets:['latin']});


export default function AuthLayout({ children }) {
  
  const { theme } = useTheme(); 
  

  // const imageSrc = theme === 'dark' ? '/auth/bg-dark.png' : '/auth/bg-auth.png';
  // const widthImage = theme === 'dark' ? '220' : '403';
  // const heightImage = theme === 'dark' ? '370' : '411';

const imageSrc = theme === 'dark' ? '/auth/bg-dark.png' : '/auth/bg-auth.png';
const widthImage= theme === 'dark' ? 150 : 403; 
const heightImage= theme === 'dark' ? 150 : 411; 

  return (
    <main className={`${nunito_sans.className} flex min-h-screen`}>
      {/*konten form*/}
      <div className="flex w-full flex-col items-center justify-center bg-white md:w-1/2 dark:bg-[#292929] dark:text-white">
        <div className="flex max-w-sm dark:bg-black flex-col text-center">
          {children}
        </div>
      </div>
    
      {/* Kolom Kanan logo */}
   {/* <div className="hidden items-center justify-center bg-[#3A7AC3] dark:bg-gray-900 md:flex md:w-1/2"> */}
   <div className="hidden items-center justify-center bg-[#3A7AC3] dark:bg-[#292929] md:flex md:w-1/2">
        <Image
          src={imageSrc}
          alt="Deskripsi gambar yang relevan"
          width={widthImage}
          height={heightImage}
        />
      </div>
    </main>
  );
}