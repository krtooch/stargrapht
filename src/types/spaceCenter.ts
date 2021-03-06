import {objectType} from 'nexus'

export const SpaceCenter = objectType({
    name: "SpaceCenter",
    definition(t) {
      t.int("id");
      t.string("uid")
      t.string("name")
      t.string("description")
      t.float("latitude")
      t.float("longitude")
      t.field("planet", {
        type : "Planet",
        resolve : (obj, args, ctx) =>ctx.dataloaders.planet.load(obj.planet_code)
      })
    },
    
  }); 


export const SpaceCentersRef = objectType({
  name: "SpaceCentersRef",
  definition(t) {
    t.field("pagination",{type:'Pagination'});
    t.list.field('nodes',{type:"SpaceCenter"})
  },
  
}); 


