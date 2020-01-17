import {queryType, objectType, mutationType, stringArg, intArg, arg} from 'nexus'
import { dataloaders } from '../lib/dataloaders'

const resolvePlanets = async (_obj : any, _args : any, ctx:any)=>{
   const codes = await  ctx.queries.getPlanetsCodes()
   return ctx.dataloaders.planet.loadMany(codes.map((data:{code:string})=>data.code))
}

const resolveSpaceCenters = async (_obj : any, {page = 1, pageSize= 10} : any, ctx:any)=>{  
  const uids =  await ctx.queries.getSpaceCentersUid(pageSize, (page-1)*pageSize)
  const nodes=  await ctx.dataloaders.spaceCenter.loadMany(uids.map((data:{uid:string})=>data.uid))
  return {
          nodes, 
          pagination:{
                page, 
                pageSize
              }
          }
}

const resolveFlights = async (_obj : any, {page = 1, pageSize= 10, from, to, seatCount, departureDay } : any, ctx:any)=>{  
  const codes =await ctx.queries.getBookingPossibilities( {offset:(page-1)*pageSize, limit :pageSize, from, to, seatCount, departureDay })
  return ctx.dataloaders.flight.loadMany(codes.map((data:{code:string})=>data.code)))
}

const resolveScheduleFlight = async (_obj : any, args:{flightInfo:{launchSiteId : number, landingSiteId:number}}, ctx:any)=>{  
  if (args.flightInfo.launchSiteId === args.flightInfo.landingSiteId) throw new Error("No travel between same point")
  const uid =await ctx.queries.createFlight(args.flightInfo)
  ctx.dataloaders.flight.clear(uid)
  return ctx.dataloaders.flight.load(uid)
}


const resolveBookFlight = async (_obj : any,args:any, ctx:any)=>{  
 await ctx.queries.createBooking(args.bookingInfo )
  return true
}

export const Query =queryType({
    definition(t) {
        t.list.field("planets", { 
          type:'Planet',
          description: "planets referentiel", 
          resolve : resolvePlanets 
        });
        t.field("spaceCenter", { 
          type:'SpaceCenter',
          description: "spaceCenter specified one", 
          args:{
            uid:stringArg(),
            id:intArg()
          },
          resolve : async (_obj,{uid, id},ctx)=>{
            if(uid) return ctx.dataloaders.spaceCenter.load(uid)
            if(id){
              const uId = await ctx.queries.getSpaceCenterUid({id})
              return ctx.dataloaders.spaceCenter.load(uId)
            }
            throw new Error('Need provide id or uid of flight')
          }
        });
        t.field("spaceCenters", { 
          type:'SpaceCentersRef',
          description: "spaceCenter referentiel", 
          resolve : resolveSpaceCenters,
          args :{
            page : intArg(),
            pageSize : intArg()
          }
        });
        t.field("flight", { 
          type:'Flight',
          description: "flight specified one", 
          args:{
            id:intArg(),
            uid:stringArg()
          },
          resolve : async  (_obj,{id},ctx)=>{
            const code = await ctx.queries.getFlightCodeById(id)
            return ctx.dataloaders.flight.load(code) 
          }
        });
        t.field("flights", { 
          type:'FlightsRef',
          description: "flight referentiel", 
          resolve : resolveFlights,
          args :{
            from : intArg({required:true}),
            to : intArg({required:true}),
           // seatCount:intArg({required: true}),
            departureDay:arg({required: true, type:"Date"}),
            page : intArg(),
            pageSize : intArg()
          }
        });
      }
})  

export const Mutation =mutationType({
  definition(t) {
      t.field("scheduleFlight", { 
        type:'Flight',
        description: "add an flight", 
        args:{
          flightInfo: arg({type:"ScheduleFlightInput", required:true})
        },
        resolve : resolveScheduleFlight
      });
      t.boolean("bookFlight", { 
        description: "book a flight", 
        nullable :true,
        args:{
          bookingInfo:arg({type : 'BookingInput'})
        },
        resolve : resolveBookFlight
      });
    }
})  

export const Pagination = objectType({
  name:"Pagination",
  definition(t){
    t.int("total", {
      resolve :({total},arg,ctx,info)=>{
        if(total) return total
         //@ts-ignore
        return ctx.queries.tableCount(info.path.prev.prev.key)
      }   
    })

    t.int("page")
    t.int("pageSize")
  }
})