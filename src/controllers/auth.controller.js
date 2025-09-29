import {loginUser, registerUser, verifyEmail,  AccessToken, resetPass, logoutUser } from "../services/auth.services.js"
import { Prisma } from "@prisma/client";
import { requestNewPassword } from "../services/auth.services.js";


export const register = async (req, res) => {
  
    try {
       const {
            full_name, 
            email,
            company,
            job,
            country,
            password
        } = req.body;
if (!password) {
  return res.status(400).json({ error: "Password is required" });
}
    const result = await registerUser({full_name, 
            email,
            company,
            job,
            country,
            password})

    res.json({ message: "User Registered. Please check your email to verify.", data : result });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
  if (error.code === "P2002") {
    const target = error.meta?.target;

    if (target?.includes("email")) {
      return res.status(400).json({ error: "Email already registered" });
    }

    if (target?.includes("phone")) {
      return res.status(400).json({ error: "Phone already registered" });
    }

    return res.status(400).json({ error: "Unique constraint failed" });
  }
}
    res.status(500).json({ error: error.message });
  }
};

export const verifyemail = async (req, res) => {
    try {
        
        const {token} =  req.query;

        const user = await verifyEmail({token})
       


         res.json({message :"Email verified successfully!", data: user})
          if(!user) return res.status(400).json({ error : "invalid token"})
    } catch (error) {
      return res.status(500).json({error: error.message})
        
    }
}

export const login = async (req, res) =>{
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
    } catch (error) {
        res.status(500).json({error : error.message})
    }
};

export const refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.body; 

    if (!refreshToken) {
      return res.status(401).json({ error: "Refresh token required" });
    }

  const newAccessToken = await AccessToken({refreshToken})
 
      return res.json({
       newAccessToken
      });
    
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const requestResetPassword = async (req, res) => {

  try {
    const {email} = req.body;

    const requestLink = await requestNewPassword({email})
    res.json({message : "Reset password link sent to your email", requestLink})

  } catch (error) {
    return res.status(500).json({error : error.message})
  }
}

export const resetpassword = async (req, res) => {

  try {
    
    const {token} = req.query;
    const {newPassword} = req.body;

    const newPass = await resetPass({token, newPassword})
    
    res.json({ message : "Password reset successful!", newPass})
  }
  catch(error){
         return res.status(500).json({ error: error.message})
  }
}


export const logout = async (req, res) => {
 try {
  
  const userid = req.userId;

  const user = await logoutUser({userid})

res.json({ message : "Logout Successfully"}, user)
 } catch (error) {
    return res.status(500).json({error : error.message})
 }
};


