const getAnimalsSnapshot = require('../src/get-animals-snapshot');

describe('getSnapshot', ()=> {

    const historyData = `e4e87cb2-8e9a-4749-abb6-26c59344dfee
2016/09/02 22:30:46
cat1 10 9

351055db-33e6-4f9b-bfe1-16f1ac446ac1
2016/09/02 22:30:52
cat1 10 9 2 -1
cat2 2 3

dcfa0c7a-5855-4ed2-bc8c-4accae8bd155
2016/09/02 22:31:02
cat1 12 8 3 4`;

    it('getSnapshot', ()=> {
        const historyArr = getAnimalsSnapshot.getHistoryDataArr(historyData);
        const expectGetAnimalsSnapshot = [
            {
                id: 'e4e87cb2-8e9a-4749-abb6-26c59344dfee',
                date: '2016/09/02 22:30:46',
                animals: [{ani_id: 'cat1', currentX: 10, currentY: 9}]
            },
            {
                id: '351055db-33e6-4f9b-bfe1-16f1ac446ac1',
                date: '2016/09/02 22:30:52',
                animals: [{ani_id: 'cat1', currentX: 10, currentY: 9, moveX: 2, moveY: -1},
                    {ani_id: 'cat2', currentX: 2, currentY: 3},]
            },
            {
                id: 'dcfa0c7a-5855-4ed2-bc8c-4accae8bd155',
                date: '2016/09/02 22:31:02',
                animals: [{ani_id: 'cat1', currentX: 12, currentY: 8, moveX: 3, moveY: 4}]
            }
        ];
        expect(historyArr).toEqual(expectGetAnimalsSnapshot);
    });

    it('judeFormatId of wrong format', ()=> {
        spyOn(console, 'log');
        const id = 'e4e87cb2-8e9a-4749- abb6-26c59344dfee';
        const expectResult = 'Invalid format.';
        getAnimalsSnapshot.judeFormatId(id);
        expect(console.log).toHaveBeenCalledWith(expectResult);
    });

    it('judeFormatId of correct format', ()=> {
        const id = 'e4e87cb2-8e9a-4749-abb6-26c59344dfee';
        const expectResult = true;
        const formatId = getAnimalsSnapshot.judeFormatId(id);
        expect(formatId).toEqual(expectResult);
    });

    it('judeFormatDate of wrong format', ()=> {
        spyOn(console, 'log');
        const date = '2016/09-02 22:30:46';
        const expectResult = 'Invalid format.';
        getAnimalsSnapshot.judeFormatDate(date);
        expect(console.log).toHaveBeenCalledWith(expectResult);
    });

    it('judeFormatDate of correct format', ()=> {
        const date = '2016/09/02 22:30:46';
        const expectResult = true;
        const formatDate = getAnimalsSnapshot.judeFormatDate(date);
        expect(formatDate).toEqual(expectResult);
    });


    it('judeFormatAnimals of wrong format', ()=> {
        spyOn(console, 'log');
        const historyDataArr = `e4e87cb2-8e9a-4749-abb6-26c59344dfee
2016/09/02 22:30:46
cat1 9`;
        const expectResult = 'Invalid format.';
        getAnimalsSnapshot.judeFormatAnimals(historyDataArr);
        expect(console.log).toHaveBeenCalledWith(expectResult);
    });

    it('judeFormatAnimals of correct format', ()=> {
        const historyDataArr = `e4e87cb2-8e9a-4749-abb6-26c59344dfee
2016/09/02 22:30:46
cat1 10 9 2 -1`;
        const expectResult = true;
        const formatData =  getAnimalsSnapshot.judeFormatAnimals(historyDataArr);
        expect(formatData).toEqual(expectResult);
    });

    it('judeHistoryData of correct historyData', ()=> {
        const expectResult = true;
        const historyDataArr = getAnimalsSnapshot.getHistoryDataArr(historyData);
        const formatAnimals = getAnimalsSnapshot.judeHistoryData(historyDataArr);
        expect(formatAnimals).toEqual(expectResult);
    });

    it('judeHistoryData of wrong historyData', ()=> {
        const errHistoryData = `e4e87cb2-8e9a-4749-abb6-26c59344dfee
2016/09/02 22:30:46
cat1 10 9

351055db-33e6-4f9b-bfe1-16f1ac446ac1
2016/09/02 22:30:52
cat1 10 9 2 -1
cat2 2 3

dcfa0c7a-5855-4ed2-bc8c-4accae8bd155
2016/09/02 22:31:02
cat1 11 8 3 4`;

        const errHistoryDataArr = getAnimalsSnapshot.getHistoryDataArr(errHistoryData);
        spyOn(console,'log');

        getAnimalsSnapshot.judeHistoryData(errHistoryDataArr);
        const expectResult = 'Conflict found at dcfa0c7a-5855-4ed2-bc8c-4accae8bd155';
        expect(console.log).toHaveBeenCalledWith(expectResult);
    });

});