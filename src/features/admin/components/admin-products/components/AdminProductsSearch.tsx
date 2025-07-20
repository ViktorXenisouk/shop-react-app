import { Box, Stack, TextField, Button } from "@mui/material"
import TagsInput from "../../../UI/TagsInput"
import { useNavigate } from "react-router-dom"
import { useState } from "react"

const AdminProductsSearch = () => {
    const navigate = useNavigate();
    const [body, setBody] = useState<{ search: string, tags: string[], category: string }>({ search: '', tags: [], category: '' })

    const searchHandler = (event: React.ChangeEvent<HTMLInputElement>) => setBody((prev) => {
        prev.search = event.target.value
        return prev
    })

    const categoryHandler = (event: React.ChangeEvent<HTMLInputElement>) => setBody((prev) => {
        prev.category = event.target.value
        return prev
    })

    const tagsHandler = (tags?: string[]) => setBody((prev) => {
        prev.tags = tags || []
        return prev
    })

    const clickHandler = () => {
        let url = '/admin/products/search/'
        if (body.category) {
            url += body.category
            url += '?'
        }
        /*
        if (body.tags) {
            url +=  `?params=${encodeURIComponent(body.tags.join(','))}`
        }*/
        navigate(url)
    }


    return (
        <Box>
            <Stack direction='column'>
                <TextField onChange={searchHandler} label='search' />
                <TagsInput onChange={tagsHandler} />
                <TextField onChange={categoryHandler} label='category' />
                <Button onClick={clickHandler}>Search</Button>
            </Stack>
        </Box>
    )
}

export default AdminProductsSearch