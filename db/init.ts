import { k } from '../src/connection'
import { TableBuilder, Transaction } from "knex"
import { default as planets } from './planets.json'
import { default as spaceCenters } from './space-centers.json'
import { random, sampleSize } from 'lodash'
import { randomBytes } from 'crypto'


const generateByte = async (): Promise<string> => new Promise((res) => {
    randomBytes(16, (er, buf) => {
        res(buf.toString('hex'))
    })
})

const generateFlights = (): Promise<{ code: string, launchSiteUid: string, landingSiteUid: string, seatCount: number, departureAt: Date }[]> => {
    const flightsProm = []
    for (let i = 0; i < 1000; i++) {
        const [start, end] = sampleSize(spaceCenters,2)
        generateByte
        flightsProm.push(
            generateByte()
                .then(code => ({
                    code: code,
                    launchSiteUid: start.uid,
                    landingSiteUid: end.uid,
                    reservedSeatCount: 0,
                    seatCount: 100 + random(300),
                    departureAt: new Date(Date.now() + random(30 * 24 * 3600 * 1000))
                })
                )
        )
    }
    return Promise.all(flightsProm)
}


const init = async (): Promise<void> => 
    k.transaction(async (t: Transaction) => {

        console.log('planets table Creation')
        await t.schema.createTable('planets', (table: TableBuilder) => {
            table.increments();
            table.string('name');
            table.string('code').unique();
        })

        console.log('space Center table Creation')
        await t.schema.createTable('spaceCenters', (table: TableBuilder) => {
            table.increments();
            table.string('uid').unique();
            table.string('name');
            table.string('description', 2000);
            table.float('latitude');
            table.float('longitude');
            table.string('planet_code').references('code').inTable('planets');
        })

        console.log('flights table Creation')
        await t.schema.createTable('flights', (table: TableBuilder) => {
            table.increments('id');
            table.string('code').unique();
            table.string('launchSiteUid').references('uid').inTable('spaceCenters');
            table.string('landingSiteUid').references('uid').inTable('spaceCenters');
            table.integer('seatCount');
            table.integer('reservedSeatCount');
            table.timestamp('departureAt');
        })


        await t.schema.createTable('bookings', (table: TableBuilder) => {
            table.increments('id');
            table.string('email');
            table.string('flight_code').references('code').inTable('flights');
        })
        console.log('adding planets')
        await t('planets').insert(planets)

        console.log('adding spaceCenters')
        await t('spaceCenters').insert(spaceCenters)

        console.log('generating flights')
        const flights = await generateFlights()

        console.log('adding flights')
        await t('flights').insert(flights)
    })




init()
    .then(()=>{
        console.log('database initialised')
        process.exit(0)
    })