import { Box, TextareaAutosize, Icon, Typography, Button, IconButton, Rating,TextField } from "@mui/material"
import { Link } from "react-router-dom"
import { useAuthUserStore } from "../../../store/useAuth"
import { Send, Person } from "@mui/icons-material"
import { useEffect, useRef } from "react"

const WriteComment = () => {
    const store = useAuthUserStore()

    if (!store.user) {
        return (
            <Box>
                <Typography>You are not login</Typography>
                <Button component={Link} to='/login'>Login</Button>
            </Box>
        )
    }

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Box>
                <Box sx={{ display: 'flex', alignContent: 'center', justifyContent: 'left' }}>
                    <Icon><Person /></Icon>
                    <Typography>{store.user.username}</Typography>
                </Box>
                <Rating />
                <Box sx={{ display: 'flex', alignContent: 'flex-start' }}>
                    <TextField multiline minRows={10} sx={{width:{xs:'300px',md:'600px'}}}/>
                    <IconButton sx={{ width: '50px', height: '50px' }}><Send /></IconButton>
                </Box>
            </Box>
        </Box>
    )
}

export default WriteComment