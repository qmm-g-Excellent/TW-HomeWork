exports.getHistoryDataArr = (history)=> {

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

exports.judeFormatId = (id) => {
    const idSplited = id.split(' ');
    if (idSplited[1] || id === '') {
        console.log('Invalid format.');
        return false;
    }
    return true;
};

exports.judeFormatDate = (date) => {
    var reg = /^(\d{4})(-|\/)(\d{2})\2(\d{2}) (\d{2}):(\d{2}):(\d{2})$/;
    if (!reg.test(date)) {
        console.log('Invalid format.');
        return false;
    }
    return true;
};

exports.judeFormatAnimals = (historyDataArr) => {
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

exports.judeHistoryData = (historyData) => {
    const animalsArr = historyData.map(element => {
        return element.animals
    });
    let animals = [];
    animalsArr.map(animalEveryMoment => {
        animals = animals.concat(animalEveryMoment);
    });
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


