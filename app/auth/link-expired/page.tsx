import AuthLayout from "@/components/ui/AuthLayout";
import { Button } from "@/components/ui/button";
import Link from "next/link";


export default function LinkExpired() {
    return (
        <AuthLayout>
            <div>
                <h1 className="font-bold text-[40px]">Link Expired</h1>
                <p className="text-[12px]">The password reset link has  expired.
                Please request a new to reset your password.</p>
                <Link href="/auth/login">
                <Button className="bg-[#3A7AC3] font-bold text-white w-full my-4 py-6">

Back to Login
             </Button>
                </Link>
           
            </div>
        </AuthLayout>
    )
}