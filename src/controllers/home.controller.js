import { Prisma } from "@prisma/client";
import prisma from "../db/index.js"
import nodemailer from "nodemailer";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";



export const home = async (req, res) => {

    try {
          const userId = req.userId;
     
          

    const user = await prisma.users.findUnique({
          
        where : {id : userId},
        select : {full_name : true}

    })
  
    res.json({message : "Welcome Back !", user})
    } catch (error) {
        return res.status(400).json({error : error.message})
    }
   

}
