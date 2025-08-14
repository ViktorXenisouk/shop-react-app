import React, { useState } from "react"
import { Box, Stack, TextField, Button } from "@mui/material"
import TagsInput from "../../../UI/TagsInput"
import { useSearchParams } from "react-router-dom"
import CategorieInput from "../../../UI/CategorieInput"

const AdminProductsSearch : React.FC = () => {
    const [body, setBody] = useState<{ search: string, tags: string[], category: string }>({ search: '', tags: [], category: '' })
    const [searchParams, setSearchParams] = useSearchParams()

    const searchHandler = (event: React.ChangeEvent<HTMLInputElement>) => setBody((prev) => {
        prev.search = event.target.value
        return prev
    })

    const categoryHandler = (value?: string) => setBody((prev) => {
        prev.category = value ?? ''
        return prev
    })

    const tagsHandler = (tags?: string[]) => setBody((prev) => {
        prev.tags = tags || []
        return prev
    })

    const clickHandler = () => {
        if (body.category) {
            searchParams.set('category', body.category)
        }
        else{
            searchParams.delete('category')
        }

        if (body.search) {
            searchParams.set('search', body.search)
        }
        else{
            searchParams.delete('search')
        }

        if (body.tags && body.tags.length > 0) {
            searchParams.set('tags', body.tags.join(','))
        }
        else{
            searchParams.delete('tags')
        }

        setSearchParams(searchParams)
    }


    return (
        <Box sx={{display:'flex',justifyContent:'center'}}>
            <Stack direction='column' spacing={3} sx={{width:'300px'}}>
                <TextField onChange={searchHandler} label='search'/>
                <TagsInput onChange={tagsHandler} />
                <CategorieInput onChange={categoryHandler} />
                <Button variant="contained" onClick={clickHandler}>Search</Button>
            </Stack>
        </Box>
    )
}

export default AdminProductsSearch