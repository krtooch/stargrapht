import {inputObjectType} from 'nexus'

export const ScheduleFlightInput = inputObjectType({
    name: "ScheduleFlightInput",
    definition(t) {
      t.int("launchSiteId", { required: true });
      t.int("landingSiteId", { required: true });
      t.field("departureAt",{ required:true, type: "Date" })
      t.int("seatCount",{required:true})
    },
  });

export const BookingInput = inputObjectType({
    name: "BookingInput",
    definition(t) {
      t.int("seatCount", { required: true });
      t.int("flightId", { required: true });
      t.string("email",{ required:true})
    },
  });
