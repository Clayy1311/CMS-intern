import { Prisma } from "@prisma/client";
import prisma from "../db/index.js"
import nodemailer from "nodemailer";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { json } from "express";

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

        const hashedPassword = await bcrypt.hash(password, 10);

        const token = jwt.sign({email}, process.env.JWT_SECRET,{expiresIn : "1d"});
        const user = await prisma.users.create({
            data:
            {
            full_name, 
            email,
            company,
            job,
            country,
            password : hashedPassword,
            isVerified : false,
            verifytoken: token
            },
        });
        const verifylink = `http://localhost:3001/api/auth/verifyemail?token=${token}`

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
        <h3>Welcome, ${full_name}!</h3>
        <p>Please verify your email by clicking below:</p>
        <a href="${verifylink}">${verifylink}</a>
      `,
    });

    res.json({ message: "User Registered. Please check your email to verify." });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
     
      if (error.code === "P2002") {
        return res.status(400).json({ error: "Email already registered" });
      }
    }
    res.status(500).json({ error: error.message });
  }
};

export const verifyemail = async (req, res) => {
    try {
        
        const {token} =  req.query;

        const decoded =  jwt.verify(token, process.env.JWT_SECRET) 

        const user = await prisma.users.findFirst({
      where: {
        email: decoded.email,
        verifytoken: token,
      },
    })


        if(!user) return res.status(400).json({ error : "invalid token"})


        await prisma.users.update({
            where: {id : user.id},
            data : 
            { isVerified : true, verifytoken: null}
        });

         res.json({message :"Email verified successfully!"})
    } catch (error) {
      return res.status(400).json({error: "Invalid or expired token"})
        
    }
}

export const login = async (req, res) =>{
    try {
        const {
        
            
            email,
            password,
        } = req.body;
          
        const user = await prisma.users.findUnique({ where : {email}});
        if (!user)  return res.status(404).json({error : "User Not Found"});
        

        if(!user.isVerified) {
            return res.status(400).json({ message : "Please Verify Your Email"});
        };
            
            
            
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) return res.status(401).json({error : "Password Invalid"});

        const token = jwt.sign({ id: user.id}, process.env.JWT_SECRET, {

            expiresIn: "15m",
        }

        );

        const refreshToken = jwt.sign({id: user.id}, process.env.REFRESH_TOKEN_SECRET, {
          expiresIn : "7d",
        })


        await prisma.users.update({
          where : {id : user.id},
          data : {refreshToken},
        })

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

  
    const user = await prisma.users.findFirst({
      where: { refreshToken },
    });

    if (!user) {
      return res.status(403).json({ error: "Invalid refresh token" });
    }

   
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json({ error: "Expired or invalid refresh token" });
      }

    
      const newAccessToken = jwt.sign(
        { id: user.id },
        process.env.JWT_SECRET,
        { expiresIn: "15m" }
      );

      return res.json({
        accessToken: newAccessToken,
      });
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};



export const profile = async (req, res) => {
    
    try {
     const userId = req.userId;

    const user = await prisma.users.findUnique({
        where : { id: userId},
        select : {
            id : true,
            full_name :true,
            email : true,
            job : true,
           company : true,

          

        }
    });

    if (!user) return res.status(404).json({ error : "user not found"})

    res.json({message : "Heloo", user })
    } catch (error) {
        return res.status(500).json({ error : error.message})
    }
}

export const requestResetPassword = async (req, res) => {

  try {
    const {email} = req.body;

    const user = await prisma.users.findUnique({ where : {email}});

    if (!user) return res.status(404).json({ error : "User Not Found"});

    if(!user.isVerified) return res.status(400).json({error : "User Not Verified"})

    const token = jwt.sign(

      {email : user.email},
      process.env.JWT_SECRET,
      { expiresIn: "20m"}

    )

    await prisma.users.update({
      where : {id : user.id},
      data :{verifytoken : token}
  })


    const resetlink = `http://localhost:3000/api/auth/resetpassword?token=${token}`

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
        <h3>Welcome, ${user.full_name}!</h3>
        <p>Please reset your password by clicking below:</p>
        <a href="${resetlink}">${resetlink}</a>
      `,
    });

    res.json({message : "Reset password link sent to your email"})

  } catch (error) {
    return res.status(500).json({error : error.message})
  }
}

export const resetpassword = async (req, res) => {

  try {
    
    const {token} = req.query;
    const {newPassword} = req.body;

    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    const user = await prisma.users.findFirst({
      where : {email : decoded.email, verifytoken : token}
    })

    if(!user) return res.status(404).json({message : "User not found"});
    if(!user.isVerified) return res.status(403).json({message : "user not verified please verify first"})

      const hashedPassword = await bcrypt.hash(newPassword, 10);

    await prisma.users.update({
      where : {id : user.id},
      data : { password : hashedPassword, verifytoken : null}
  })
    
    res.json({ message : "Password reset successful!"})
  }

  catch(error){
         return res.status(400).json({ error: "Invalid or expired token"})
  }
}


export const logout = async (req, res) => {
 try {
  
  const userid = req.userId;

const user = await prisma.users.update({
  where : {id : userid},
  data : { refreshToken  : null},
  
})

res.json({ message : "Logout Successfully"})
 } catch (error) {
    return res.status(500).json({error : error.message})
 }
};


