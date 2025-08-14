import React, { useState } from "react"
import CatalogCard from "./UI/CatalogCard"
import { Stack } from "@mui/material"
import { useCatalogStorage } from "../hooks/useCatalog";

type Props = {
    currentId: number,
    onCurrentIndexUpdate: any,
    onMouseOut?: React.Dispatch<React.SetStateAction<boolean>>
}

const CatalogMenu: React.FC<Props> = ({ currentId, onCurrentIndexUpdate, onMouseOut }) => {
    const store = useCatalogStorage()

    if (!store.isLoading && !store.catalog) {
        store.fetchCatalog()
    }
    return (
        <Stack
            spacing={0}
            sx={{
                bgcolor: 'background.paper',
                p: 0,
                m: 0,
                pt: '5px',
                height: '100%',
                borderRightWidth: '1px',
                borderRightStyle: 'solid',
                borderRightColor: 'divider'
            }}
            component='div'
            onMouseOut={() => onMouseOut && onMouseOut(false)}
            onMouseOver={() => onMouseOut && onMouseOut(true)}
        >
            {!store.isLoading && store.catalog ? store.catalog.map((item, i) => (
                <CatalogCard
                    isPlaylist={item.isPlaylist}
                    fullPath={item.fullPath}
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