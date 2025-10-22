export interface Organizations {
    name : string,
    ownerId: number
}

export interface GetAllOrganizations {
    ownerId : number,
 
}

export interface UpdateOrganizations {
    name : string,
    id: number,
    ownerId : number
}


export interface DeleteOrganizations {
    id: number,
    ownerId: number
}