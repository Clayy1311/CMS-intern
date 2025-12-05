export interface CreateProjects {
    name: string,
    organizationsId : number,
    ownerId : number
}


export interface FindProjects {
    userId: number,
    organizationId : number
}


export interface UpdateProjects {
     name: string,
    organizationsId : number,
    ownerId : number,
    projectId : number
}

export interface DeleteProject {
    projectId: number,
    organizationsId : number,
    ownerId : number
}


export interface InformationProject {
    projectId : number,
    userId : number,
  
}


export interface UpdateContentModel{
    contentModelId: number,
    apiKey:string,
    name: string,
}