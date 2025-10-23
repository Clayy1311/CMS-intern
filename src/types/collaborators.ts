export interface AddCollaborators {
  projectId : number, 
  userId   : number,
  ownerId : number
}

export interface EditCollaborators{
    projectId: number,
    userId : number,
    ownerId : number,
    collaboratorsId:number,
    role : string
}


export interface FindAllCollaborators {
    projectId : number,
    ownerId : number,
}

export interface DeleteCollaborators {
    projectId : number,
    userId : number,
    ownerId : number,
    collaboratorsId : number
}