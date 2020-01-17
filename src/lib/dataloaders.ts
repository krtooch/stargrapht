// @ts-nocheck
import  Dataloader from 'dataloader'
import { getPlanetsByCodes, getSpaceCentersByUids, getFlightByCodes} from './queries'

export const dataloaders = ()  => ({
    planet : new Dataloader(getPlanetsByCodes),
    flight : new Dataloader(getFlightByCodes),
    spaceCenter : new Dataloader(getSpaceCentersByUids),
})
