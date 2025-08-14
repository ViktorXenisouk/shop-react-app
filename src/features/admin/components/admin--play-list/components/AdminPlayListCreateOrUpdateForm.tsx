import React from "react"
import { Box, Stack, TextField, Button,Paper } from "@mui/material"
import { useState } from "react"
import { Link } from "react-router-dom"
import { Body } from "../types"
import { PlayList } from "../../../../../types/play-list"
import TagsInput from "../../../UI/TagsInput"
import AdminSearchProductsModal from "../features/SearchProducts/AdminSearchProductsModal"

type Props = { 
    onSubmit: (body: Body) => Promise<void>, 
    data?: PlayList, 
    parentPath?: string }

const CategoryUpdateOrCreateForm : React.FC<Props> = ({ onSubmit, data, parentPath } ) => {
    const ph = parentPath ? parentPath : data?.parentPath ? data.parentPath : '#root'

    const [loading, setLoading] = useState(false)

    const getParsedPH = (ph: string) => {
        return ph === '#root' ? 'root' : ph;
    }

    const [body, setBody] = useState<Body>(
        {
            name: data?.name ?? '',
            parentPath: ph,
            path: data?.path ?? '',
            discription: data?.discription ?? '',
            tags: data?.tags ?? [],
            ids: data?.ids ?? []
        })

    const submitHandler = async () => {
        setLoading(true)
        await onSubmit?.(body)
        setLoading(false)
    }

    const parentPathHandler = (value: string) => {
        setBody((prev) => {
            prev.parentPath = value
            return { ...prev }
        })
    }

    const pathHandler = (value: string) => {
        setBody((prev) => {
            prev.path = value
            return { ...prev }
        })
    }

    const tagsHandler = (tags?: string[]) => {
        setBody((prev) => {
            prev.tags = tags ?? []
            return { ...prev }
        })
    }

    const titleHandler = (value: string) => {
        setBody((prev) => {
            prev.name = value
            return { ...prev }
        })
    }

    const discriptionHandler = (value: string) => {
        setBody((prev) => {
            prev.discription = value
            return { ...prev }
        })
    }

    const idsHandler = (value: string[]) => {
        setBody((prev) => {
            prev.ids = [...value]
            return { ...prev }
        })
    }

    return (
        <Box sx={{ mt: '80px', display:'flex',justifyContent:'center' }}>
            <Paper sx={{width:'600px',p:'30px'}}>
                <Button component={Link} to={`/admin/play-list/search/?parentPath=${encodeURIComponent(ph)}`}>Back</Button>
                <Stack direction='column' spacing={2}>
                    <TextField onChange={(event) => parentPathHandler(event.target.value)} disabled label='parent path' value={getParsedPH(ph)} />
                    <TextField onChange={(event) => pathHandler(event.target.value)} value={body.path} label='path' />
                    <TextField onChange={(event) => titleHandler(event.target.value)} value={body.name} label='name' />
                    <TextField onChange={(event) => discriptionHandler(event.target.value)} value={body.discription} label='discription' />
                    <TagsInput onChange={tagsHandler} defaultValue={body.tags} />
                    <AdminSearchProductsModal value={body.ids} onChange={idsHandler} />
                </Stack>
                <Button loading={loading} onClick={submitHandler}>Submit</Button>
            </Paper>
        </Box>
    )
}

export default CategoryUpdateOrCreateForm