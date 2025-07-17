import { Modal, Box, Button, List, ListItemButton, Stack, Typography, IconButton } from "@mui/material"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useCatalogStorage } from "./hooks/useCatalog"
import { Close } from "@mui/icons-material"


type Props = {}

const CatalogModal = (props: Props) => {
    const [open, setOpen] = useState(false)
    const store = useCatalogStorage()
    const navigate = useNavigate()

    const [index, setIndex] = useState(0)

    if (!store.isLoading && !store.catalog) {
        store.fetchCatalog()
    }

    return (
        <>
            <Button sx={{width:'100%'}} variant="outlined" onClick={() => setOpen(true)}>
                Search Category
            </Button>
            <Modal open={open} onClose={() => setOpen(false)} sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{width:'100%', height:'auto'}}>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', backgroundColor:'background.paper' }}>
                        <IconButton onClick={() => setOpen(false)}>
                            <Close />
                        </IconButton>

                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%', backgroundColor: 'lightgrey' }}>
                        <List>
                            {store.catalog && store.catalog.map((cat, i) =>
                                <ListItemButton selected={index === i} onClick={
                                    () => {
                                        if (index === i) {
                                            navigate(`/products/${cat.fullPath}`)
                                        }
                                        setIndex(i)
                                    }
                                }>
                                    {cat.name}
                                </ListItemButton>
                            )}
                        </List>
                        <Stack>
                            {store.catalog && store.catalog[index].catalogs?.map((cat) =>
                                <Button component={Link} to={`/products/${cat.fullPath}`}>{cat.name}</Button>)}
                        </Stack>
                    </Box>
                </Box>
            </Modal>
        </>
    )
}

export default CatalogModal