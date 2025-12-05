export interface StorePersonalProject {
    ownerId : number,
    name : string
}



export interface UpdatePersonalProject{
    ownerId : number,
    projectId : number,
    name : string,
    status : string,
    customDomain : string
}

export interface DeletePersonalProject{
  ownerId : number,
  projectId : number
}


//content management


export interface CreateContentModel{
  projectId : number,
  name : string,
  apiKey: string,

}
