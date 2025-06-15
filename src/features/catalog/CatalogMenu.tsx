import { useState } from "react"
import CatalogCard from "./CatalogCard"
import { Stack } from "@mui/material"
import { useCatalogStorage } from "./hooks/useCatalog";


const CatalogMenu = ({ currentId, onCurrentIndexUpdate } : {currentId:number,onCurrentIndexUpdate:any}) => {
    const store = useCatalogStorage()

    if(!store.isLoading && !store.catalog){
        store.fetchCatalog()
    }
    return (
        <Stack
            sx={{ backgroundColor: '#f5f5f5', padding: 2 }}
        >
            {!store.isLoading && store.catalog ? store.catalog.map((item, i) => (
                <CatalogCard
                    key={i}
                    isActive={currentId === i}
                    catalogIndex={i}
                    setCurrentId={onCurrentIndexUpdate}
                >
                    {item.name}
                </CatalogCard>
            )) : ''}
        </Stack>
    );
};

export default CatalogMenu;