import { ITEM_DATA,type ItemData } from './itemsData'
import { FILTER_DATA } from './filterData'
import { CATALOG_DATA } from './catalog.data'
import {getBasketInfo} from "./basket"

type Options = {
    name?: string;
    category?: string;
    tags?:string[];
    page?: number;
    count?: number;
}

const getAllItemsData = async(options:Options) => {
return ITEM_DATA 
}

const getAllItemDatasAndBasket = async(options:Options) => {
    let items = await getAllItemsData(options);
    const busket = await getBasketInfo();

    items = items.map((item) => {
        const b = busket.find((v) => v.id === item.id)
        if(b){
            return {...item,count:b.count};
        }
        return {...item,count:0}
    })
    return items
}

const getItemById = async(id:number) : Promise<ItemData> => {
    return ITEM_DATA[id]
}

const getFilterDataByCategory = async() => {
    return FILTER_DATA
}

export {getAllItemsData,getFilterDataByCategory,getItemById,getAllItemDatasAndBasket}