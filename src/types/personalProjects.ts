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

// content models
export interface CreateContentModel{
  personalProjectId : number,
  name : string,
  apiKey: string,

}

export interface GetContentModel{
  personalProjectId : number
}

export interface UpdateContentModel{
    contentModelId: number,
    apiKey:string,
    name: string,
}

export interface DeleteContentModel{
  contentModelId : number
}

// content fields

export interface CreateContentField{
  contentModelId: number;
  name: string;
  key: string;
  type: string;
  required?: boolean;
  unique?: boolean;
  order?: number;
  validation?: any; 
  relationType?: string; 
  relationContentModelId?: number;
}

export interface UpdateContentField {
  contentFieldId: number;
  name?: string;
  key?: string;
  type?: string;
  required?: boolean;
  unique?: boolean;
  order?: number;
  validation?: any;
  relationType?: string;
  relationContentModelId?: number;
}

export interface DeleteContentField{
    contentFieldId : number
}