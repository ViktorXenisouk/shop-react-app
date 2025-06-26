import { useState } from "react"
import { createProduct } from "../api";
import { Box, TextField, Button } from "@mui/material"
import MessageShower from "../../../../components/MessageShower";
import TagsInput from "./TagsInput";
import CategorieInput from "./CategorieInput"
import ImagePickerModal from "../../../imagePickerModal/ImagePickerModal";
import type { ImageItem } from "../../../../types/Image";
import ArticleEditor from "../../../article/ArticleEditor";
import { ArticleBlock } from "../../../../types/article";

const AdminProductsCreate = () => {

    const [body, setBody] = useState<{ name: string, discription: string, tags: string[], category: string, imgs: ImageItem[], blocks: ArticleBlock[] }>({ name: '', discription: '', tags: [], category: '', imgs: [], blocks: [] })

    const [message, setMessage] = useState('')

    const nameHandler = (event: React.ChangeEvent<HTMLInputElement>) => setBody((prev) => {
        prev.name = event.target.value
        return prev
    })
    const discriptionHandler = (event: React.ChangeEvent<HTMLInputElement>) => setBody((prev) => {
        prev.discription = event.target.value
        return prev
    })
    const categoryHandler = (value : string | undefined) => setBody((prev) => {
        prev.category = value ?? ''
        return prev
    })
    const tagsHandler = (value: string[] | undefined) => setBody((prev) => {
        prev.tags = value ?? []
        return prev
    })

    const imagesHandler = (images: ImageItem[]) => setBody((prev) => {
        prev.imgs = images
        return prev
    })

    const [open, setOpen] = useState(false)

    const closeModal = () => {
        setOpen(false)
    }

    const submitHandler: React.MouseEventHandler<HTMLButtonElement> = async (event) => {
        event.preventDefault()
        console.log(body)
        const res = await createProduct(body)
        if (res.message) {
            setMessage(res.message)
        }
    }

    const onBlocksChange = (blocks: any) => {
        setBody((prev) => {
            prev.blocks = blocks
            return prev
        })

    }

    return (
        <>
            <Box>
                <TextField onChange={nameHandler} label='name' />
                <TextField onChange={discriptionHandler} multiline defaultValue='some discription' label='discription' />
                <TagsInput onChange={tagsHandler}/>
                <CategorieInput onChange={categoryHandler}/>
                <Button onClick={submitHandler}>
                    Submit
                </Button>
                <Button onClick={() => setOpen(true)}>set fills</Button>
                <MessageShower message={message} />
                <ArticleEditor onChange={onBlocksChange} />
            </Box>
            <ImagePickerModal open={open} onClose={closeModal} onSelect={imagesHandler} folder="" />
        </>
    )
}

export default AdminProductsCreate
