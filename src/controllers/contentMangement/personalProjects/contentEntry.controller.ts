// import { createContentEntry, editContentEntry, destroyContentEntry,getContentEntry } from "../../../services/contentMangement/personalProjects/contentEntries.serivces";
// import { Request, Response } from "express";


// export async function postContentEntry(req: Request, res:Response){

//     try {
//         const personalProjectId = Number(req.params.personalProjectId)
//         const contentModelId = Number(req.params.contentModelId)

//         const data = req.body

//         const createEntry = await createContentEntry({personalProjectId, contentModelId, ...data})

//         res.json({
//             success : true,
//             message : "Entries Added",
//             data: createEntry
//         })
//     }  catch (err) {
//         if(err instanceof Error){
//             return res.status(500).json({error : err.message})
//         }
//     }
// }


// export async function updateContentEntry(req:Request, res:Response){

//     try {
//         const personalProjectId = Number(req.params.personalProjectId)
//         const contentEntryId = Number(req.params.contentEntryId)

//         const data = req.body

//         const updateEntry = await editContentEntry({personalProjectId, contentEntryId, ...data})

//         res.json({
//             success : true,
//             message : "Entry Updated",
//             data : updateEntry
//         })
//    }  catch (err) {
//         if(err instanceof Error){
//             return res.status(500).json({error : err.message})
//         }
//     }
// }

// export async function deleteContentEntry(req:Request, res:Response){
    
   

//     try {
// const contentEntryId = Number(req.params.contentEntryId)

//     const deleteEntry = await destroyContentEntry({contentEntryId})

//     res.json({
//         success: true,
//         message : "delete successful",
//         data : deleteEntry
//     })
//   }  catch (err) {
//         if(err instanceof Error){
//             return res.status(500).json({error : err.message})
//         }
//     }
// }

// export async function indexContentEntry(req:Request, res:Response){
//     try {
//         const contentEntryId = Number(req.params.contentEntryId)

//         const getEntry = await getContentEntry({contentEntryId})

//         res.json({
//             success : true,
//             data: getEntry
//         })
        
//     }  catch (err) {
//         if(err instanceof Error){
//             return res.status(500).json({error : err.message})
//         }
//     }
// }



