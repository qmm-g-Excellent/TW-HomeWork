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

exports.judeFormatId = (id) =>{
  const idSplited = id.split(' ');
    if(id && idSplited[1]){
        console.log('Invalid format.');
        return false;
    }
    return true;
};

