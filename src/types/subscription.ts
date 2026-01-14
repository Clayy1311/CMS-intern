
export interface Subscription {   
    planId : number;
    organizationId : number;
    userId : number;
}


export interface getActiveSubscription {
    organizationId? : number;
    userId? : number;
}