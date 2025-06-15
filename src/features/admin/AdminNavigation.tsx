import { Box, AppBar, Toolbar, Stack, Button } from "@mui/material"
import { Link } from "react-router-dom"

const AdminNavigation = () => {

    return (
        <AppBar color="default" position="sticky" elevation={4}>
            <Toolbar>
                <Box width="100%" display="flex" justifyContent="center" alignItems="center">
                    <Stack direction="row" spacing={2}>
                        <Button component={Link} to="admin/me">Me</Button>
                        <Button component={Link} to="/admin/products/search/">Products</Button>
                        <Button component={Link} to="/admin/categories/search/?parentPath=%23root">Categories</Button>
                        <Button component={Link} to="/admin/users/search/">Users</Button>
                        <Button component={Link} to="/admin/admins/search/">Admins</Button>
                    </Stack>
                </Box>
            </Toolbar>
        </AppBar>
    )
}

export default AdminNavigation