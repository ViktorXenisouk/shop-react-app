import { type Category } from "./index"
import { CatalogData, CATALOG_DATA } from "./catalog.data"

type ItemData = {
    id: string;
    name: string;
    category: Category;
    tags?: string[];
    imageURL: string;
    count?: number
}

let ITEM_DATA: ItemData[] = [
]

const names = ['PlayStation', 'XBox', 'IPhone', 'Xiaomi']

const prefix = ['4', '5', 'X', '14', '15', '16', 'Premium']

function* generator(cat: CatalogData[]) {
    for (let i = 0; i < cat.length; i++) {
        const u = cat[i].catalogs
        yield cat[i].path
        if(u){
            for (let j = 0; j < u.length; j++) {
                yield u[j].path;
            }
        }
    }
}

const generatorA = generator(CATALOG_DATA)

let id = 0

for (let i = 0; i < names.length; i++) {
    for (let j = 0; j < prefix.length; j++) {
        const category = generatorA.next().value as Category
        ITEM_DATA.push({
            id: `${id}`,
            name: (names[i] + ' ' + prefix[j]),
            category: category,
            imageURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmqfYB4D3aqQcH4HpWAQKcD5Hgx4jbs7HCciF9-UlXn9VV6J28rAtu1W8emao&s',
            tags: ['pc', 'console']
        })
        id++
    }
}

export { ITEM_DATA, type ItemData }