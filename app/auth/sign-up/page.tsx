"use client";
import AuthSignup from "@/components/ui/AuthSignup";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function signup() {

    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }
    return (
        <AuthSignup>

            {/* Perbaikan di sini */}
            <div className="w-full md:w-[300px] lg:w-[500px]  flex flex-col gap-2"> {/* Tambahkan `w-full` dan `flex flex-col` di container */}
                <h1 className="text-3xl w-full font-bold text-lefttext-gray-900 w-full font-bold text-[45px]">Sign Up</h1>

                <label htmlFor="Your Name" className="font-medium">Your Name</label>
                <input
                    type="text"
                    id="email"
                    placeholder="Full Name"
                    className="w-full px-4 py-2 border border-gray-300 bg-[#EBF1FF] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <label htmlFor="Your Name" className="font-medium">E-Mail</label>
                <input
                    type="text"
                    id="email"
                    placeholder="example@gmail.com"
                    className="w-full px-4 py-2 border border-gray-300 bg-[#EBF1FF] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <label htmlFor="" className="font-medium">Company</label>
                <input
                    type="text"
                    id="email"
                    placeholder="Company"
                    className="w-full px-4 py-2 border border-gray-300 bg-[#EBF1FF] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <label htmlFor="Your Name" className="font-medium">Job</label>
                <input
                    type="text"
                    id="email"
                    placeholder="Job Title/Role"
                    className="w-full px-4 py-2 border border-gray-300 bg-[#EBF1FF] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <label htmlFor="Your Name" className="font-medium">Country</label>
                <input
                    type="text"
                    id="email"
                    placeholder="Country"
                    className="w-full px-4 py-2 border border-gray-300 bg-[#EBF1FF] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <label htmlFor="Your Name" className="font-medium">Password</label>
                <div className="relative"> {/* Use relative on the container */}
                    <input
                        type={showPassword ? "text" : "password"}
                        id="email"
                        placeholder="password"
                        className="w-full px-4 py-2 border border-gray-300 bg-[#EBF1FF] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10" // Add padding to the right (pr-10) to make space for the icon
                    />
                    <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center" // Use absolute positioning for the button
                    >
                        <Eye className="h-5 w-5 text-gray-400" /> {/* The eye icon */}
                    </button>
                </div>


                <div>
                    <input type="checkbox" name="" id="" />
                    <label htmlFor="agree" className="text-[15px] px-2">I  agree to CMS <span className="text-[#3A7AC3]">Terms of service </span>and <span className="text-[#3A7AC3]">Privacy policy</span></label>
                </div>

                <Button className="bg-[#3A7AC3] w-full text-white my-[6px] text-[24px] border-1 rounded-[50px]">Login</Button>
                <p className="text-[15px] w-full text-center items-center">Already have an account? <Link href="/auth/login"><span className="text-[#3A7AC3]">Sign in</span></Link></p>
                <div className="flex items-center w-full ">
                    <hr className="flex-grow border-t border-gray-600" />
                    <p className="px-4 text-black-500">OR</p>
                    <hr className="flex-grow border-t border-gray-600" />
                </div>



                <Button className="bg-white my-[10px] w-full border-1 border-[#3A7AC3] text-black rounded-[50px]">
                    <Image
                        src="/auth/google.png"
                        alt="Gambar google"
                        width={24}
                        height={24}
                    />
                    <span className="">Continue With google</span>
                </Button>
            </div>
        </AuthSignup>
    );
}