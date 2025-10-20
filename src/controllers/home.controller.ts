import { Prisma } from "@prisma/client";
import prisma from "../db/index"
import nodemailer from "nodemailer";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";


export async function home(req:Request, res:Response) {

try {
          const userId = req.userId;
     
          

    const user = await prisma.users.findUnique({
          
        where : {id : userId},
        select : {fullName : true}

    })
  
    res.json({message : "Welcome Back !", user})
    } catch(err: unknown){
        if(err instanceof Error){
            return res.status(500).json({error : err.message})
        }
        return res.status(500).json({error : "Something Wrong"})
    }
}
    
   

