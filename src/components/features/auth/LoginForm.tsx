// src/components/features/LoginForm.tsx
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { loginWithGoogle } from "@/service/auth.service";
import { login } from "@/service/auth.service";
import { GoogleLogin } from "@react-oauth/google";
import type { CredentialResponse } from "@react-oauth/google";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff } from "lucide-react";
import { Switch } from "../../ui/switch";
export default function LoginForm() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
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
    const handleGoogle = async (response: any) => {
        setLoading(true);
        try {
            const res = await loginWithGoogle(response.credential)
            document.cookie = `accessToken=${res.token}; path=/`;
            router.push("/dashboard")
        } catch (err: any) {
            setError(err.message || "Google Login failed")
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
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


            <Button
                type="submit"
                className="w-full h-12 bg-[#3A7AC3] hover:bg-blue-700 font-bold"
                disabled={loading}
            >
                {loading ? "Memproses..." : "Login"}
            </Button>
            <GoogleLogin
                onSuccess={handleGoogle}
            />

            <p className="text-center text-sm text-gray-500 mt-4">
                Haven't joined yet?{" "}
                <a href="#" className="text-blue-600 font-medium hover:underline">
                    SignUp today
                </a>
            </p>
        </form>
    );
}