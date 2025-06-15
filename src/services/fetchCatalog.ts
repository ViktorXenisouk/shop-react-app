import { safeFetch } from "./safeFetch"

type CatalogData = {
    name: string;
    fullPath: string;
    discription: string;
    catalogs?: CatalogData[];
    tags:string[]
}

const fetchCatalog = async () => {
    const options = {
        method: "GET"
    }
    const res = await safeFetch<CatalogData[]>('/category', options)

    return res
}