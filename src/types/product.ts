import { type ArticleBlock } from "./article";

interface Product {
    _id: string;
    name: string;
    category: string;
    tags?: string[];
    imgs: {name:string,url:string}[];
    discription:string;
    blocks:ArticleBlock[]
}

export type {Product}