import { useEffect, useState } from "react"
import filterBlockStyle from "./UI/FilterBlock.module.css"
import style from "./Filter.module.css"
import { DataLoaderFromPromise } from "../loading/Loading"
import { type FilterData } from "./types"
import FilterList from "./UI/FilterList"
import { safeFetch } from "../../services/safeFetch"
import { useLocation } from "react-router-dom"
import { useNavigate } from "react-router-dom"

import { Box, ButtonGroup, Button, Stack } from "@mui/material"


const MyFilter = ({ data }: { data: any }) => {
    const [event] = useState(new Event('restart-filter'))
    const location = useLocation()
    const navigate = useNavigate()
    const fullPath = location.pathname; // /products/computers/notebook/mac
    const subPath = fullPath.replace(/^\/products\//, '')

    const onResetClick = () => {
        document.dispatchEvent(event)
        console.log('on restart')
    }

    const onSearchClick = () => {
        const tags = [] as string[]
        const elements = document.getElementsByClassName(filterBlockStyle['input'])
        for (let i = 0; i < elements.length; i++) {
            const el = elements.item(i) as HTMLInputElement | null
            if (!el || el.checked === false)
                continue
            tags.push(el.value)
        }


        navigate(`/?tags=${tags.join(',')}`)
    }

    const getFilters = () => {
        const arr = []
        for (const key in data) {
            console.log(key)
            arr.push({ name: key, isHor: data[key].isHor, tags: data[key].tags })
        }
        return arr.map((item) => !item.isHor ?
            <FilterList name={item.name} tags={item.tags} direction="column"/> :
            <FilterList name={item.name} tags={item.tags} direction="row"/>)
    }

    return (
            <Box>
                <Stack>
                    {getFilters()}
                </Stack>
                <ButtonGroup>
                    <Button onClick={onSearchClick}>
                        Show
                    </Button>
                    <Button onClick={onResetClick}>
                        Reset Filter
                    </Button>
                </ButtonGroup>
            </Box>
    )
}

const Filter = () => {
    const location = useLocation()

    const queryParams = new URLSearchParams(location.search);
    const tagsParam = queryParams.get('tags'); // строка или null

    // 2. Получаем путь после /products/
    const fullPath = location.pathname; // /products/computers/notebook/mac
    const subPath = fullPath.replace(/^\/products\//, '')

    console.log(subPath)

    const requestInit: RequestInit = {}
    requestInit.method = 'GET'

    const res = safeFetch<FilterData[]>(`/category/filter/${subPath}`, requestInit)

    return (
        <DataLoaderFromPromise page={MyFilter} res={res} />
    )
}

export default Filter