import React from "react"
import { Paper, Typography, ButtonGroup, Button, Stack } from "@mui/material"
import { Catalog } from "../../../../../types/catalog"
import { ArrowForward, Delete, EditDocument } from "@mui/icons-material"
import ButtonLink from "../UI/ButtonLink"

type Props = {
    body: Catalog,
    onSelect: (path: string) => void
}

const AdminCategoryCard: React.FC<Props> = ({ body, onSelect }) => {

    const { name, fullPath, path, parentPath, subCategories, filter, _id } = body

    const deleteHandler = () => {

    }

    return (
        <Paper sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', mb: '20px' }}>
            <Stack direction="column">
                <Typography>
                    name:{name}
                </Typography>
                <Typography>
                    fullPath:{fullPath}
                </Typography>
                <Typography>
                    path:{path}
                </Typography>
            </Stack>
            <ButtonGroup orientation="vertical">
                <ButtonLink to={`/admin/categories/edit/${_id}`}>Edit <EditDocument /></ButtonLink>
                <ButtonLink onClick={deleteHandler} to='#'>Delete <Delete /></ButtonLink>
                <ButtonLink to={`/admin/categories/search/?parentPath=${fullPath ? encodeURIComponent(fullPath) : encodeURIComponent('#root')}`}>Select <ArrowForward /> </ButtonLink>
            </ButtonGroup>
        </Paper>
    )
}

export default AdminCategoryCard