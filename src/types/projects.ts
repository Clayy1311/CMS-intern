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
    id : number
}

export interface DeleteProject {
    id: number,
    organizationsId : number,
    ownerId : number
}