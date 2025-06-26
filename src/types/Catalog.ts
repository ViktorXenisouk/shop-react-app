type Tag ={[categoryName: string]: string[]};

type Catalog = {
    _id:string;
    name: string;
    fullPath: string;
    path: string;
    parentPath?: string;
    catalogs?: Catalog[];
    subCategories?:Catalog[];
    tags?:Tag;
    discription?:string
}

export type { Catalog ,Tag}