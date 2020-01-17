// @ts-nocheck
const baseURL = 'http://localhost:3000/graphql'
import axios from 'axios'
import gql from 'graphql-tag';


const QUERYPLANET =`{
  planets {
    name
    code
    spaceCenters {
      name
    }
  }
}`

const QUERYFLIGHT= `{ 
  flight(id: 1) {  
      id
      reservedSeatCount 
    }
  }`

const MUTATION= ` mutation {bookFlight(bookingInfo: { flightId: 1, email: "bob@mm.fr", seatCount: 10 })}`

const QUERYANSWER={"planets":[{"name":"Mercury","code":"MER","spaceCenters":[{"name":"Hintz Union Space Center"},{"name":"Jedediah Dale Space Center"},{"name":"Nayeli Island Space Center"}]},{"name":"Venus","code":"VEN","spaceCenters":[{"name":"Annalise Vista Space Center"},{"name":"Stoltenberg Crossroad Space Center"},{"name":"Steuber Summit Space Center"}]},{"name":"Earth","code":"EAR","spaceCenters":[{"name":"Nyasia Isle Space Center"},{"name":"Bella Port Space Center"},{"name":"Prosacco Harbor Space Center"}]},{"name":"Mars","code":"MAR","spaceCenters":[{"name":"Benjamin Estate Space Center"},{"name":"Braun Mountain Space Center"},{"name":"Parker Inlet Space Center"}]},{"name":"Jupiter","code":"JUP","spaceCenters":[{"name":"Madison Grove Space Center"},{"name":"Corwin Passage Space Center"},{"name":"Rath Mountain Space Center"}]},{"name":"Saturn","code":"SAT","spaceCenters":[{"name":"Randall Springs Space Center"},{"name":"Kiera Causeway Space Center"},{"name":"Filomena Cove Space Center"}]},{"name":"Uranus","code":"URA","spaceCenters":[{"name":"Pouros Greens Space Center"},{"name":"Stewart Lane Space Center"},{"name":"Skiles Burgs Space Center"}]},{"name":"Neptune","code":"NEP","spaceCenters":[{"name":"Herman Brooks Space Center"},{"name":"Torp Mews Space Center"},{"name":"Hettinger Green Space Center"}]},{"name":"Ceres","code":"CER","spaceCenters":[{"name":"Billie Trail Space Center"},{"name":"Deron Pass Space Center"},{"name":"Doyle Bypass Space Center"}]},{"name":"Pluto","code":"PLU","spaceCenters":[{"name":"Jarod Extension Space Center"},{"name":"Hettinger Overpass Space Center"},{"name":"Urban Throughway Space Center"}]},{"name":"Eris","code":"ERI","spaceCenters":[{"name":"Bradtke Tunnel Space Center"},{"name":"Medhurst Extensions Space Center"},{"name":"Carolyne Prairie Space Center"}]},{"name":"Enceladus","code":"SAT_ENC","spaceCenters":[{"name":"Adrienne Valley Space Center"},{"name":"Wilton Bridge Space Center"},{"name":"Charlotte Valleys Space Center"}]},{"name":"Titan","code":"SAT_TIT","spaceCenters":[{"name":"Conner Motorway Space Center"},{"name":"David Corners Space Center"},{"name":"Nicolas Centers Space Center"}]},{"name":"Ganymede","code":"JUP_GAN","spaceCenters":[{"name":"Cole Haven Space Center"},{"name":"Rau Rapid Space Center"},{"name":"Block Shoals Space Center"}]},{"name":"Europa","code":"JUP_EUR","spaceCenters":[{"name":"Jeffrey Crescent Space Center"},{"name":"Graciela Corners Space Center"},{"name":"O'Kon Course Space Center"}]}]}

const conf = {
  method:'POST',
  baseURL,
  headers:{"Authorization":"TOKEN_toto"}}

describe('End 2 End Test', ()=>{

    test('Verifiying that giving list of planets' ,async  () => {
        const res = await axios({...conf,data:{query:QUERYPLANET} })
        expect(res.data.data).toEqual(QUERYANSWER)
      })

    test('Verifiying that booking tickets on flight is decreasing amount of available seats',async  () => {
      const before = await axios({...conf,data:{query:QUERYFLIGHT} })
      await axios({...conf,data:{query:MUTATION} })
      const after = await axios({...conf,data:{query:QUERYFLIGHT} })
      expect(before.data.data.flight.reservedSeatCount+10).toEqual(after.data.data.flight.reservedSeatCount)
    })
})