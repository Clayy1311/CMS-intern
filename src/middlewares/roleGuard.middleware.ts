import { Request, Response, NextFunction } from "express";
import prisma from "../db";


export function roleGuard(allowedRoles: string[]) {
  return (req: any, res: Response, next: NextFunction) => {
    try {
    
      const isOrgOwner = req.isOrgOwner;
      const collaborator = req.collaborator; 
      
   
      if (isOrgOwner) {
        return next();
      }

      
      if (!collaborator) {
        return res.status(403).json({ message: "No project access" });
      }

      const userRole = collaborator.role;

      if (!allowedRoles.includes(userRole)) {
        return res.status(403).json({
          message: `Role '${userRole}' not allowed`
        });
      }

      // inject roledipakai con troller
      req.userRole = userRole;

      next();
    } catch (err) {
      console.error("roleGuard error:", err);
      return res.status(500).json({ message: "Internal server error" });
    }
  };
}

export async function superAdminGuard(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!req.userId) {
    return res.status(401).json({ message: "Unauthenticated" });
  }

  const user = await prisma.users.findUnique({
    where: { id: req.userId },
    include: { role: true }
  });

  if (!user || user.role?.name !== "super_admin") {
    return res.status(403).json({
      message: "Super admin access only"
    });
  }

  next();
}
