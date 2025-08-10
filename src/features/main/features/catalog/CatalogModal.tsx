import { Modal, Box, Button, List, ListItemButton, Stack, Typography, IconButton, Grid, Paper } from "@mui/material"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useCatalogStorage } from "./hooks/useCatalog"
import { Close } from "@mui/icons-material"


type Props = {}

const CatalogModal = () => {
    const [open, setOpen] = useState(false)
    const store = useCatalogStorage()
    const navigate = useNavigate()

    const [index, setIndex] = useState(0)

    if (!store.isLoading && !store.catalog) {
        store.fetchCatalog()
    }

    return (
        <>
            <Button sx={{ width: '100%' }} variant="outlined" onClick={() => setOpen(true)}>
                Search Category
            </Button>
            <Modal open={open} onClose={() => setOpen(false)} sx={{ display: 'flex', alignItems: 'flex-start', mt: '60px' }}>
                <Box sx={{ width: '100%', height: 'auto' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', backgroundColor: 'background.paper' }}>
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
                                            navigate(`/${cat.isPlaylist ? 'play-list' : 'products'}/${cat.fullPath}`)
                                        }
                                        setIndex(i)
                                    }
                                }>
                                    {cat.name}
                                </ListItemButton>
                            )}
                        </List>
                        <Grid container spacing={3} sx={{ width: '100%', mx: 1 }}>
                            {store.catalog && store.catalog[index] && store.catalog[index].subCategories?.map((catalog) =>
                                <Grid size={{ xs: 6, sm: 4, md: 3 }}>
                                    <Paper
                                        variant="outlined"
                                        elevation={24}
                                        sx={{ minHeight: '40px', display: 'flex', alignContent: 'center', justifyContent: 'center', ':hover': { border: '#0071e3 solid 1px' } }}
                                        component={Link} to={`/${store.catalog && store.catalog[index].isPlaylist ? 'play-list' : 'products'}/${catalog.fullPath}`}
                                    >
                                        <Typography sx={{ color: 'black' }} justifyContent='center' align="center">{catalog.name}</Typography>
                                    </Paper>
                                </Grid>)}
                        </Grid >
                    </Box>
                </Box>
            </Modal>
        </>
    )
}

export default CatalogModal