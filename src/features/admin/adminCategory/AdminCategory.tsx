import { Box, Stack, Button, TextField } from "@mui/material"
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { DataLoaderFromPromise } from "../../loading/Loading";
import { safeFetch } from "../../../services/safeFetch";
import { Catalog } from "../../../types/Catalog";
import { parseParams } from "../../../utils/parseParams";
import { useState } from "react";
import AdminCategoryCard from "./AdminCategoryCard";
import { useMyParams } from "../../../hooks/useParams";

const A = ({ data }: { data: Catalog[] }) => {

    const params = useMyParams('/admin/categories/search/')
    const parentPath = params.get('parentPath');

    const selectHandler = (path: string) => {
        params.set('parentPath',path)
    }

    const backHandler = () => {
        if (parentPath) {
            const parts = parentPath.split('/')

            if (parts && parts.length > 0 && parts[0] != ' ') {
                parts.pop()
                if (parts.length == 0) {
                    params.set('parentPath','#root')
                    return
                }
                params.set('parentPath',parts.join('/'))
            }
            else {
                alert('you are on first segment')
            }
        }
    }

    return (
        <Box>
            <Button onClick={backHandler}>Back</Button>
            <Stack direction='column'>
                {data.map((body) => <AdminCategoryCard body={body} onSelect={selectHandler} />)}
            </Stack>

        </Box>

    )
}

const AdminCategory = () => {
    const navigate = useNavigate()
    const params = useMyParams('/admin/categories/search/')

    const [body, setBody] = useState<{}>()

    const onSubmit = () => {

    }

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
        <>
            <Box>
                <Stack direction='column'>
                    <Button>Submit</Button>
                </Stack>

            </Box>
            <Box>
                <DataLoaderFromPromise res={res} page={A} />
            </Box>
            <Button onClick={addHandler}>Add</Button>
        </>
    )
}

export default AdminCategory