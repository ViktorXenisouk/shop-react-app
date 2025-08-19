import { create } from "zustand"
import { Catalog } from "../../../../../types/catalog";
import { autoSaveFetch } from "../../../../../services/safe-fetch";
import { PlayList } from "../../../../../types/play-list";

type CatalogStorage = {
    catalog: ((Catalog | PlayList) & { isPlaylist?: boolean })[] | null | undefined;
    isLoading: boolean;
    fetchCatalog: () => void;
};

const addFieldIntoPlayLists = (playLists: PlayList[]) => {
    return playLists.map((item) => {
        return { ...item, isPlaylist: true } as PlayList & { isPlaylist?: boolean }
    })
}

const useCatalogStorage = create<CatalogStorage>((set) => ({
    catalog: null,
    playlists: null,
    isLoading: false,
    fetchCatalog: async () => {
        set({ isLoading: true })

        const result = await autoSaveFetch<Catalog[]>('/category', { method: 'GET' })

        const result2 = await autoSaveFetch<PlayList[]>('/play-list/root', { method: 'GET' })

        if (!result.data || !result2.data)
            return

        const all: ((Catalog | PlayList) & { isPlaylist?: boolean })[] = [
            ...result.data,
            ...addFieldIntoPlayLists(result2.data),
        ]

        if (result.success && result.data) {
            set({ catalog: all, isLoading: false })
        }
    },
}));

export { useCatalogStorage }