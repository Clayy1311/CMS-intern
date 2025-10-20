import {loginUser, registerUser, verifyEmail,  AccessToken, resetPass, logoutUser } from "../services/auth.services"
import { Prisma } from "@prisma/client";
import { requestNewPassword } from "../services/auth.services";
import { Request, Response } from "express";

export const register = async (req: Request, res: Response) => {
  try {
    const { full_name: fullName, email, company, job, country, password } = req.body;

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

export const verifyemail = async (req:Request, res:Response) => {
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

export const login = async (req:Request, res:Response) =>{
    try {
        const {
        
            
            email,
            password,
        } = req.body;
        
        if (!password || !email) {
  return res.status(400).json({ error: "Password and Email is required" });
}
  
const {token, refreshToken} = await loginUser({email, password})

        res.json({ message : "Login Successful", token, refreshToken});
    } catch (err: unknown) {
   
    if (err instanceof Error) {
      return res.status(500).json({ error: err.message });
    }
    return res.status(500).json({ error: "Something went wrong" });
  }
};


export const refreshToken = async (req:Request, res:Response) => {
  try {
    const { refreshToken } = req.body; 

    if (!refreshToken) {
      return res.status(401).json({ error: "Refresh token required" });
    }

  const newAccessToken = await AccessToken({refreshToken})
 
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


export const requestResetPassword = async (req:Request, res:Response) => {

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


export const resetpassword = async (req: Request, res: Response) => {
  try {
    const { token } = req.query;
    const { newPassword } = req.body;

    if (!token || typeof token !== "string") {
      return res.status(400).json({ error: "Token is required" });
    }

    if (!newPassword) {
      return res.status(400).json({ error: "New password is required" });
    }

    await resetPass({ token, newPassword });

    return res.json({ message: "Password reset successful!" });

  } catch (err: unknown) {
    if (err instanceof Error) {
      return res.status(500).json({ error: err.message });
    }
    return res.status(500).json({ error: "Something went wrong" });
  }
};

export const logout = async (req:Request, res:Response) => {
 try {
  
  const userId = req.userId;
   
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }
  const user = await logoutUser({userId})

res.json({ message : "Logout Successfully", user})
 }catch(err: unknown){
  if(err instanceof Error){
      return res.status(500).json({error : err.message})
  }
  return res.status(500).json({error : "Something Wrong"})
 }
};


