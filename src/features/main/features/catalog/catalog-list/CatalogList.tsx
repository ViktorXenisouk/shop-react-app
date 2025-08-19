import React, { Fragment, useState } from "react"
import { Link } from "react-router-dom"
import { List, ListItemButton, ListItemText, Collapse, styled } from "@mui/material"
import { Catalog } from "../../../../../types/catalog"
import { PlayList } from "../../../../../types/play-list"

const MyListItemText = styled(ListItemText)(({ theme }) => ({
    color: theme.palette.text.secondary,
    textDecoration: 'underline',
}))

type Props = {
    catalog?: ((Catalog | PlayList) & {isPlaylist?:boolean})[] | null
}

const CatalogList: React.FC<Props> = ({ catalog }) => {
    const [index, setIndex] = useState<number[]>([])

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
        <List sx={{ width: 'auto' }}>
            {
                catalog && catalog.map((item, i) =>
                    <Fragment>
                        <ListItemButton
                            onClick={() => handleList(i)}>
                            <ListItemText primary={item.name} />
                        </ListItemButton>
                        <Collapse in={index.includes(i)} timeout="auto" unmountOnExit>
                            <List disablePadding>
                                <ListItemButton
                                    component={Link}
                                    to={`/${item.isPlaylist ? 'play-list' : 'products'}/${item.fullPath}`}
                                    sx={{ pl: 5 }}>
                                    <MyListItemText disableTypography>
                                        All
                                    </MyListItemText>
                                </ListItemButton>
                                {
                                    catalog?.[i]?.subCategories && catalog?.[i]?.subCategories?.map((item2) =>
                                        <ListItemButton
                                            component={Link}
                                            to={`/${item.isPlaylist ? 'play-list' : 'products'}/${item2.fullPath}`}
                                            sx={{ pl: 5 }}>
                                            <MyListItemText disableTypography>
                                                {item.name}
                                            </MyListItemText>
                                        </ListItemButton>)
                                }
                            </List>
                        </Collapse>
                    </Fragment>)}
        </List>
    )
}

export default CatalogList