export interface CreateProjects {
    name: string,
    organizationsId : number,
    ownerId : number
}


export interface FindProjects {
    ownerId: number,
    organizationsId : number
}


export interface UpdateProjects {
     name: string,
    organizationsId : number,
    ownerId : number,
    id : number
}