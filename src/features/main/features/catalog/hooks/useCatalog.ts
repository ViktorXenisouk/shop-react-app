import { create } from "zustand"
import { Catalog } from "../../../../../types/catalog";
import { safeFetch } from "../../../../../services/safeFetch";

type CatalogStorage = {
    catalog: Catalog[] | null | undefined;
    isLoading: boolean;
    fetchCatalog: () => void;
};

const useCatalogStorage = create<CatalogStorage>((set) => ({
    catalog: null,
    isLoading: false,
    fetchCatalog: async () => {
        set({isLoading:true})
        const requestInit: RequestInit = {}
        requestInit.method = 'GET'
    
        const result = await safeFetch<Catalog[]>('/category',requestInit)

        set({catalog:result.data,isLoading:false})
    },
}));

export {useCatalogStorage}