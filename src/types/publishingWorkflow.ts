export interface Publish{
    contentEntryId : number,
    userId : number
}

export interface Unpublish{
    contentEntryId : number,
    userId : number
}

export interface Review{
    contentEntryId : number,
    userId : number,
}


export interface SchedulePublish{
    contentEntryId : number,
    userId : number,
    scheduledAt : Date  
}