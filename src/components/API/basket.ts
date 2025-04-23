type BasketInfo = {
    id:string;
    count:number;
}

const getBasketInfo = async() : Promise<BasketInfo[]> => {
    return [{id:'0',count:10},{id:'4',count:8},{id:'7',count:1}]
}

export {getBasketInfo,type BasketInfo}