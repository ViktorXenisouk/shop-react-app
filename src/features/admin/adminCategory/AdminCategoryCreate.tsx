import { Box, Stack, TextField, Button } from "@mui/material"
import { useParams } from "react-router-dom"
import { useState } from "react"
import { Tags } from "../../input/types"
import { createCategory } from "./api"
import { useAdminAuthStore } from "../../../store/useAdmin"
import CategoryListTagsManager from "../../input/CategoryListTagsManager"
import { Link } from "react-router-dom"

const AdminCategoryCreate = () => {
    const params = useParams()

    const parentPath = params.id ? decodeURIComponent(params.id) : '#root'

    const store = useAdminAuthStore()

    const parentPathString = parentPath === '#root' ? 'root' : parentPath;

    const [body, setBody] = useState<{ tags: Tags[], parentPath: string, name: string, discription: string, path: string }>({ tags: [], parentPath: parentPath, name: '', discription: '', path: '' })

    const submitHandler = () => {
        createCategory(body, store.token);
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

    const tagsHandler = (value: Tags[]) => {
        setBody((prev) => {
            prev.tags = value
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
            <Button component={Link} to={`/admin/categories/search/?parentPath=${encodeURIComponent(parentPath)}`}>Back</Button>
            <Stack direction='column'>
                <TextField onChange={(event) => parentPathHandler(event.target.value)} disabled label='parent path' value={parentPathString} />
                <TextField onChange={(event) => pathHandler(event.target.value)} label='path' />
                <TextField onChange={(event) => nameHandler(event.target.value)} label='name' />
                <TextField onChange={(event) => discriptionHandler(event.target.value)} label='discription' />
                <CategoryListTagsManager onChange={tagsHandler} />
            </Stack>
            <Button onClick={submitHandler}>Submit</Button>
        </Box>
    )
}

export default AdminCategoryCreate