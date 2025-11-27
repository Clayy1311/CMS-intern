import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
export const authMiddleware = (req:Request, res:Response, next:NextFunction) => {
    const token = req.headers["authorization"]?.split(" ")[1];
    if (!token) return res.status(401).json({ error : "No Token Provided"});

    try {
        const jwtSecret = process.env.JWT_SECRET
        if(!jwtSecret) throw new Error("JWT_SECRET not in env")
        const decoded = jwt.verify(token, jwtSecret);

        if (typeof decoded === "object" && "id" in decoded) {
      req.userId = Number(decoded.id);  
      next();
    } else {
      return res.status(403).json({ error: "Invalid token payload" });
    }
    } catch (error) {
        res.status(403).json({ error : "invalid Token"})
    }


    
}

// module.exports = {
//      authMiddleware
// }

