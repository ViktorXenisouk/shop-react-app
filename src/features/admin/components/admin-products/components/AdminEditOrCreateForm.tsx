import React, { useState } from "react"
import { Product } from "../../../../../types/product"
import TagsInput from "../../../UI/TagsInput"
import ImagePicker from "../../../../image-picker-modal/ImagePicker";
import type { ImageItem } from "../../../../../types/Image";
import ArticleEditor from "../../../../article/ArticleEditor"
import CategorieInput from "../../../UI/CategorieInput"
import type { ArticleBlock } from "../../../../../types/article"
import { inputBodyHandler } from "../../../../../utils/inputHandler"
import { Box, TextField, Typography, Button, TextareaAutosize, Stack, IconButton } from '@mui/material';
import { Link } from "react-router-dom"
import { ArrowBack } from "@mui/icons-material"
import { ProductBody } from "../types";

type Props = { 
    data?: Product, 
    onSubmit: (body: ProductBody) => Promise<void> 
}

const AdminEditOrCreateForm : React.FC<Props> = ({ data, onSubmit }) => {

    const [body, setBody] = useState({} as ProductBody)
    const [isSaving, setIsSaving] = useState(false)

    const handleName = inputBodyHandler(setBody, (prev, value) => prev.name = value)
    const handleDiscription = inputBodyHandler(setBody, (prev, value) => prev.discription = value)

    const articleHndler = (values: ArticleBlock[]) => {
        setBody((prev) => {
            prev.blocks = values
            return prev
        })
    }

    const imagesHandler = (images: ImageItem[]) => setBody((prev) => {
        prev.imgs = images
        return prev
    })

    const handleTags = (tags?: string[]) => {
        setBody((prev) => {
            prev.tags = tags
            return prev
        })
    }

    const categoryHandler = (value: string | undefined) => setBody((prev) => {
        prev.category = value ?? ''
        return prev
    })

    const save = async () => {
        setIsSaving(true)

        await onSubmit(body)

        //const res = await autoSaveFetch(`/products/${data._id}`, {token:store.token||'',body:body,method:'PATCH'})

        setIsSaving(false)
    }

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                <IconButton component={Link} to="/admin/products/search/"><ArrowBack /></IconButton>
            </Box>
            <Stack spacing={1}>
                {
                    data && <Typography>Id:{data._id}</Typography>
                }
                <TextField onChange={handleName} defaultValue={data?.name} label='name' />
                <TextareaAutosize onChange={handleDiscription} defaultValue={data?.discription} placeholder='discription' />
                <TagsInput onChange={handleTags} defaultValue={data?.tags ?? []} />
                <CategorieInput defaultValue={data?.category} onChange={categoryHandler} />
                <ImagePicker onSelect={imagesHandler} folder="" deafultImages={data?.imgs} />
                <ArticleEditor onChange={articleHndler} defaultValue={data?.blocks} />
                <Button loading={isSaving} onClick={save}>save</Button>
            </Stack>
        </Box>
    )
}

export default AdminEditOrCreateForm
