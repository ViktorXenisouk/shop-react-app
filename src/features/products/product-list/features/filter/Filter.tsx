import { useMemo, useState } from "react"
import FilterList from "./UI/FilterList"
import FilterNumber from "./UI/FilterNumber";
import { useLocation, useSearchParams } from "react-router-dom"
import { Box, ButtonGroup, Button, Stack, Skeleton } from '@mui/material';
import { useRequest } from "../../../../../hooks/useRequest"
import FilterModal from "./UI/FilterModal";
import { Filter as FilterType, FilterItem, Variant } from "../../../../../types/catalog";
import { MyFilter } from "./types";


const Filter = ({ modalOnly }: { modalOnly?: boolean }) => {
    const [filterParams, setFilterParams] = useState<MyFilter>({ tags: [], other: {} })
    const [searchParams, setSearchParams] = useSearchParams()

    const location = useLocation()

    const fullPath = location.pathname; // /products/computers/notebook/mac
    const subPath = fullPath.replace(/^\/products\//, '')

    const [isLoaded, data, error] = useRequest<FilterType>(`/category/filter/${subPath}`, { method: 'GET' })

    const addOrRemoveTag = (tag: string) => {
        setFilterParams((prev) => {
            const isThere = prev.tags.includes(tag)

            return {
                ...prev,
                tags: isThere
                    ? prev.tags.filter((v) => v !== tag)
                    : [...prev.tags, tag],
            };
        });
    }

    const addOrRemoveField = (field: string, value: any) => {
        setFilterParams((prev) => {
            const isNull = !value || value === ''

            console.log(prev)

            if (isNull) {
                const other = { ...prev.other }
                delete other[field]
                return { ...prev, other }
            }
            else {
                const other = { ...prev.other };
                other[field] = value
                return { ...prev, other: { ...other } }
            }
        })
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
        const arr = [] as FilterItem[]
        arr.push({title:'price',props:{min:4,max:4,tags:[]},variant:'min-max'} as FilterItem)
        for (const key in data) {
            arr.push({ title: key, props: data[key].props, variant: data[key].variant })
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
            item.variant === 'tags-vertical' || item.variant=== 'tags-horizontal' ?
                <FilterList name={item.title} tags={item.props.tags} direction={item.variant === 'tags-horizontal' ? "row" : "column"} filterParams={filterParams} addOrRemoveTag={addOrRemoveTag} />
                :
                <FilterNumber id={item.title.replace(' ','_')} props={item.props} title={item.title} filter={filterParams} addOrRemoveField={addOrRemoveField} />
        )

    }, [tags, filterParams, filterParams.tags])

    if (modalOnly)
        return (
            <Box>
                <FilterModal addOrRemoveField={addOrRemoveField} onReset={onResetClick} onSearchClick={onSearchClick} data={tags} addOrRemoveTag={addOrRemoveTag} filter={filterParams} />
            </Box>
        )

    return (
        <>
            <Box sx={{ minWidth: "112px", dispaly: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'flex-start', borderRight: 'black solid 1px' }}>
                <Stack>
                    {array}
                    <FilterModal addOrRemoveField={addOrRemoveField} onReset={onResetClick} onSearchClick={onSearchClick} data={tags} addOrRemoveTag={addOrRemoveTag} filter={filterParams} />
                </Stack>
                <ButtonGroup sx={{width:'100%'}}>
                    <Button sx={{width:'50%'}} onClick={onSearchClick}>
                        Show
                    </Button>
                    <Button sx={{width:'50%'}} onClick={onResetClick}>
                        Reset Filter
                    </Button>
                </ButtonGroup>
            </Box>
        </>
    )
}

export default Filter