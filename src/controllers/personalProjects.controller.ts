import { indexPersonalProjects, storePersonalProjects,showPersonalProjects, editPersonalProjects, destroyPersonalProject } from "../services/personalProjects";
import { Request, Response } from "express";


export async function findManyPersonalProjects(req:Request, res:Response) {
    
    const ownerId = req.userId

     const personalProjects = await indexPersonalProjects(Number(ownerId))

     return res.json({success:true, data:personalProjects})

}


export async function addPersonalProjects(req:Request, res:Response){
    const ownerId = req.userId
    const {name} = req.body

    const personalProjects = await storePersonalProjects({name: String(name), ownerId: Number(ownerId) })

    return res.json({success: true, data:personalProjects})
}


export async function detailPersonalProjects(req:Request, res:Response){

    const ownerId = req.userId
    const projectId = parseInt(req.params.projectId)

    const showProject = await showPersonalProjects(Number(ownerId), Number(projectId))

    return res.json({
        success: true,
        data : showProject
    })
}


export async function updatePersonalProjects(req: Request, res: Response) {
  const ownerId = req.userId;
  const projectId = Number(req.params.projectId);

 
  const { name, status, customDomain } = req.body;

  try {

    if (!projectId || isNaN(projectId)) {
      return res.status(400).json({ success: false, error: "Invalid project ID" });
    }

    
    if (
      name === undefined &&
      status === undefined &&
      customDomain === undefined
    ) {
      return res.status(400).json({
        success: false,
        error: "At least one field must be provided"
      });
    }

    if (name !== undefined && !name.trim()) {
      return res.status(400).json({
        success: false,
        error: "Name cannot be empty"
      });
    }

    if (status !== undefined && !status.trim()) {
      return res.status(400).json({
        success: false,
        error: "Status cannot be empty"
      });
    }

    if (customDomain !== undefined && !customDomain.trim()) {
      return res.status(400).json({
        success: false,
        error: "Custom domain cannot be empty"
      });
    }

    const updated = await editPersonalProjects({
      ownerId : Number(ownerId),
      projectId,
      name,
      status,
      customDomain
    });

    return res.json({ success: true, data: updated });

  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err instanceof Error ? err.message : "Unknown error"
    });
  }
}

export async function deletePersonalProject(req:Request, res:Response){
    const ownerId = req.userId
    const projectId = parseInt(req.params.projectId)


    const destroyProject = await destroyPersonalProject({ownerId : Number(ownerId), projectId})

    return res.json({
        success : true, 
        message : "Deleted Successfully",
        data : destroyProject
    })
}