import { useParams } from 'react-router-dom';
import { useState } from 'react';
import CategoryListTagsManager from '../../UI/CategoryListTagsManager';
import { useAdminAuthStore } from '../../../../store/useAdmin';
import { editCategory } from './api';
import { DataLoaderFromPromise } from '../../../loading/Loading';
import { safeFetch } from '../../../../services/safe-fetch';
import { Tag, Tags } from '../../../../types/tags';
import { Catalog, Filter, CategoryProps, Variant } from '../../../../types/catalog';
import { Link } from 'react-router-dom';
import { Box, TextField, Button, Stack, Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import { inputBodyHandler } from '../../../../utils/inputHandler';
import { Save } from "@mui/icons-material"

type FilterItem = {
    title: string,
    props: CategoryProps,
    variant: Variant
}


const A = ({ data }: { data: Catalog }) => {
    const store = useAdminAuthStore()

    const [loading, setLoading] = useState(false)
    const getFilter = () => {
        if (data.filter) {
            const array = [] as FilterItem[]
            for (const field in data.filter) {
                const { props, variant } = data.filter[field]
                array.push({ props, variant, title: field })
            }
            return array
        }
        return []
    }
    const [body, setBody] = useState<{ filter: FilterItem[], name: string, discription: string, path: string }>({ filter: getFilter(), name: data.name || '', discription: data.discription || '', path: data.path || '' })

    const submitHandler = async () => {
        setLoading(true)
        await editCategory(body, data._id, store.token);
        setLoading(false)
    }

    const pathHandler = inputBodyHandler(setBody, (prev, v) => prev.path = v)

    const tagsHandler = (filterItem:FilterItem[]) => {
        setBody((prev) => {
            prev.filter = filterItem
            return prev
        })
    }

    const nameHandler = inputBodyHandler(setBody, (prev, v) => prev.name = v)

    const discriptionHandler = inputBodyHandler(setBody, (prev, v) => prev.discription = v)

    return (
        <Box sx={{ mt: '80px' }}>
            <Button component={Link} to={`/admin/categories/search/?parentPath=${data.parentPath ?? '%23root'}`}>Back</Button>
            <Stack direction='column'>
                <TextField disabled label='fullpath' value={data.fullPath} />
                <TextField disabled label='parent path' value={data.parentPath ?? 'root'} />
                <TextField onChange={pathHandler} placeholder={body.path} defaultValue={body.path} label='path' />
                <TextField onChange={nameHandler} placeholder={body.name} defaultValue={body.name} label='name' />
                <TextField multiline onChange={discriptionHandler} placeholder={body.discription} defaultValue={body.discription} label='discription' />
                <Accordion>
                    <AccordionSummary>
                        Tags
                    </AccordionSummary>
                    <AccordionDetails>
                        <CategoryListTagsManager onChange={tagsHandler} defaultValue={body.filter} />
                    </AccordionDetails>
                </Accordion>
            </Stack>
            <Button loading={loading} startIcon={<Save />} onClick={submitHandler}>Save</Button>
        </Box>
    )
}

const AdminCategoryEdit = () => {
    const store = useAdminAuthStore()

    const params = useParams()

    const id = params.id as string

    const options: RequestInit = {}
    options.method = "GET"
    options.headers = {
        'Authorization': `Bearer ${store.token}`,
    }
    const res = safeFetch<Catalog>(`/category/${id}`, options)

    return (
        <DataLoaderFromPromise res={res} page={A} />
    )
}

export default AdminCategoryEdit