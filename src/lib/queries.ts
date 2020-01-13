import {planet, spaceCenter} from './interfaces'
import { k } from '../connection'
import {find} from 'lodash'

export const getPlanetsByCodes = async  (codes: Array<number> ) : Promise<(planet|undefined)[]> =>{
    const res = await  k.from('planets')
                                .select('*')       
                                .whereIn('code',codes)
    return codes.map(code=>find(res, {code}))
}


export const getSpaceCentersByUids = async  (uids:Array<number> ) : Promise<(spaceCenter|undefined)[]> =>{
    const res = await  k.from('spaceCenters')
                                .select('*')       
                                .whereIn('uid',uids)
    return uids.map(uid=>find(res, {uid}))
}

export const getPlanetsIds =   () : Promise<(planet)[]> => k.from('planets').select('id')

export const getPlanetsCodes =   () : Promise<(planet)[]> => k.from('planets').select('code')

export const getSpaceCentersUidByPlanetCode =   (code : string, limit :number) : Promise<(spaceCenter)[]> => k.from('spaceCenters')
                                                                                                            .select('spaceCenters.uid as uid')
                                                                                                            .where('planet_code',code)
                                                                                                            .limit(limit)

