import {getPlanetsByIds} from '../../../src/lib/queries'
import sinon from 'sinon'
import {k} from '../../../src/connection';



describe('getPlanetsByIds test', ()=>{
    test('existtest', () => {
        expect(typeof getPlanetsByIds === 'function').toBe(true)
    })

    test('return result returned from knex Function Order as ids array', async ()=>{
        const mResponse = [{ id: 1 , code: 'toto', name : 'totoland'}, { id: 2 , code: 'toutou', name : 'toutouland'}];
        const selectStub = sinon.stub()
                            .withArgs('*')
                            .returnsThis();
        const whereInStub = sinon.stub()
                            .withArgs('id',[1,2])
                            .resolves(mResponse);
        sinon.stub(k, "from")
            .withArgs('planets')
            .callsFake((): any => {
            return {
                select: selectStub,
                whereIn: whereInStub
            };
            });
        const actual = await getPlanetsByIds([2,1]);
        expect(actual).toEqual([mResponse[1],mResponse[0]])
    })

})
