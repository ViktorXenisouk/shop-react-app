import React from "react"
import { Button, Modal, Box, Stack, TextField, Paper, IconButton, Grid } from "@mui/material"
import { useState } from "react"
import { useRequest } from "../../../../../../hooks/useRequest"
import { Product } from "../../../../../../types/product"
import SearchProductsCard from "./SearchProductsCard"
import TagsInput from "../../../../UI/TagsInput"
import CategorieInput from "../../../../UI/CategorieInput"
import { Clear } from "@mui/icons-material"

type Props = {
    value: string[],
    onChange: (value: string[]) => void
}

const AdminSearchProductsModal: React.FC<Props> = (props) => {
    const [open, setOpen] = useState(false)
    const [body, setBody] = useState<{ search: string, tags: string, category: string }>({ search: '', tags: '', category: '' })
    const [searchParams, setSearchParams] = useState(new URLSearchParams())

    const closeHandler = () => {
        setOpen(false)
    }

    const [loaded, data, error] = useRequest<Product[]>(`/products/search/?${searchParams.toString()}`, { method: 'GET' })

    const searchHandler = (event: any) => {
        setBody((prev) => {
            prev.search = event.target.value
            return prev
        })
    }

    const tagsHandler = (tags?: string[]) => {
        setBody((prev) => {
            prev.tags = tags ? tags.join(',') : ''
            return prev
        })
    }

    const categoryHandler = (value?: string) => {
        setBody((prev) => {
            prev.category = value ?? ''
            return prev
        })
    }
    const clickHandler = () => {
        const searchP = new URLSearchParams()

        if (body.search && body.search !== '')
            searchP.set('search', body.search)

        if (body.category && body.category !== '')
            searchP.set('category', body.category)

        if (body.tags && body.tags !== '')
            searchP.set('tags', body.tags)

        setSearchParams(searchP)
    }

    const onSearchClick = (id: string) => {
        const include = props.value.includes(id)

        if (include) {
            props.onChange?.(props.value.filter((v) => v !== id))
        }
        else {
            const arr = [...props.value, id]
            props.onChange?.(arr)
        }

    }

    return (
        <>
            <Button variant="contained" onClick={()=>setOpen(true)}>
                Search Products
            </Button>
            <Modal open={open} onClose={closeHandler} sx={{ display: 'flex', justifyContent: 'center' }}>
                <Paper sx={{ width: '1200px', overflowY: 'scroll' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <IconButton onClick={closeHandler}>
                            <Clear />
                        </IconButton>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Stack direction='column' spacing={3} sx={{ width: '300px' }}>
                            <TextField onChange={searchHandler} label='search' />
                            <TagsInput onChange={tagsHandler} />
                            <CategorieInput onChange={categoryHandler} />
                            <Button variant="contained" onClick={clickHandler}>Search</Button>
                        </Stack>
                    </Box>
                    <Box sx={{ mt: '10px', display: 'flex', justifyContent: 'space-between' }}>
                        <Grid container>
                            <Grid size={{ xs: 6 }}>
                                <Stack>
                                    {loaded && data && typeof data.map == 'function' && data?.map((item) => <SearchProductsCard {...item} onClick={onSearchClick} isSelected={props.value.includes(item._id)}/>)}
                                </Stack>
                            </Grid>
                            <Grid size={{ xs: 6 }}>
                                <Stack>
                                    {props.value.map((item) => <SearchProductsCard id={item} />)}
                                </Stack>
                            </Grid>
                        </Grid>
                    </Box>
                </Paper>
            </Modal>
        </>
    )
}

export default AdminSearchProductsModal