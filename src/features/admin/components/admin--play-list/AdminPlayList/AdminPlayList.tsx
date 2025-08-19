import React from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { DataLoaderFromPromise } from "../../../../loading";
import { safeFetch } from "../../../../../services/safe-fetch";
import { parseParams } from "../../../../../utils/parseParams";
import { Add } from "@mui/icons-material"
import { Box, Button } from "@mui/material"
import { PlayList } from '../../../../../types/play-list';
import Loader from './Loader';

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
            <DataLoaderFromPromise res={res} page={Loader} />
            <Button endIcon={<Add />} onClick={addHandler}>Add</Button>
        </Box>
    )
}

export default AdminCategory