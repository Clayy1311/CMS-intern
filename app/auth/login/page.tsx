// "use client"; 
// import { Button } from "@/components/ui/button";
// import AuthLayout from "@/components/ui/AuthLayout";
// import { useState } from 'react';
// import Link from "next/link";
// import { Eye} from "lucide-react";
// import Image from "next/image";


// export default function LoginPage() {
//     const [showPassword, setShowPassword] = useState(false);
  
//     const togglePasswordVisibility = () => {
//         setShowPassword(!showPassword);
//     };

//     return (
//         <AuthLayout>
//             <div className="dark:border-2 p-12">

   
//             <h1 className="font-bold my-[0px] text-[50px]">Login</h1>
//             <p className="text-[15px] my-[20px] font-bold">Enter Your Email And Password to access your account</p>
//             <div className="flex flex-col">
//                 <label htmlFor="email" className="flex items-start font-bold text-18">Email</label>
//                 <input type="text" name="" id="" className="border-1 ps-2 my-[10px] border-grey-900 bg-[#EBF1FF] rounded-md h-[40px] w-full py-2" placeholder="Example"/>
//                 <label htmlFor="password" className="flex items-start font-bold py-[10px]">Password</label>
//                 <div className="relative"> {/* Use relative positioning for the container */}
//                     <input 
//                         type={showPassword ? "text" : "password"} 
//                         className="bg-[#EBF1FF] py-2 border-1 rounded-md ps-2 w-full pr-10" 
//                         placeholder="Example"
//                     />
//                     <button
//                         type="button"
//                         onClick={togglePasswordVisibility}
//                         className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
//                     >
//                         <Eye className="h-5 w-5 text-gray-400" /> {/* The eye icon */}
//                     </button>
//                 </div>
//                 <div className="flex justify-between flex-row py-[22px] w-full items-center">
//                 <div className="flex items-center gap-2">
//                     <input
//                     type="checkbox"
//                     id="remember-me"
//                     className="form-checkbox mt-1 h-4 w-4 rounded-full border-1 rounded-[20px]"
//                     />
//                     <label htmlFor="remember-me">Remember me</label>
//                 </div>
//                 <Link href="/auth/forgot-password"><p className="flex justify-end text-[#3A7AC3] text-[16px]">forgot Password?</p></Link>
             
//                 </div>  
//             </div>
//             <Button className="bg-[#3A7AC3] text-white py-2 my-[20px] text-[18px] border-1 rounded-[50px] w-full">Login</Button>
//             <Button className="bg-white text-black border-1 border-[#3A7AC3] rounded-[50px] w-full">
//                  <Image
//                  src="/auth/google.png"
//                  alt="Gambar google"
//                  width={24}
//                  height={24}
//                  className="mr-2"
//                  />
//                 <span>Continue With google</span>
//             </Button>
//             <p className="text-[16px] font-bold mt-[29px]">Haven't joined yet? 
//                 <Link href="/auth/sign-up">
//                     <span className="text-[16px] text-[#3A7AC3] underline">
//                         sign up now
//                     </span>
//                 </Link>
//             </p>
//             </div>
//         </AuthLayout>
//     );
// }
"use client";
import { Button } from "@/components/ui/button";
import AuthLayout from "@/components/ui/AuthLayout";
import { useState } from 'react';
import Link from "next/link";
import { Eye } from "lucide-react";
import Image from "next/image";
import ThemeSwitcher from "@/components/ui/TimeSwitcher"; // 1. Import ThemeSwitcher di sini

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <AuthLayout>
            {/* Menggunakan padding di sini, bukan di div baru */}
            <div className="w-full text-left">
                {/* 2. Judul dan Theme Switcher dibuat sejajar */}
                <div className="flex items-center justify-between">
                    <h1 className="text-4xl font-bold md:text-5xl">Login</h1>
                    <ThemeSwitcher />
                </div>

                <p className="my-5 text-base text-gray-600 dark:text-gray-400">
                    Enter your email and password to access your account
                </p>

                <div className="flex flex-col space-y-4">
                    <div>
                        <label htmlFor="email" className="block mb-2 font-bold">Email</label>
                        {/* 3. Menambahkan id dan style dark mode */}
                        <input
                            id="email"
                            type="email"
                            className="w-full h-12 px-4 rounded-md bg-[#EBF1FF] border border-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                            placeholder="example@gmail.com"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block mb-2 font-bold">Password</label>
                        <div className="relative">
                             {/* 3. Menambahkan id dan style dark mode */}
                            <input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                className="w-full h-12 px-4 pr-10 rounded-md bg-[#EBF1FF] border border-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                                placeholder="Input password"
                            />
                            <button
                                type="button"
                                onClick={togglePasswordVisibility}
                                className="absolute inset-y-0 right-0 flex items-center pr-3"
                            >
                                <Eye className="w-5 h-5 text-gray-400" />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-between w-full my-6">
                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            id="remember-me"
                            className="w-4 h-4 rounded"
                        />
                        <label htmlFor="remember-me" className="text-sm">Remember me</label>
                    </div>
                    <Link href="/auth/forgot-password" className="text-sm font-semibold text-[#3A7AC3] hover:underline">
                        Forgot Password?
                    </Link>
                </div>

                <div className="space-y-4">
                    <Button className="w-full h-12 text-lg bg-[#3A7AC3] text-white rounded-full hover:bg-[#326ab1]">
                        Login
                    </Button>
                    {/* 4. Menambahkan style dark mode untuk tombol Google */}
                    <Button variant="outline" className="w-full h-12 border-[#3A7AC3] rounded-full dark:bg-gray-800 dark:text-white dark:border-gray-600 hover:dark:bg-gray-700">
                        <Image
                            src="/auth/google.png"
                            alt="Google icon"
                            width={24}
                            height={24}
                            className="mr-2"
                        />
                        <span>Continue with Google</span>
                    </Button>
                </div>

                <p className="mt-8 text-center text-md">
                    Haven't joined yet?{" "}
                    <Link href="/auth/sign-up">
                        <span className="font-semibold text-[#3A7AC3] underline">
                            Sign Up
                        </span>
                    </Link>
                </p>
            </div>
        </AuthLayout>
    );
}