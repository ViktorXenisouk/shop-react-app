import { useEffect, useState } from "react"
import style from "./UI/FilterBlock.module.css"
import { DataLoaderFromPromise } from "../loading/Loading"
import { type FilterData } from "./types"
import FilterList from "./UI/FilterList"
import { safeFetch } from "../../services/safeFetch"
import { useLocation, useSearchParams } from "react-router-dom"

import { Box, ButtonGroup, Button, Stack } from "@mui/material"


const MyFilter = ({ data }: { data: any }) => {
    const [searchParams, setSearchParams] = useSearchParams()
    const [event] = useState(new Event('restart-filter'))

    const onResetClick = () => {
        document.dispatchEvent(event)
    }

    const onSearchClick = () => {
        const tags = [] as string[]
        const elements = document.querySelectorAll(`input[type="radio"]`)
        console.log(elements)
        for (let i = 0; i < elements.length; i++) {
            const el = elements.item(i) as HTMLInputElement | null
            if (!el || el.checked === false || !el.classList.contains(style.input))
                continue
            const value = el.value
            console.log(el)
            tags.push(value)
        }
        searchParams.set('tags', tags.join(','))
        setSearchParams(searchParams)
    }

    const getFilters = () => {
        const arr = []
        for (const key in data) {
            arr.push({ name: key, isHor: data[key].isHor, tags: data[key].tags })
        }
        return arr.map((item) => !item.isHor ?
            <FilterList name={item.name} tags={item.tags} direction="column" /> :
            <FilterList name={item.name} tags={item.tags} direction="row" />)
    }

    return (
        <Box sx={{ minWidth: "112px" }}>
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

    const res = safeFetch<FilterData[]>(`/category/filter/${subPath}`, { method: 'GET' })

    return (
        <DataLoaderFromPromise page={MyFilter} res={res} />
    )
}

export default Filter