import { Box, Stack, TextField, Button, Paper } from "@mui/material"
import { useParams } from "react-router-dom"
import { useState } from "react"
import { useAdminAuthStore } from "../../../../../store/useAdmin"
import CategoryListTagsManager from "../components/FilterEditor"
import { Link } from "react-router-dom"
import { Filter, FilterItem } from "../../../../../types/catalog"
import { Catalog } from "../../../../../types/catalog"
import { FilterToFilterItems } from "../utils"
import { Body } from "../types"

const CategoryUpdateOrCreateForm = ({ onSubmit, data, parentPath }: { onSubmit: (body: Body) => Promise<void>, data?: Catalog, parentPath?: string }) => {
    const ph = parentPath ? parentPath : data?.parentPath ? data.parentPath : '#root'

    const getParsedPH = (ph: string) => {
        return ph === '#root' ? 'root' : ph;
    }

    const [body, setBody] = useState<Body>(
        {
            filter: data?.filter ? FilterToFilterItems(data.filter) : [],
            parentPath: ph,
            name: data?.name ?? '',
            discription: data?.discription ?? '',
            path: data?.path ?? ''
        })

    const submitHandler = async () => {
        onSubmit?.(body)
    }

    const parentPathHandler = (value: string) => {
        setBody((prev) => {
            prev.parentPath = value
            return prev
        })
    }

    const pathHandler = (value: string) => {
        setBody((prev) => {
            prev.path = value
            return prev
        })
    }

    const tagsHandler = (filter: FilterItem[]) => {
        setBody((prev) => {
            prev.filter = filter
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
        <Box sx={{ mt: '80px',width:'100%',display:'flex',justifyContent:'center' }}>
            <Paper sx={{width:'800px'}}>
                <Button component={Link} to={`/admin/categories/search/?parentPath=${encodeURIComponent(ph)}`}>Back</Button>
                <Stack direction='column'>
                    <TextField onChange={(event) => parentPathHandler(event.target.value)} disabled label='parent path' value={getParsedPH(ph)} />
                    <TextField onChange={(event) => pathHandler(event.target.value)} label='path' />
                    <TextField onChange={(event) => nameHandler(event.target.value)} label='name' />
                    <TextField onChange={(event) => discriptionHandler(event.target.value)} label='discription' />
                    <CategoryListTagsManager onChange={tagsHandler} />
                </Stack>
                <Button onClick={submitHandler}>Submit</Button>
            </Paper>
        </Box>
    )
}

export default CategoryUpdateOrCreateForm