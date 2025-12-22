import { RegisterPayload } from "@/types/auth.type";
import { User } from "@/types/auth.type";

export async function login(email: string, password: string) {
    const res = await fetch("http://localhost:3001/api/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include", // WAJIB
        body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Login failed");
    }

    return res.json();
}

export async function Register(payload: RegisterPayload) {
    const res = await fetch("http://localhost:3001/api/auth/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            fullName: payload.fullName,
            email: payload.email,
            company: payload.company,
            job: payload.job,
            country: payload.country,
            password: payload.password
        }),
    });
    if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Login failed");
    }
    return res.json();
}

export async function loginWithGoogle(token: string) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/google`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ token: token }), 
    })
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || "Google login failed");
    }
    return res.json();
  }
  