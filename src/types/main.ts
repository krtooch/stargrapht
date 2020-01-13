import {queryType, intArg} from 'nexus'


const resolvePlanets = async (_obj : any, _args : any, ctx:any)=>{
   const codes = await  ctx.queries.getPlanetsCodes()
   return ctx.dataloaders.planet.loadMany(codes.map(({code})=>code)
}

export const Query =queryType({
    definition(t) {
        t.list.field("planets", { 
          type:'Planet',
          description: "planets referentiel", 
          resolve : resolvePlanets 
        });

      }
})