import {objectType, intArg} from 'nexus'
import { planet } from '../lib/interfaces';

const resolveSpaceCenters = async (obj : planet, {limit = 3}  : any, ctx :any)=>{
      const uids = await ctx.queries.getSpaceCentersUidByPlanetCode(obj.code, limit)
      return ctx.dataloaders.spaceCenter.loadMany(uids.map(({uid})=>uid))
    }


export const Planet = objectType({
    name: "Planet",
    definition(t) {
      t.int("id", { description: "Id of the planets" });
      t.string("name")
      t.string("code")
      t.field("spaceCenters",{
        type:"SpaceCenter",
        list : true,
        args : {
          limit: intArg()
        },
        resolve:resolveSpaceCenters
      })
    },
  }); 
  
//   ```graphql
//   query planets {
//     planets {
//       id
//       name
//       code
//       spaceCenters(limit: 3) {
//         id
//       }
//     }
//   }
//   ```