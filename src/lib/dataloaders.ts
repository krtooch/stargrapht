import  Dataloader from 'dataloader'
import { getPlanetsByCodes, getSpaceCentersByUids} from './queries'

export const dataloaders = ()  => ({
    planet : new Dataloader(getPlanetsByCodes),
    spaceCenter : new Dataloader(getSpaceCentersByUids),
})
