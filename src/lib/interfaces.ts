export interface planet {
    name: string,
    code: string,
    id: number
} 

export interface spaceCenter {
    id: number,
    uid:string,
    name:string,
    description:string,
    latitude:number,
    longitude:number,
    planet_code:string
}

export interface flight {
    id : number,
    code : string,
    departureAt : Date,
    launchSiteUid : string,
    landingSiteUid : string
    
}