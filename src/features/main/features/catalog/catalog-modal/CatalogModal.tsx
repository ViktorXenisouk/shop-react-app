import { Modal, Box, Button, List, ListItemButton, Typography, IconButton, Grid, Paper } from "@mui/material"
import React, { useState, Fragment } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useCatalogStorage } from "../hooks/useCatalog"
import { Close } from "@mui/icons-material"
import SearchCategoryButton from "./UI/SearchCategoryButton"

const CatalogModal: React.FC = () => {
    const [open, setOpen] = useState(false)
    const store = useCatalogStorage()
    const navigate = useNavigate()

    const [index, setIndex] = useState(0)

    if (!store.isLoading && !store.catalog) {
        store.fetchCatalog()
    }

    return (
        <Fragment>
            <Box sx={{
                m: 5,
            }}>
                <SearchCategoryButton
                    onClick={() => setOpen(true)}
                />
            </Box>
            <Modal open={open} onClose={() => setOpen(false)} sx={{ display: 'flex', alignItems: 'flex-start', mt: '60px' }}>
                <Box sx={{ width: '100%', height: 'auto', p: 4, borderRadius: 4, backgroundColor: 'background.paper', m: 4 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', borderBottom: '1px solid', borderBottomColor: 'divider' }}>
                        <IconButton onClick={() => setOpen(false)}>
                            <Close />
                        </IconButton>
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            width: '100%',
                            backgroundColor: 'background.paper'

                        }}>
                        <List
                        sx={{
                            borderRight:'1px solid',
                            borderRightColor:'divider'
                        }}>
                            {store.catalog && store.catalog.map((cat, i) =>
                                <ListItemButton
                                    selected={index === i}
                                    onClick={
                                        () => {
                                            if (index === i) {
                                                navigate(`/${cat.isPlaylist ? 'play-list' : 'products'}/${cat.fullPath}`)
                                            }
                                            setIndex(i)
                                        }
                                    }
                                    sx={{
                                        borderRadius: 2,
                                        color:'text.primary',
                                        ':hover': {
                                            border: '1px solid',
                                            borderColor: 'primary.main'
                                        }
                                    }}>
                                    {cat.name}
                                </ListItemButton>
                            )}
                        </List>
                        <Box
                            sx={{
                                p: 4
                            }}>
                            <Grid container spacing={3} sx={{ width: '100%', mx: 1 }}>
                                {store.catalog && store.catalog[index] && store.catalog[index].subCategories?.map((catalog) =>
                                    <Grid size={{ xs: 6, sm: 4, md: 3 }}>
                                        <Button
                                            component={Link}
                                            to={`/${store.catalog && store.catalog[index].isPlaylist ? 'play-list' : 'products'}/${catalog.fullPath}`}
                                            variant="outlined"
                                            sx={{
                                                minHeight: '100px',
                                                display: 'flex',
                                                alignContent: 'center',
                                                justifyContent: 'center',
                                                ':hover': {
                                                    border: '1px solid',
                                                    borderColor: 'primary.main'
                                                }
                                            }}>
                                            {catalog.name}
                                        </Button>
                                    </Grid>)}
                            </Grid >
                        </Box>
                    </Box>
                </Box>
            </Modal>
        </Fragment>
    )
}

export default CatalogModal