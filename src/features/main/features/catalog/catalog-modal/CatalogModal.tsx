import { Modal, Box, IconButton, List, ListItemText, ListItemButton, Collapse, Paper, styled } from "@mui/material"
import React, { useState, useEffect, Fragment } from "react"
import { Link } from "react-router-dom"
import { useCatalogStorage } from "../hooks/useCatalog"
import { Close } from "@mui/icons-material"
import SearchCategoryButton from "./UI/SearchCategoryButton"
import CatalogList from "../catalog-list/CatalogList"

const MyListItemText = styled(ListItemText)(({ theme }) => ({
    color: theme.palette.text.secondary,
    textDecoration: 'underline',
}))

const CatalogModal: React.FC = () => {
    const [open, setOpen] = useState(false)
    const store = useCatalogStorage()

    const [index, setIndex] = useState<number[]>([])

    useEffect(() => {
        setIndex([])
    }, [open])

    if (!store.isLoading && !store.catalog) {
        store.fetchCatalog()
    }

    const handleList = (id: number) => {
        setIndex((prev) => {
            if (prev.includes(id)) {
                prev = prev.filter((item) => item !== id)
            }
            else {
                prev.push(id)
            }
            return [...prev]
        })
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
            <Modal open={open} onClose={() => setOpen(false)}>
                <Paper sx={{
                    width: '100%',
                    height: '100%',
                    overflowY: 'scroll',
                    overflowX: 'hidden',
                    borderRadius: 0,
                }}>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', borderBottom: '1px solid', borderBottomColor: 'divider',m:2,p:1 }}>
                        <IconButton onClick={() => setOpen(false)}>
                            <Close />
                        </IconButton>
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            width: '100%',
                            height: '1fr',
                        }}>
                       <CatalogList catalog={store.catalog}/>
                    </Box>
                </Paper>
            </Modal>
        </Fragment>
    )
}

export default CatalogModal