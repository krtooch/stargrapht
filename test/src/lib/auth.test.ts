import {auth}  from '../../../src/lib/auth'


describe('auth test', ()=>{
    test('existtest', () => {
        expect(typeof auth === 'function').toBe(true)
    })
    test('if token do not start with token trow error', ()=>{
        expect(() => {
            auth('totot');
          }).toThrow();
    })
    test('if token start with TOKEN_ return end of query', ()=>{
        const rdmString = Date.now()+'ben'
        expect(auth(`TOKEN_${rdmString}`)).toEqual(rdmString)
    })
})
