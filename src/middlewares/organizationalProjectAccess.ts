import { Request, Response, NextFunction } from "express";
import prisma from "../db";

export async function orgProjectAccess(
  req: any,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = req.userId as number;
    const projectId = Number(req.params.projectId);

    if (!projectId) {
      return res.status(400).json({ message: "Invalid project id" });
    }

   
    const project = await prisma.projects.findUnique({
      where: { id: projectId },
      select: {
        id: true,
        organization: { select: { ownerId: true } },
        collaborators: {
          where: {
            userId,
            status: "active"
          },
          select: { id: true, role: true }
        }
      }
    });

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    const isOwner = project.organization.ownerId === userId;
    const collaborator = project.collaborators[0]; 

    if (!isOwner && !collaborator) {
      return res.status(403).json({ message: "No project access" });
    }

  
    req.project = project;
    req.isOrgOwner = isOwner;
    req.collaborator = collaborator || null;

    next();
  } catch (err) {
    console.error("orgProjectAccess error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
}