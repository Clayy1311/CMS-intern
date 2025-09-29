import {Prisma} from "@prisma/client"
import prisma from "../db/index.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


export const getAllUser = async (req, res) =>{


try {
     const user = await prisma.users.findMany();
     
     
     res.json({message : "Data Dari User", user})

     return res.status(404).json({messsage  : "Empty User"})
    
} catch (error) {
    return res.status(500).json({ error : error.message})
}
   
}

export const findUserByid = async (req, res, ) => {

     const id = parseInt(req.params.id)
    try {
        
const user = await prisma.users.findUnique({ where  : {id}})

 if(!user){
return res.status(404).json({ message : "User not found"})
 }
    res.json({message : "Found Data : ", user})
    

    } catch (error) {
        return res.status(500).json({error : error.message})
    }
}


export const createuser = async (req, res) => {
    try {
        

         const {
            full_name, 
            email,
            company,
            job,
            country,
            password
        } = req.body;

 const token = jwt.sign({email}, process.env.JWT_SECRET,{expiresIn : "1d"});
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.users.create({
            data:
            {
            full_name, 
            email,
            company,
            job,
            country,
            password : hashedPassword,
            isVerified : true,
            verifytoken: token
            },
        })

          res.json({ message: "User Created", user });
    } catch (error) {
        return res.status(500).json({error : error.message})
    }
}


export const deleteUser = async (req, res) => {
try {
    const id = parseInt(req.params.id);

    if(!id){
        return res.status(400).json({ error : "Must Integer not string" })
    }


    const destroy = await prisma.users.delete({ where  : {id}})
        
    res.json({message : "Delete Successfully", destroy})
} catch (error) {
    return res.status(500).json({ error : error.message})
}
    
    
}