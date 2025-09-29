import {Prisma} from "@prisma/client"
import prisma from "../db/index.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


export const editProfile  = async (req, res) => {
  
     try {
         
        const userId = req.userId;
        
        const  {
            full_name ,
            company,
            job
        } = req.body;
 const dataToUpdate = {};
    if (full_name) dataToUpdate.full_name = full_name;
    if (company) dataToUpdate.company = company;
    if (job) dataToUpdate.job = job;
        

       const user =  await prisma.users.update({
             where : { id : userId},
            data: dataToUpdate,
      select: {
        id: true,
        full_name: true,
        company: true,
        job: true,
        email: true,
      },
        })
        if(!user) return res.status(400).json({ error : "User not found"})

        res.json({message : "Update Successfully", user})
     } catch (error) {
        return res.status(400).json({error : error.message})
     }

}