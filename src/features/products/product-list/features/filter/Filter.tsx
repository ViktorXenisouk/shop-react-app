import { useMemo, useState } from "react"
import { useLocation, useSearchParams } from "react-router-dom"
import { useRequest } from "../../../../../hooks/useRequest"
import { Filter as FilterType, FilterItem } from "../../../../../types/catalog";
import { MyFilter } from "./types";

import FilterView from "./FilterView";


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

    return (
        <FilterView 
        modalOnly={modalOnly} 
        addOrRemoveField={addOrRemoveField} 
        addOrRemoveTag={addOrRemoveTag} 
        onResetClick={onResetClick} 
        onSearchClick={onSearchClick} 
        tags={tags} 
        filterParams={filterParams}/>
    )
}

export default Filter