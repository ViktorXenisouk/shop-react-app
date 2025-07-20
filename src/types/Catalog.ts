import {Tag,Tags} from "./tags"

type Catalog = {
    _id:string;
    name: string;
    fullPath: string;
    path: string;
    parentPath?: string;
    catalogs?: Catalog[];
    subCategories?:Catalog[];
    tags?:Tags;
    discription?:string
}

export type { Catalog}