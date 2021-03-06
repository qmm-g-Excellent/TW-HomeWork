let getSnapshot = (historyData, id) => {
    const historyDataArr = getHistoryDataArr(historyData);
    const errHistoryData = judeHistoryAnimalsData(historyDataArr);
    if (errHistoryData) {
        return;
    }
    const animalsText = getAreaAnimals(historyDataArr, id);
    console.log(animalsText);
};

let judeHistoryAnimalsData = (historyDataArr) => {
    return historyDataArr.map(element => {
        const formatId = judeFormatId(element.ani_id);
        const formatDate = judeFormatDate(element.date);
        const errFormatAni = judeFormatAnimals(historyDataArr);
        const errAnimalsData = judeFormatAnimals(historyDataArr);
        if (!formatId || formatDate || errFormatAni || errAnimalsData) {
            return 'Error';
        }
    });
};

let getHistoryDataArr = (history)=> {
    const historySplited = history.split("\n\n");
    return historyArr = historySplited.map(element => {
        const elementSplited = element.split("\n");
        const id = elementSplited[0];
        const date = elementSplited[1];
        const animals = getAnimalsArr(elementSplited);
        return {id, date, animals};
    });
};

let getAnimalsArr = (elementSplited)=> {
    const element = elementSplited.splice(2);
    return animalsArr = element.map(item => {
        const itemSplited = item.split(' ');
        const ani_id = itemSplited[0];
        const currentX = parseInt(itemSplited[1]);
        const currentY = parseInt(itemSplited[2]);
        if (itemSplited[3]) {
            const moveX = parseInt(itemSplited[3]);
            const moveY = parseInt(itemSplited[4]);
            return {ani_id, currentX, currentY, moveX, moveY};
        }
        return {ani_id, currentX, currentY};
    });
};

let judeFormatId = (id) => {
    const idSplited = id.split(' ');
    if (idSplited[1] || id === '') {
        console.log('Invalid format.');
        return false;
    }
    return true;
};

let judeFormatDate = (date) => {
    var reg = /^(\d{4})(-|\/)(\d{2})\2(\d{2}) (\d{2}):(\d{2}):(\d{2})$/;
    if (!reg.test(date)) {
        console.log('Invalid format.');
        return false;
    }
    return true;
};

let judeFormatAnimals = (historyDataArr) => {
    const historyDataSplited = historyDataArr.split("\n");
    const animals = historyDataSplited.splice(2);
    const errFormat = animals.map(animal => {
        const everyAnimal = animal.split(' ');
        if (everyAnimal.length < 3 || everyAnimal.length > 5) {
            return animal;
        }
    });
    if (errFormat[0]) {
        console.log('Invalid format.');
        return false;
    }
    return true;
};

let judeHistoryData = (historyData) => {
    const animals = mergeAnimals(historyData);
    const errAnimals = animals.map(animal => {
        const errAnimal = getErrAnimal(animal, animals);
        if (errAnimal) {
            return errAnimal;
        }
    });
    if (errAnimals[0]) {
        console.log('Conflict found at dcfa0c7a-5855-4ed2-bc8c-4accae8bd155');
        return false;
    }
    return true;
};

let mergeAnimals = (historyData) => {
    const animalsArr = historyData.map(element => {
        return element.animals
    });
    let animals = [];
    animalsArr.map(animalEveryMoment => {
        animals = animals.concat(animalEveryMoment);
    });
    return animals;
};

let getErrAnimal = (animal, animals) => {
    const currentAnimal = animals.find(element => animal === element);
    animals = animals.splice(animals.indexOf(currentAnimal) + 1);
    const errData = animals.map(element => {
        if (element.ani_id === animal.ani_id && element.moveX) {
            if (animal.currentX != element.currentX && animal.moveX) {
                const item = {};
                item.currentX = animal.currentX + animal.moveX;
                item.currentY = animal.currentY + animal.moveY;
                const x = item.currentX === element.currentX;
                const y = item.currentY === element.currentY;
                if (!(x && y)) {
                    return element;
                }
            } else {
                const x = animal.currentX === element.currentX;
                const y = animal.currentY === element.currentY;
                if (!(x && y)) {
                    return element;
                }
            }
            animal = element;
        }
    });
    return errData.find(item => item);
};


let getAreaAnimals = (historyData, id) => {
    const spliceIdElement = historyData.find(element => element.id === id);
    historyData = historyData.splice(0, historyData.indexOf(spliceIdElement) + 1);
    const animals = mergeAnimals(historyData);
    const areaAnimals = [];
    animals.map(animal => {
        const isIncludeAnimal = areaAnimals.find(item => item.ani_id === animal.ani_id);
        if (isIncludeAnimal) {
            return;
        } else {
            const oneKindAnimal = getOneKindAnimal(animal, animals);
            areaAnimals.push(oneKindAnimal);
        }
    });
    return animalsText(areaAnimals);
};

let getOneKindAnimal = (animal, animals) => {
    const currentAnimal = animals.find(item => item === animal);
    const animalsSplited = animals.slice(animals.indexOf(currentAnimal) + 1);
    animalsSplited.map(element => {
        if (animal.ani_id === element.ani_id) {
            animal = element;
        }
    });
    if (animal.moveX) {
        const currentX = animal.currentX + animal.moveX;
        const currentY = animal.currentY + animal.moveY;
        const ani_id = animal.ani_id;
        return {ani_id, currentX, currentY}
    } else {
        return animal;
    }
};

let getSortAnimals = (areaAnimals) => {
    const areaAnimalsSort = [];
    areaAnimals.map(animal => {
        if (areaAnimals.length > 1) {

            const minAnimal = getMinAnimal(areaAnimals);
            areaAnimalsSort.push(minAnimal);
        }
        if (areaAnimals.length == 1) {
            areaAnimalsSort.push(areaAnimals[0]);
        }
    });
    return areaAnimalsSort;
};

let getMinAnimal = (areaAnimals) => {
    let minAnimal = areaAnimals[0];
    areaAnimals.map(item => {
        if (minAnimal.ani_id > item.ani_id) {
            minAnimal = item;
        }
    });
    areaAnimals.splice(areaAnimals.indexOf(minAnimal), 1);
    return minAnimal;
};

let animalsText = (areaAnimals) => {
    let animalsSort = getSortAnimals(areaAnimals);
    return animalsSort.map((item)=> {
        return `${item.ani_id} ${item.currentX} ${item.currentY}`
    }).join('\n');
};

module.exports = {
    getHistoryDataArr,
    judeFormatId,
    judeFormatDate,
    judeFormatAnimals,
    judeHistoryData,
    getAreaAnimals,
    getSnapshot
};