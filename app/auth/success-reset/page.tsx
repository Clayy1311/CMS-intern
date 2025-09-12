import AuthLayout from "@/components/ui/AuthLayout";
import { ArrowLeft,Lock } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function successReset() {
    return (
<AuthLayout>
     <div className="text-center flex flex-col font-bold">
     <div className="flex justify-center items-center bg-white my-5"> {/* Optional: untuk centering di halaman */}
      <div className="relative flex items-center justify-center w-32 h-32 rounded-full bg-[#4285F4] shadow-md">
        <Lock className="h-16 w-16 text-white" />
      </div>
    </div>
        
        <h1 className="font-bold text-[34px]">Your password has been 
        succesfully reset</h1>
        <p className="text-[13px] my-3">No Worries! Enter your email address below, and we’ll
        send you a link to reset your password.</p>
        <Link href="/auth/login">
<button className="bg-[#3A7AC3] w-full text-white rounded-[2px] py-2">Login Now</button>
</Link>
<div className="justify-center flex items-center my-5">
<button className="flex items-center justify-center font-light">
    <ArrowLeft className="h-5 w-5 text-gray-900"></ArrowLeft>
    
    <Link href='/auth/login'><span className="font-light text-gray">Back to login</span></Link>
    
    
</button>
</div>

       
     </div>
    </AuthLayout>
    );
    
}