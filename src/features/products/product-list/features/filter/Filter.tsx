import { useMemo, useState } from "react"
import { type FilterData, type FilterParams } from "./types"
import FilterList from "./UI/FilterList"
import { useLocation, useSearchParams } from "react-router-dom"
import { Box, ButtonGroup, Button, Stack, Skeleton } from '@mui/material';
import { useRequest } from "../../../../../hooks/useRequest"
import FilterModal from "./UI/FilterModal";


type FilterTags = {
    id: string,
    type: string,
    min?: number,
    max?: number,
    value: any,
    name: any,
    enabled: boolean,
}

const Filter = ({ modalOnly }: { modalOnly?: boolean }) => {
    const [filterParams, setFilterParams] = useState<FilterParams>({ tags: [] })
    const [searchParams, setSearchParams] = useSearchParams()
    const [open, setOpen] = useState(false)

    const location = useLocation()

    const queryParams = new URLSearchParams(location.search);
    const tagsParam = queryParams.get('tags'); // строка или null

    // 2. Получаем путь после /products/
    const fullPath = location.pathname; // /products/computers/notebook/mac
    const subPath = fullPath.replace(/^\/products\//, '')

    const [isLoaded, data, error] = useRequest<FilterData>(`/category/filter/${subPath}`, { method: 'GET' })

    const addOrRemoveTag = (tag: string) => {
        setFilterParams((prev) => {
            const isThere = prev.tags.includes(tag);

            return {
                ...prev,
                tags: isThere
                    ? prev.tags.filter((v) => v !== tag)
                    : [...prev.tags, tag],
            };
        });
    }

    const onResetClick = () => {
        setFilterParams((prev) => ({
            ...prev,
            tags: [],
        }));
    }

    const onSearchClick = () => {
        searchParams.set('tags', filterParams.tags.join(','))
        setSearchParams(searchParams)
    }

    const tags = useMemo(() => {
        if (!data) {
            return []
        }
        const arr = [] as { name: string, isHor: boolean, tags: string[] }[]
        for (const key in data) {
            arr.push({ name: key, isHor: data[key].isHor, tags: data[key].tags })
        }
        return arr
    }, [data])

    const array = useMemo(() => {
        if (tags.length <= 0) {
            return (
                <Skeleton variant="rectangular" width={190} height={42} />
            )
        }
        const t = tags.slice(0, 9)
        return t.map((item) =>
            <FilterList name={item.name} tags={item.tags} direction={item.isHor ? "column" : "row"} filterParams={filterParams} addOrRemoveTag={addOrRemoveTag} />
        )

    }, [tags, filterParams, filterParams.tags])

    if (modalOnly)
        return (
            <Box>
                <FilterModal onReset={onResetClick} onSearchClick={onSearchClick} tags={tags} addOrRemoveTag={addOrRemoveTag} filterParams={filterParams} />
            </Box>
        )

    return (
        <>
            <Box sx={{ minWidth: "112px" }}>
                <Stack>
                    {array}
                    <FilterModal onReset={onResetClick} onSearchClick={onSearchClick} tags={tags} addOrRemoveTag={addOrRemoveTag} filterParams={filterParams} />
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
        </>
    )
}

export default Filter