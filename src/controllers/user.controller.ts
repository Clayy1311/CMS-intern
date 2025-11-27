import { alluser } from "../services/user.service";
import { Response, Request } from "express";

export async function semuaUser(req:Response, res:Response) {
  try {
       const getUser = await alluser();

    return res.json({
        success : true,
        data: getUser
    })

  } catch (err) {
      if(err instanceof Error){
        return res.status(500).json({error : err.message})
      }
    }
 

}