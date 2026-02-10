import { informationPackage } from "../../services/plan & billings/planBillings.services";
import { Request, Response } from "express";


export async function handleInformationPackage(req:Request, res:Response){

    try {
        const userId = req.userId

        const summary = await informationPackage({userId : Number(userId)})

        return res.json({success : true, data : summary})
   } catch (err) {
      if(err instanceof Error){
        return res.status(500).json({error : err.message})
      }
    }
}