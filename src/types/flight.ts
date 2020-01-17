import {objectType} from 'nexus'

export const Flight = objectType({
    name: "Flight",
    definition(t) {
      t.int("id");
      t.string("code")
      t.field("launchSite", {
        type:"SpaceCenter",
        resolve : (obj, args, ctx) =>ctx.dataloaders.spaceCenter.load(obj.launchSiteUid)
      })
      t.field("landingSite", {
        type:"SpaceCenter",
        resolve : (obj, args, ctx) =>ctx.dataloaders.spaceCenter.load(obj.landingSiteUid)
      })
      t.field("departureAt", {
        type:"Date"
      })
      t.int("seatCount")
      t.int("reservedSeatCount",{nullable:true})
      t.int("availableSeatCount", {
        nullable:true,
        resolve: ({reservedSeatCount, seatCount})=>(seatCount - reservedSeatCount)
    })
    }
  }); 

export const FlightsRef = objectType({
  name: "FlightsRef",
  definition(t) {
    t.field("pagination",{type:'Pagination'});
    t.list.field('nodes',{type:"Flight"})
  },
}); 



