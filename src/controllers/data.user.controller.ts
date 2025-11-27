import {Prisma} from "@prisma/client"
import prisma from "../db/index"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {Request, Response} from "express";

export async function getAllUser(req:Request, res:Response){


try {
     const user = await prisma.users.findMany({
        select: {
            email : true
        }
     });
     
     
     res.json({message : "Data Dari User", user})

     return res.status(404).json({messsage  : "Empty User"})
    
 } catch(err : unknown){
        if(err instanceof Error){
            return res.status(500).json({error : err.message})
        }
        return res.status(500).json({error : "Something Wrong"})
    }
}


export async function findUserById(req:Request, res:Response){

     const id = parseInt(req.params.id)
    try {
        
const user = await prisma.users.findUnique({ where  : {id}})

 if(!user){
return res.status(404).json({ message : "User not found"})
 }
    res.json({message : "Found Data : ", user})
    

    } catch(err : unknown){
        if(err instanceof Error){
            return res.status(500).json({error : err.message})
        }
        return res.status(500).json({error : "Something Wrong"})
    }
}


export async function createUser(req:Request, res:Response){
    try {
        

         const {
            fullName, 
            email,
            company,
            job,
            country,
            password
        } = req.body;
   
        const jwtSecret = process.env.JWT_SECRET

        if(!jwtSecret) throw new Error("JWT_SECRET is not in env")
 const token = jwt.sign({email}, jwtSecret,{expiresIn : "1d"});
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.users.create({
            data:
            {
            fullName, 
            email,
            company,
            job,
            country,
            password : hashedPassword,
            isVerified : true,
            verifyToken: token
            },
        })

          res.json({ message: "User Created", user });
   } catch(err : unknown){
        if(err instanceof Error){
            return res.status(500).json({error : err.message})
        }
        return res.status(500).json({error : "Something Wrong"})
    }
}


export async function deleteUser(req:Request, res:Response){
try {
    const id = parseInt(req.params.id);

    if(!id){
        return res.status(400).json({ error : "Must Integer not string" })
    }


    const destroy = await prisma.users.delete({ where  : {id}})
        
    res.json({message : "Delete Successfully", destroy})
 } catch(err : unknown){
        if(err instanceof Error){
            return res.status(500).json({error : err.message})
        }
        return res.status(500).json({error : "Something Wrong"})
    }
}

