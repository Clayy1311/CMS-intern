import { Request, Response, NextFunction } from "express";
import prisma from "../db";

export const organizationAccess = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = (req as any).userId; 
    const organizationId = Number(req.params.organizationId);

    if (!organizationId || isNaN(organizationId)) {
      return res.status(400).json({ error: "Organization ID is required" });
    }

    // 1) Check if user is the OWNER
    const isOwner = await prisma.organizations.findFirst({
      where: {
        id: organizationId,
        ownerId: userId,
      },
    });

    if (isOwner) {
      return next(); 
    }

    // 2) Check if user is a COLLABORATOR
    const isCollaborator = await prisma.projects.findFirst({
      where: {
        organizationId,
        collaborators: {
          some: {
            userId: userId,
          },
        },
      },
    });

    if (isCollaborator) {
      return next();
    }

   
    return res.status(403).json({ error: "Access denied" });
  } catch (error) {
    return res.status(500).json({
      error: "Internal server error",
      details: (error as Error).message,
    });
  }
};
