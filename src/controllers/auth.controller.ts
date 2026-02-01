import {loginUser, registerUser, verifyEmail,  accessToken, resetPass, logoutUser } from "../services/auth.services"
import { Prisma } from "@prisma/client";
import { requestNewPassword } from "../services/auth.services";
import { Request, Response } from "express";

export async function register(req:Request, res:Response){
  try {
    const { fullName, email, company, job, country, password } = req.body;
    if(!fullName){
      return res.status(400).json({ error: "fullName is required" });
    }
    if (!password) {
      return res.status(400).json({ error: "Password is required" });
    }

    const result = await registerUser({
      fullName,
      email,
      company,
      job,
      country,
      password
    });

    res.json({ message: "User Registered. Please check your email to verify.", data: result });

  } catch (error: any) {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
  if (error.code === "P2002") {
    const target = error.meta?.target as string[] | undefined;

    if (target?.includes("email")) {
      return res.status(400).json({ error: "Email already registered" });
    }
    if (target?.includes("phone")) {
      return res.status(400).json({ error: "Phone already registered" });
    }

    return res.status(400).json({ error: "Unique constraint failed" });
  }
}

    return res.status(500).json({ error: error.message });
  }
};

export async function emailVerify(req:Request, res:Response){
    try {
        
        const {token} =  req.query;
          if (!token || typeof token !== "string") {
      return res.status(400).json({ error: "Token is required" });
    }
        const user = await verifyEmail({token})
       


         res.json({message :"Email verified successfully!", data: user})
          if(!user) return res.status(400).json({ error : "invalid token"})
    } catch (err: unknown) {
   
    if (err instanceof Error) {
      return res.status(500).json({ error: err.message });
    }
    return res.status(500).json({ error: "Something went wrong" });
  }
};

export async function login(req:Request, res:Response){
    try {
        const {
        
            
            email,
            password,
        } = req.body;
      
        if (!password || !email) {
  return res.status(400).json({ error: "Password and Email is required" });
}

const {accessToken, refreshToken, user} = await loginUser({email, password})

        res.cookie("accessToken", accessToken, {
          httpOnly : true,
          secure : process.env.NODE_ENV === "production",
          path : "/",
          sameSite : "lax",
          maxAge : 15 * 60 * 1000, //15 minute

        })

        res.cookie("refreshToken", refreshToken, {
          httpOnly : true,
          secure : process.env.NODE_ENV === "production",
          path : "/",
          sameSite : "lax",
          maxAge : 7 * 24 * 60 * 60 * 1000, //7 days
        })

          return res.status(200).json({
      message: "Login successful",
     user
    });
    } catch (err: unknown) {
   
    if (err instanceof Error) {
      return res.status(500).json({ error: err.message });
    }
    return res.status(500).json({ error: "Something went wrong" });
  }
};


export async function refreshToken(req:Request, res:Response){
  try {
    const { refreshToken } = req.body; 

    if (!refreshToken) {
      return res.status(401).json({ error: "Refresh token required" });
    }

  const newAccessToken = await accessToken({refreshToken})
 
      return res.json({
       newAccessToken
      });
    
  } catch (err: unknown) {
   
    if (err instanceof Error) {
      return res.status(500).json({ error: err.message });
    }
    return res.status(500).json({ error: "Something went wrong" });
  }
};


export async function requestResetPassword(req:Request, res:Response){

  try {
    const {email} = req.body;

    const requestLink = await requestNewPassword({email})
    res.json({message : "Reset password link sent to your email", requestLink})

  } catch (err: unknown) {
   
    if (err instanceof Error) {
      return res.status(500).json({ error: err.message });
    }
    return res.status(500).json({ error: "Something went wrong" });
  }
};


export async function resetPassword(req:Request, res:Response){
  try {
    const { token } = req.query;
    const { newPassword } = req.body;

    if (!token || typeof token !== "string") {
      return res.status(400).json({ error: "Token is required" });
    }

    if(!token){
      return res.status(400).json({error : "Token Invalid"})
    }

    if (!newPassword) {
      return res.status(400).json({ error: "New password is required" });
    }

    await resetPass({ token, newPassword, });

    return res.json({ message: "Password reset successful!" });

  } catch (err: unknown) {
    if (err instanceof Error) {
      return res.status(500).json({ error: err.message });
    }
    return res.status(500).json({ error: "Something went wrong" });
  }
};

export async function logout(req:Request, res:Response){
 try {
  
  const userId = req.userId;
   
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }
  const user = await logoutUser({userId})
   res.clearCookie("accessToken", { path: "/" });
    res.clearCookie("refreshToken", { path: "/" });

res.json({ message : "Logout Successfully", user})
 }catch(err: unknown){
  if(err instanceof Error){
      return res.status(500).json({error : err.message})
  }
  return res.status(500).json({error : "Something Wrong"})
 }
};


