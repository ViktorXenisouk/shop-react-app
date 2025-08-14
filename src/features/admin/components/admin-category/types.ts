import { FilterItem } from "../../../../types/catalog"

type Body = { 
    filter: FilterItem[];
    parentPath: string;
    name: string;
    discription: string; 
    path: string;
}


export type {Body}