import {Tag,Tags} from "./tags"

type Variant = 'number'|'min-max'|'tags-horizontal'|'tags-vertical'

type CategoryProps = {min:number,max:number,tags:string[]}

type Filter = { [title: string]: { variant:Variant, props:CategoryProps } }

type FilterItem = {
    title: string,
    props: CategoryProps,
    variant: Variant
}

type Catalog = {
    _id:string;
    name: string;
    fullPath: string;
    path: string;
    parentPath?: string;
    catalogs?: Catalog[];
    subCategories?:Catalog[];
    filter?:Filter
    discription?:string
}

export type { Catalog,Filter,Variant,CategoryProps,FilterItem}