import { useState } from "react"
import { CATALOG_DATA } from "./api/catalog.data"
import CatalogCard from "./CatalogCard"
import { Stack } from "@mui/material"


const CatalogMenu = ({ currentId, onCurrentIndexUpdate } : {currentId:number,onCurrentIndexUpdate:any}) => {
    return (
        <Stack
            sx={{ backgroundColor: '#f5f5f5', padding: 2 }}
        >
            {CATALOG_DATA.map((item, i) => (
                <CatalogCard
                    key={i}
                    isActive={currentId === i}
                    catalogIndex={i}
                    setCurrentId={onCurrentIndexUpdate}
                >
                    {item.name}
                </CatalogCard>
            ))}
        </Stack>
    );
};

export default CatalogMenu;