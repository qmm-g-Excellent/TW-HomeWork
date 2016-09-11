const historyDataToArray = require('../src/get-animals-snapshot');

describe('getSnapshot', ()=> {


    it('getSnapshot', ()=> {
        const history = `e4e87cb2-8e9a-4749-abb6-26c59344dfee
2016/09/02 22:30:46
cat1 10 9

351055db-33e6-4f9b-bfe1-16f1ac446ac1
2016/09/02 22:30:52
cat1 10 9 2 -1
cat2 2 3

dcfa0c7a-5855-4ed2-bc8c-4accae8bd155
2016/09/02 22:31:02
cat1 12 8 3 4`;
        const historyArr = historyDataToArray(history);
        const expectGetAnimalsSnapshot = [
            {
                id: 'e4e87cb2-8e9a-4749-abb6-26c59344dfee',
                date: '2016/09/02 22:30:46',
                animals: [{ani_id: 'cat1', currentX: 10, currentY: 9}]
            },
            {
                id: '351055db-33e6-4f9b-bfe1-16f1ac446ac1',
                date: '2016/09/02 22:30:52',
                animals: [{ani_id: 'cat1', lastX: 10, lastY: 9, currentX: 2, currentY: -1},
                    {ani_id: 'cat1', currentX: 2, currentY: 3},]
            },
            {
                id: 'dcfa0c7a-5855-4ed2-bc8c-4accae8bd155',
                date: '2016/09/02 22:31:02',
                animals: [{ani_id: 'cat1', lastX: 12, lastY: 8, currentX: 3, currentY: 4}]
            }
        ];
        expect(historyArr).toEqual(expectGetAnimalsSnapshot);
    });


});