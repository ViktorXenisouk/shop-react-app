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
        spacing={0}
            sx={{ backgroundColor: '#f5f5f5', p: 0,m:0,pt:'5px' }}
        >
            {!store.isLoading && store.catalog ? store.catalog.map((item, i) => (
                <CatalogCard
                    key={item.fullPath}
                    isActive={currentId === i}
                    catalogIndex={i}
                    setCurrentId={onCurrentIndexUpdate}
                >
                    {item.name}
                </CatalogCard>
            )) : null}
        </Stack>
    );
};

export default CatalogMenu;