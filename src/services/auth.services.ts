import prisma from "../db/index";
import nodemailer from "nodemailer";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { RegisterUserInput, LoginUserInput, VerifyEmail, ResetPassword  } from "../types/auth.types.js";
export const registerUser = async(data: RegisterUserInput) => {
       const { fullName, email, company, job, country, password } = data;
      const hashedPassword = password ? await bcrypt.hash(password, 10) : null;
      
      const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    throw new Error("JWT_SECRET is not defined in environment variables");
  }
        const token = jwt.sign({email}, jwtSecret,{expiresIn : "1d"});
        const user = await prisma.users.create({
            data:
            {
           fullName,
            email,
            company,
          job,
          country,
            password : hashedPassword,
            isVerified : false,
              verifyToken : token
            },
        });

        if(!password) throw new Error("Password Required")
        const verifylink = `http://localhost:3002/api/auth/verifyemail?token=${token}`

  const transporter = nodemailer.createTransport({
        service : "gmail",
        auth : {
            user : process.env.EMAIL_USER,
            pass : process.env.USER_PASS
        }
    })

        await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Verify your email",
      html: `
        <h3>Welcome, ${fullName}!</h3>
        <p>Please verify your email by clicking below:</p>
        <a href="${verifylink}">${verifylink}</a>
      `,
    });

    return {id : user.id, email: user.email, fullName: user.fullName}
}


export const verifyEmail = async({token} : {token : string}) => {
  
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as VerifyEmail;
 const user = await prisma.users.findFirst({
      where: {
        email: decoded.email,
        verifyToken: token,
      },
    })
     if (!user) {
      throw new Error("Invalid token or user not found");
    }
     await prisma.users.update({
            where: {id : user.id},
            data : 
            { isVerified : true, verifyToken: null}
        });
   return {id: user.id, email: user.email, full_name: user.fullName}
}


export const loginUser = async(data: LoginUserInput)=>{
    const {email, password} = data
    const user = await prisma.users.findUnique({ where: { email } });
    if (!user) throw new Error ("User Not Found");

    if (!user.isVerified) {
        throw new Error("Please verify your email")    
    }

    if (!user.password) throw new Error("Password not set. Please login with Google");


const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) throw new Error("Password is invalid")
    const jwtSecret = process.env.JWT_SECRET

    if(!jwtSecret) throw new Error("JWT_SECRET is not defined in environment variables")
    const token = jwt.sign({ id: user.id }, jwtSecret, {
      expiresIn: "15m",
    });

    
    const refreshToken = jwt.sign(
      { id: user.id },
     jwtSecret,
      { expiresIn: "7d" }
    );

    await prisma.users.update({
      where: { id: user.id },
      data: { refreshToken },
    });
return {token, refreshToken}
}


export const AccessToken = async ({ refreshToken }: { refreshToken: string }) => {
  const user = await prisma.users.findFirst({
       where: { refreshToken },
     });
 
     if (!user) {
      throw new Error("Invalid Refresh Token")
     }
  
     try {
  
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET as string);
    const newAccessToken = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET as string,
      { expiresIn: "15m" }
    );

    return { newAccessToken };
  } catch (err) {
    throw new Error("Expired or invalid refresh token");
  }
};


export const requestNewPassword  = async({email} : {email: string}) => {
   const user = await prisma.users.findUnique({ where : {email}});

   if (!user) throw new Error("User not found");
   if (!user.isVerified) throw new Error("User not verified");

     const jwtSecret = process.env.JWT_SECRET
     if (!jwtSecret) {
  throw new Error("JWT_SECRET is not defined in environment variables");
}

    const token = jwt.sign(

      {email : user.email},
      jwtSecret,
      { expiresIn: "20m"}

    )

    await prisma.users.update({
      where : {id : user.id},
      data :{verifyToken : token}
  })


    const resetlink = `http://localhost:3002/api/auth/resetpassword?token=${token}`

      const transporter = nodemailer.createTransport({
        service : "gmail",
        auth : {
            user : process.env.EMAIL_USER,
            pass : process.env.USER_PASS
        }
    })
  await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Verify your email",
      html: `
        <h3>Welcome, ${user.fullName}!</h3>
        <p>Please reset your password by clicking below:</p>
        <a href="${resetlink}">${resetlink}</a>
      `,
    });
}

export const resetPass = async(data: ResetPassword)=>{
  const {token, newPassword} = data
   const jwtSecret = process.env.JWT_SECRET
     if (!jwtSecret) {
  throw new Error("JWT_SECRET is not defined in environment variables");
}
  let decoded: any;

    const user = await prisma.users.findFirst({
      where : {email : decoded.email, verifyToken : token}
    })

    if(!user) throw new Error("User Not Found")
    if(!user.isVerified) throw new Error("user not verified please verify first")

      const hashedPassword = await bcrypt.hash(newPassword, 10);

    await prisma.users.update({
      where : {id : user.id},
      data : { password : hashedPassword, verifyToken : null}
  })
}


export const logoutUser =  async({userId} : {userId: number}) => {

   const user = await prisma.users.findUnique({
    where: { id:Number(userId) },
  });

  if (!user) throw new Error("User not found");

  await prisma.users.update({
    where: { id:Number(userId) },
    data: { refreshToken: null },
  });

  return { message: "Logged out successfully" };
};
