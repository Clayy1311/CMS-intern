import {Prisma} from "@prisma/client"
import prisma from "../db/index"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";

export async function editProfile(req:Request, res:Response){
  
     try {
         
        const userId = req.userId;
         if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }
        const  {
            full_name ,
            company,
            job
        } = req.body;

         const dataToUpdate: {
      full_name?: string;
      company?: string;
      job?: string;
    } = {};
 
    if (full_name) dataToUpdate.full_name = full_name;
    if (company) dataToUpdate.company = company;
    if (job) dataToUpdate.job = job;
        

       const user =  await prisma.users.update({
             where : { id : userId},
            data: dataToUpdate,
      select: {
        id: true,
        fullName: true,
        company: true,
        job: true,
        email: true,
      },
        })
        if(!user){
         return res.status(400).json({ error : "User not found"})
        } 

        res.json({message : "Update Successfully", user})
     } catch(err){
      if(err instanceof Error){
         return res.status(500).json({error : err.message})
      }
      return res.status(500).json({error : "Something Wrong"})
     }

}