import React from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { DataLoaderFromPromise } from "../../../loading/Loading";
import { safeFetch } from "../../../../services/safe-fetch";
import { parseParams } from "../../../../utils/parseParams";
import AdminCategoryCard from "./components/AdminPlayListCard";
import { ArrowBack, Add } from "@mui/icons-material"
import { Box, Stack, Button, TextField, Breadcrumbs } from "@mui/material"
import { PlayList } from '../../../../types/play-list';
import CategoryParser from './components/CategoryParser';

const Render : React.FC<{data:PlayList[]}> = ({ data }) => {

    const [params, setParams] = useSearchParams()
    const parentPath = params.get('parentPath');

    console.log(data)

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

const AdminCategory : React.FC = () => {
    const navigate = useNavigate()
    const [params, setParams] = useSearchParams()

    const addHandler = () => {
        const u = `/admin/play-list/create/${encodeURIComponent(params.get('parentPath') || '')}`
        navigate(u)
    }

    const location = useLocation()

    const options: RequestInit = {}
    options.method = 'GET'

    const url = `/play-list/find/${parseParams(location.search, ['parentPath'])}`

    const res = safeFetch<PlayList[]>(url, options)

    return (
        <Box>
            <DataLoaderFromPromise res={res} page={Render} />
            <Button endIcon={<Add />} onClick={addHandler}>Add</Button>
        </Box>
    )
}

export default AdminCategory