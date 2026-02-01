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
    roleName : string
}


export interface FindAllCollaborators {
    projectId : number,
    userId : number,
}

export interface DeleteCollaborators {
    projectId : number,
    userId : number,
    ownerId : number,
    collaboratorsId : number
}