import {planet, spaceCenter, flight} from './interfaces'
import { k } from '../connection'
import {find} from 'lodash'
import { randomBytes } from 'crypto'
import { Transaction} from 'knex'
const generateByte = async (): Promise<string> => new Promise((res) => {
    randomBytes(16, (er, buf) => {
        res(buf.toString('hex'))
    })
})
export const getPlanetsByCodes = async  (codes: Array<string> ) : Promise<(planet|undefined)[]> =>{
    const res = await  k.from('planets')
                                .select('*')       
                                .whereIn('code',codes)
    return codes.map(code=>find(res, {code}))
}


export const getSpaceCentersByUids = async  (uids:Array<number> ) : Promise<spaceCenter[]> =>{
    const res = await  k.from('spaceCenters')
                                .select('*')       
                                .whereIn('uid',uids)
    return uids.map(uid=>find(res, {uid}))
}

export const getFlightByCodes = async  (codes:Array<string> ) : Promise<flight[]> =>{
    const res = await  k.from('flights')
                                .select('*')       
                                .whereIn('code',codes)
                                
    return codes.map(code=>find(res, {code}))
}
export const getFlightCodeById = async(id:number):Promise<string> =>k.from('flights')
                                                                    .select('code')
                                                                    .where({id})
                                                                    .then((data: ({code:string})[])=>data[0].code)
                                                                    .catch(()=>{throw new Error('No Flight found for given ID')})


export const countReservedSeats = async (code:string) :Promise<number>=>k.from('bookings')
                                                        .where({flight_code:code})
                                                        .count('*')
                                                        .then((data: ({count:number})[])=>data[0].count)
                                                                                                                            .catch(()=>{throw new Error('No Flight found for given ID')})


export const getSpaceCenterUid = async (criteria:any):Promise<string>=>k.from('spaceCenters')
                                                       .select('uid')
                                                       .where(criteria)
                                                       .then((data: ({uid:string})[])=>data[0].uid)
                                                       .catch(()=>{throw new Error('No SpaceCenter found for given ID')})
                                                         

export const getPlanetsIds =   () : Promise<({id:number})[]> => k.from('planets').select('id')

export const getPlanetsCodes =   () : Promise<({code:string})[]> => k.from('planets').select('code')

export const getSpaceCentersUidByPlanetCode =   (code : string, limit :number) : Promise<(spaceCenter)[]> => k.from('spaceCenters')
                                                                                                            .select('spaceCenters.uid as uid')
                                                                                                            .where('planet_code',code)
                                                                                                            .limit(limit)

export const getSpaceCentersUid =   (limit :number, offset : number) : Promise<(spaceCenter)[]> => k.from('spaceCenters')
                                                                                                            .select('spaceCenters.uid as uid')
                                                                                                            .limit(limit)
                                                                                                            .offset(offset)
export const tableCount  = (table:string):number=> k.from(table)
                                                .count('*')
                                                .then((data: ({count:number})[])=>data[0].count)


export const getBookingPossibilities = async  (data: {limit : number, offset: number, from : spaceCenter["id"], to : spaceCenter["id"], seatCount: number, departureDay:Date }) : Promise<string[]>=>{
    const siteUids = await Promise.all([
            getSpaceCenterUid({id:data.from}),
            getSpaceCenterUid({id:data.to})
        ])
    const fls =await k.from('flights')
            .select('flights.code as code')
            .where({
                "flights.launchSiteUid": siteUids[0],
                "flights.landingSiteUid": siteUids[1]
            })
            .where('flights.departureAt','>', data.departureDay)
            .havingRaw('seatCount >= reservedSeatCount + ?',[data.seatCount])
            .limit(data.limit)
            .offset(data.offset)
        return fls
}


export const createFlight = async (data : {departureAt :Date, launchSiteId : number, landingSiteId : number,seatCount:number}) =>{

    const code = await  generateByte()
    const siteUids = await Promise.all([
        getSpaceCenterUid({id:data.launchSiteId}),
        getSpaceCenterUid({id:data.landingSiteId})
    ])
    return k('flights')
        .insert({
            launchSiteUid : siteUids[0],
            landingSiteUid : siteUids[1],
            seatCount: data.seatCount,
            reservedSeatCount : 0,
            departureAt: data.departureAt,
            code})
        .returning('code')
        .then((data:[any])=>data[0])
}
                                                

export const createBooking = async (data:{flightId:number, email:string, seatCount:number}) : Promise<void>=>k.transaction(async (t:Transaction) => {
      const flight_code =   await t('flights')
                                .increment('reservedSeatCount',data.seatCount)
                                .where({id:data.flightId})
                                .havingRaw('seatCount >= reservedSeatCount + ?',[data.seatCount])
                                .returning('code')
                                .then(data=>data[0])
     if(!flight_code) throw new Error('no flight found or not enough seats for given ID')
     await k('bookings')
            .insert(Array.from({ length: data.seatCount }).map(()=>({flight_code, email:data.email})))
    })

