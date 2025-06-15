import { Box, TextField, Typography, ButtonGroup, Button, Stack } from "@mui/material"
import { Catalog } from "../../../types/Catalog"
import { Link } from "react-router-dom"

const ButtonLink = ({ children, to, onClick }: { children: string, to: string, onClick?: () => void }) => {
    return (
        <Button
            component={Link}
            to={to}
            sx={{ textTransform: 'none', color: 'inherit' }}
            onClick={onClick}
        >
            {children}
        </Button>
    );
};

const AdminCategoryCard = ({ body }: { body: Catalog, onSelect: (path: string) => void }) => {

    const { name, fullPath, path, parentPath, catalogs, tags, _id } = body

    const deleteHandler = () => {

    }

    return (
        <Box>
            <Stack direction="row">
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
                <ButtonLink to={`/admin/categories/edit/${_id}`}>Edit</ButtonLink>
                <ButtonLink onClick={deleteHandler} to='#'>Delete</ButtonLink>
                <ButtonLink to={`/admin/categories/search/?parentPath=${fullPath ? encodeURIComponent(fullPath) : encodeURIComponent('#root')}`}>Select</ButtonLink>
            </ButtonGroup>
            </Stack>
        </Box>
    )
}

export default AdminCategoryCard