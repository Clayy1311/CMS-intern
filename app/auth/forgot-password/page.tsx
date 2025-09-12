import AuthLayout from "@/components/ui/AuthLayout";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function ForgotPassword() {
    return (
        <AuthLayout>
            <div className="text-center flex flex-col font-bold">
                <h1 className="font-bold text-[40px]">Forgot Password</h1>
                <p className="text-[13px] my-3">No Worries! Enter your email address below, and we’ll
                    send you a link to reset your password.</p>
                <div className="flex flex-col w-full my-3">
                    <label htmlFor="email" className="w-full flex justify-start my-2">E-mail</label>
                    <input type="email" name="email" id="" placeholder="Enter Your Email Address

        " className="border-1 bg-[#EBF1FF] ps-2 py-2 font-light" />

                </div>


<Link href="success-reset">
                <button className="bg-[#3A7AC3] w-full text-white rounded-[2px] py-2">Reset Password</button>
                </Link>
                <div className="justify-center flex items-center my-5">
                    <button className="flex items-center justify-center font-light">
                     
                        <ArrowLeft className="h-5 w-5 text-gray-900"></ArrowLeft>
                        <Link href="/auth/login">
                        <span className="font-light text-gray">back to login</span>
                        </Link>
                    </button>
                </div>


            </div>
        </AuthLayout>
    );

}