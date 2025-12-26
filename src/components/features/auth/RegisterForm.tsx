"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";


//komponen
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff } from "lucide-react";
import { Switch } from "../../ui/switch";
import { Register } from "@/service/auth.service";

export default function RegisterPage() {
    //state
    const [fullName, setFullName] = useState("");
    const [company, setCompany] = useState("");
    const [email, setEmail] = useState("");
    const [job, setJob] = useState("");
    const [country, setCountry] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setSubmitError(null);
 
        try{
            await Register({ fullName, company, email, job, country, password });
            router.push("/dashboard");
        } catch(err: any){
            setSubmitError(err.message || "Gagal Register");
        } finally{
            setLoading(false);
        }


    }

    return (

        <form onSubmit={handleSubmit}>
            <div className="relative flex items-center pr-20">
                <h1 className=" left-1/2 -translate-x-1/2 text-4xl font-bold text-gray-900">
                    Sign-Up
                </h1>

                <div className="ml-auto">
                    <Switch className="scale-150" />
                </div>
            </div>
            <div className="px-10 space-y-2 w-full mt-10">


                <div className="space-y-2">
                    <Label htmlFor="text">Fullname</Label>
                    <Input
                        id="fullName"
                        type="text"
                        placeholder="Jhon doe"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                        className=""
                    />
                </div>
                {/* //password */}
                <div className="space-y-2">
                    <Label htmlFor="email">
                        email
                    </Label>
                    <Input
                        type="email"
                        id="email"
                        placeholder="Example@gmail.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className=""
                    />
                </div>
                {/* company */}
                <div className="space-y-2">
                    <Label htmlFor="company">
                        company
                    </Label>
                    <Input
                        type="text"
                        id="company"
                        placeholder="your company"
                        value={company}
                        onChange={(a) => setCompany(a.target.value)}
                        required
                        className=""
                    />
                </div>
                {/* //job */}
                <div className="space-y-2">
                    <Label htmlFor="job">
                        job
                    </Label>
                    <Input
                        type="text"
                        id="job"
                        placeholder="your Job"
                        value={job}
                        onChange={(a) => setJob(a.target.value)}
                        required
                        className=""
                    />
                </div>
                {/* //country */}
                <div className="space-y-2">
                    <Label htmlFor="country">
                        country
                    </Label>
                    <Input
                        type="text"
                        id="country"
                        placeholder="your country"
                        value={country}
                        onChange={(a) => setCountry(a.target.value)}
                        required
                        className=""
                    />
                </div>
                {/* //password */}
                <div className="space-y-2">
                    <Label htmlFor="password">
                        your password
                    </Label>
                    <Input
                        type="password"
                        id="password"
                        placeholder="your password"
                        value={password}
                        onChange={(a) => setPassword(a.target.value)}
                        required
                        className=""
                    />
                </div>

                {/* chcekradio */}
                <div className="p-4">
                    <Label htmlFor="agree" className="flex items-center cursor-pointer">
                        <Checkbox id="agree" />
                        <p className="text-sm text-gray-700">
                            I agree to CMS <span className="underline">Terms of service</span> and <span className="underline">Privacy policy</span>
                        </p>
                    </Label>
                </div>
                <Button className="w-full bg-[#3A7AC3] py-2" type="submit">
                    Register
                </Button>
            </div>
        </form>
    )
}