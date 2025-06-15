import { useParams } from 'react-router-dom';
import { Box, TextField, Button, Stack } from '@mui/material';
import { useState } from 'react';
import CategoryListTagsManager from './UI/CategoryListTagsManager';
import { useAdminAuthStore } from '../../../store/useAdmin';
import { editCategory } from './api';
import { DataLoaderFromPromise } from '../../loading/Loading';
import { safeFetch } from '../../../services/safeFetch';
import { Tags } from './type';
import { Catalog, Tag } from '../../../types/Catalog';
import { Link } from 'react-router-dom';


const A = ({ data }: { data: Catalog }) => {
    const store = useAdminAuthStore()

    const [body, setBody] = useState<{ tags: Tag, name: string, discription: string, path: string }>({ tags: data.tags || {}, name: data.name || '', discription: data.discription || '', path: data.path || '' })

    const submitHandler = () => {
        console.log(body)
        editCategory(body,data._id, store.token);
    }

    const pathHandler = (value: string) => {
        setBody((prev) => {
            prev.path = value
            return prev
        })
    }

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

    const nameHandler = (value: string) => {
        setBody((prev) => {
            prev.name = value
            return prev
        })
    }

    const discriptionHandler = (value: string) => {
        setBody((prev) => {
            prev.discription = value
            return prev
        })
    }

    return (
        <Box sx={{ mt: '80px' }}>
            <Button component={Link} to={`/admin/categories/search/?parentPath=${data.parentPath ?? '%23root'}`}>Back</Button>
            <Stack direction='column'>
                <TextField disabled label='fullpath' value={data.fullPath}/>
                <TextField disabled label='parent path' value={data.parentPath ?? 'root'} />
                <TextField onChange={(event) => pathHandler(event.target.value)} placeholder={body.path} defaultValue={body.path} label='path' />
                <TextField onChange={(event) => nameHandler(event.target.value)} placeholder={body.name} defaultValue={body.name} label='name' />
                <TextField onChange={(event) => discriptionHandler(event.target.value)} placeholder={body.discription} defaultValue={body.discription} label='discription' />
                <CategoryListTagsManager onChange={tagsHandler} defaultValue={parseTags(body.tags)} />
            </Stack>
            <Button onClick={submitHandler}>Submit</Button>
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