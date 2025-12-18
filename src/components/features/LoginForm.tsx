// src/components/features/LoginForm.tsx
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/service/auth.service";

// 💡 Impor komponen shadcn/ui dan Lucide
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff } from "lucide-react";
import { Switch } from "../ui/switch";
export default function LoginForm() {
    const router = useRouter();

    // State untuk Input (Sangat Sederhana)
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // State untuk Status
    const [loading, setLoading] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);

    // Handler Submit Sederhana
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); // Mencegah refresh halaman
        setLoading(true);
        setSubmitError(null);

        try {
            await login(email, password);
            router.push("/dashboard");
        } catch (err: any) {
            setSubmitError(err.message || "Gagal masuk.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* ... (Header dan Pesan Error) ... */}
            <div className="relative flex items-center">
                <h1 className="absolute left-1/2 -translate-x-1/2 text-4xl font-bold text-gray-900">
                    Login
                </h1>

                <div className="ml-auto">
                    <Switch className="scale-150" />
                </div>
            </div>



            <p className="text-md  text-center">Enter your email and password to access your account</p>

            {submitError && (
                <p className="text-sm font-medium text-red-500 bg-red-50 p-3 rounded-lg border border-red-200">
                    {submitError}
                </p>
            )}

            {/* FIELD EMAIL */}
            <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                    id="email"
                    type="email"
                    placeholder="Example@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-12 bg-blue-50 border-gray-200"
                />
            </div>

            {/* FIELD PASSWORD (Dengan Toggle Mata) */}
            <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                    <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Input password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="h-12 bg-blue-50 border-gray-200 pr-10"
                    />

                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 p-1"
                        aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
                    >
                        {showPassword ? (
                            <EyeOff className="h-5 w-5" />
                        ) : (
                            <Eye className="h-5 w-5" />
                        )}
                    </button>
                </div>
            </div>

            {/* REMEMBER ME & FORGOT PASSWORD */}
            <div className="flex justify-between items-center text-sm">
                <div className="flex items-center space-x-2">
                    <Checkbox id="remember" />
                    <Label htmlFor="remember" className="font-normal text-gray-600">
                        Remember Me
                    </Label>
                </div>
                <a href="#" className="text-blue-600 hover:underline text-sm">
                    Forgot Password?
                </a>
            </div>

            {/* SUBMIT BUTTON */}
            <Button
                type="submit"
                className="w-full h-12 bg-[#3A7AC3] hover:bg-blue-700 font-bold"
                disabled={loading} // HANYA nonaktifkan saat loading
            >
                {loading ? "Memproses..." : "Login"}
            </Button>

            {/* CONTINUE WITH GOOGLE (Placeholder) */}
            <Button
                variant="outline"
                className="w-full h-12 flex items-center justify-center space-x-2 border-gray-300 text-gray-700"
            >
                {/* Placeholder Google Icon */}
                <svg className="w-5 h-5" viewBox="0 0 48 48">...</svg>
                <span>Continue with Google</span>
            </Button>

            {/* SIGN UP */}
            <p className="text-center text-sm text-gray-500 mt-4">
                Haven't joined yet?{" "}
                <a href="#" className="text-blue-600 font-medium hover:underline">
                    SignUp today
                </a>
            </p>
        </form>
    );
}