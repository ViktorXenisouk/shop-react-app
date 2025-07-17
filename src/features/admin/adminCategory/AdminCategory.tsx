import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { DataLoaderFromPromise } from "../../loading/Loading";
import { safeFetch } from "../../../services/safeFetch";
import { Catalog } from "../../../types/Catalog";
import { parseParams } from "../../../utils/parseParams";
import { useState } from "react";
import AdminCategoryCard from "./AdminCategoryCard";
import { ArrowBack, Add } from "@mui/icons-material"
import { Box, Stack, Button, TextField, Breadcrumbs } from "@mui/material"
import CategoryParser from './features/CategoryParser';

const A = ({ data }: { data: Catalog[] }) => {

    const [params, setParams] = useSearchParams()
    const parentPath = params.get('parentPath');

    const selectHandler = (path: string) => {
        params.set('parentPath', path)
        setParams(params)
    }

    const getIfInLastElement = () => {
        if (parentPath) {
            const parts = parentPath.split('/')

            if (parts && parts.length > 0 && parts[0] != '#root') {
                return false
            }
            else {
                return true
            }
        }
        return true
    }

    const backHandler = () => {
        if (parentPath) {
            const parts = parentPath.split('/')

            if (parts && parts.length > 0 && parts[0] != '#root') {
                parts.pop()
                if (parts.length == 0) {
                    params.set('parentPath', '#root')
                    setParams(params)
                    return
                }
                params.set('parentPath', parts.join('/'))
                setParams(params)
            }
            else {
                alert('you are on first segment')
            }
        }
    }

    return (
        <Box>
            <CategoryParser category={parentPath || ''} />
            <Button disabled={getIfInLastElement()} startIcon={<ArrowBack />} onClick={backHandler}>Back</Button>
            <Stack direction='column'>
                {data.map((body) => <AdminCategoryCard body={body} onSelect={selectHandler} />)}
            </Stack>

        </Box>

    )
}

const AdminCategory = () => {
    const navigate = useNavigate()
    const [params, setParams] = useSearchParams()

    const addHandler = () => {
        const u = `/admin/categories/create/${encodeURIComponent(params.get('parentPath') || '')}`
        navigate(u)
    }

    const location = useLocation()

    const options: RequestInit = {}
    options.method = 'GET'

    const url = `/category/find/${parseParams(location.search, ['parentPath'])}`

    console.log(url)

    const res = safeFetch<Catalog[]>(url, options)

    return (
        <Box>
            <DataLoaderFromPromise res={res} page={A} />
            <Button endIcon={<Add />} onClick={addHandler}>Add</Button>
        </Box>
    )
}

export default AdminCategory