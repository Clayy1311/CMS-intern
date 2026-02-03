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


export interface CreateContentModel{
  projectId : number,
  name : string,
//   apiKey: string,
  slug : string
}


export interface UpdateContentModel{
    contentModelId: number,
    // apiKey:string,
    name: string,
    slug : string
}


//contentFields

export interface CreateContentField {
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

//Content Entries
export interface CreateContentEntries{
    contentModelId : number,
    projectId : number,
    userId: number,
    slug? : string,
    contentValues : Array<{
      contentFieldId: number;
      contentValue: any;
    }>;
    seo : {
     seoTitle : string,
     metaDesc : string,
     keywords : string   
    }
}


export interface UpdateContentEntries{
    contentEntryId : number,
    projectId : number,
    slug? : string,
    status? : string,
    userId : number,
     contentValues : Array<{
      contentFieldId: number;
      contentValue: any;
    }>;
    seo : {
        seoTitle : string,
        metaDesc : string,
        keywords : string
    }
}

export interface GetContentEntries{
    contentEntryId : number,


}


export interface GetContentEntriesByModel{
    contentModelId : number
}
export interface DeleteContentEntries{
    contentEntryId : number
}

export interface UpsertSEO{
    contentEntryId : number,
    seoTitle : string,
    metaDesc: string,
    keywords : string,
    ogImage : string,
   twitterImage : string
}


export interface GetSEO{
    contentEntryId : number,

}