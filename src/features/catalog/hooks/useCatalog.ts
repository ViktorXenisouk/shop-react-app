import { create } from "zustand"

const url = process.env.REACT_APP_API_URL as string

type Cat = {
    name: string;
    path: string;
    catalogs: Cat[];
}

type Catalog = {
    catalog: Cat | null;
    isLoading: boolean;
    fetchCatalog: () => void;
};

const useCatalogStorage = create<Catalog>((set) => ({
    catalog: null,
    isLoading: false,
    fetchCatalog: async () => {
        const url = process.env.REACT_APP_API_URL as string
        const options = {
            method: "GET"
        }
        try {
            const response = await fetch(`${url}/category`, options)

            if (response.ok) {
                const result = await response.json()
                set({ catalog: result.data })
            }
        }
        catch {

        }
        finally {
            set({ isLoading: true })
        }
    },
}));