import { k } from '../src/connection'

describe('connection', ()=>{
    test('exist', () => {
        expect(typeof k !== "undefined").toBe(true)
      })
})
