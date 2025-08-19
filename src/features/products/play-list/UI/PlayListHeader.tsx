import React from "react"
import { Box, useMediaQuery, useTheme } from "@mui/material"
import { DataLoaderFromPromiseSimple } from "../../../loading"
import { autoSaveFetch } from "../../../../services/safe-fetch"
import type { PlayList } from "../../../../types/play-list"
import { useSearchParams } from "react-router-dom"
import CategoryParser from "../../../../UI/CategoryParser"
import ViewSwitcher from "../../features/header/UI/ViewSwitcher"
import SortSwitcher from "../../../../UI/SortSwitcher"
import type { ViewType } from "../../types"
import ProductHeaderCategories from "../../features/header/ProductHeaderCategories"

type Props = {
    subPath:string
}

const PlayListHeader : React.FC<Props> = ({ subPath }) => {
    const res = autoSaveFetch<PlayList>(`/play-list/subpath/${subPath}`, { method: 'GET' })

    const theme = useTheme()
    const isSmall = useMediaQuery(theme.breakpoints.down('sm'))

    const [searchParams, setSearchParams] = useSearchParams()

    const onChange = (value: ViewType) => {
        searchParams.set('view', value)
        setSearchParams(searchParams)
    }

    return (
        <Box sx={{ borderBottom: '1px solid #ccc', mb: '10px' }}>
            <CategoryParser root="play-list" category={subPath} renderMain />
            <DataLoaderFromPromiseSimple res={res} page={ProductHeaderCategories} />
            {
                !isSmall ?
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' ,mx:'30px'}}>
                        <SortSwitcher />
                        <ViewSwitcher onChange={onChange} />
                    </Box>
                    :
                    <Box sx={{ mt: '20px' }}>
                        <SortSwitcher fullWidth />
                    </Box>
            }
        </Box >
    )
}

export default PlayListHeader