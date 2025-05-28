interface Product {
    _id: string;
    name: string;
    category: string;
    tags?: string[];
    imageURL: string;
}

export type {Product}