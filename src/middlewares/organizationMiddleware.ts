import { Request, Response, NextFunction } from "express";
import prisma from "../db";

export async function orgProjectAccess(req: Request, res: Response, next: NextFunction) {
  const userId = req.userId;
  const projectId = Number(req.params.projectId);

  const project = await prisma.projects.findUnique({
    where: { id: projectId },
    include: { 
      organization: true, 
      collaborators: true 
    },
  });

  if (!project) return res.status(404).json({ message: "Project not found" });

  const isOwner = project.organization.ownerId === userId;

  const isCollaborator = project.collaborators.some(c => 
    c.userId === userId && c.status === "active"
  );

  if (!isOwner && !isCollaborator)
    return res.status(403).json({ message: "Unauthorized" });

  next();
}
