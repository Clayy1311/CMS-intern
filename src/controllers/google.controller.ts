import { OAuth2Client } from 'google-auth-library'
import prisma from "../db/index"
import jwt from "jsonwebtoken"
import { Request, Response } from 'express'
export const google = async (req:Request, res:Response) => {
       

    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)
    try {

        const {token} = req.body;


        const ticket = await client.verifyIdToken({
          idToken : token,
          audience : process.env.GOOGLE_CLIENT_ID

        })

        const payload = ticket.getPayload();
        if (!payload?.email) {
         return res.status(400).json({ error: "Google authentication failed" });
        }
       
    const email = payload.email;
    const fullName = payload.name
      
        let user = await prisma.users.findUnique({where : {email}});


        if(!user) {

            user = await prisma.users.create({
           data :

           {
           fullName,
          email,
          company: "Google User",
          job: "N/A",
          country: "N/A",
          password: null, 
          isVerified: true,
           }
                
            })
        }
         const jwtSecret = process.env.JWT_SECRET
         if(!jwtSecret) throw new Error("JWT_SECRET_KEY is not in env")
        const appToken = jwt.sign(
            {id : user.id, email : user.email},
            jwtSecret,
            {expiresIn : "1h"}
        )

        res.json({message : "Login Successful", token : appToken, user})
        
    } catch(err : unknown){
        if(err instanceof Error){
            return res.status(500).json({error : err.message})
        }
        return res.status(500).json({error : "Something Wrong"})
    }
}


//openid email profile
