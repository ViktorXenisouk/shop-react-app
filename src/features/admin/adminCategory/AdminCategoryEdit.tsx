import { useParams } from 'react-router-dom';
import { useState } from 'react';
import CategoryListTagsManager from '../../input/CategoryListTagsManager';
import { useAdminAuthStore } from '../../../store/useAdmin';
import { editCategory } from './api';
import { DataLoaderFromPromise } from '../../loading/Loading';
import { safeFetch } from '../../../services/safeFetch';
import { Tags } from '../../input/types';
import { Catalog, Tag } from '../../../types/catalog';
import { Link } from 'react-router-dom';
import { Box, TextField, Button, Stack, Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import { inputBodyHandler } from '../../../utils/inputHandler';
import {Save} from "@mui/icons-material"


const A = ({ data }: { data: Catalog }) => {
    const store = useAdminAuthStore()

    const [loading,setLoading] = useState(false)
    const [body, setBody] = useState<{ tags: Tag, name: string, discription: string, path: string }>({ tags: data.tags || {}, name: data.name || '', discription: data.discription || '', path: data.path || '' })

    const submitHandler = async () => {
        setLoading(true)
        await editCategory(body, data._id, store.token);
        setLoading(false)
    }

    const pathHandler = inputBodyHandler(setBody,(prev,v) => prev.path = v)

    const parseTags = (tag: Tag) => {
        const arr = [] as Tags[]
        for (let name in tag) {
            arr.push({ name: name, tags: tag[name] })
        }
        return arr
    }

    const tagsHandler = (value: Tags[]) => {
        setBody((prev) => {

            let obj = {} as any
            if (value && value.length > 0) {
                value.forEach((v) => {
                    obj[v.name] = v.tags
                })
                value = obj
            }
            else {
                value = {} as []
            }

            prev.tags = obj
            return prev
        })
    }

    const nameHandler = inputBodyHandler(setBody,(prev,v) => prev.name = v)

    const discriptionHandler = inputBodyHandler(setBody,(prev,v) => prev.discription = v)

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
                        <CategoryListTagsManager onChange={tagsHandler} defaultValue={parseTags(body.tags)} />
                    </AccordionDetails>
                </Accordion>
            </Stack>
            <Button loading={loading} startIcon={<Save/>} onClick={submitHandler}>Save</Button>
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