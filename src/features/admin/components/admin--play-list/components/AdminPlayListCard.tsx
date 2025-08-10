import { Box, Paper, Typography, ButtonGroup, Button, Stack } from "@mui/material"
import { PlayList } from "../../../../../types/play-list"
import { Link } from "react-router-dom"
import {ArrowForward,Delete,EditDocument} from "@mui/icons-material"

const ButtonLink = ({ children, to, onClick }: { children: any, to: string, onClick?: () => void }) => {
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

const AdminPlayListCard = ({ body }: { body: PlayList, onSelect: (path: string) => void }) => {

    const { name, fullPath, path, parentPath, ids,tags } = body

    const deleteHandler = () => {

    }

    return (
        <Paper sx={{display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'center',width:'100%',mb:'20px'}}>
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
                <ButtonLink to={`/admin/play-list/edit/${path}`}>Edit <EditDocument/></ButtonLink>
                <ButtonLink onClick={deleteHandler} to='#'>Delete <Delete/></ButtonLink>
                <ButtonLink to={`/admin/play-list/search/?parentPath=${fullPath ? encodeURIComponent(fullPath) : encodeURIComponent('#root')}`}>Select <ArrowForward/> </ButtonLink>
            </ButtonGroup>
        </Paper>
    )
}

export default AdminPlayListCard