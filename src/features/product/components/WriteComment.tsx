import { Box, TextareaAutosize, Icon, Typography, Button, IconButton, Rating } from "@mui/material"
import { Link } from "react-router-dom"
import { useAuthUserStore } from "../../../store/useAuth"
import { Send, Person } from "@mui/icons-material"
import { useEffect, useRef } from "react"

const WriteComment = () => {
    const store = useAuthUserStore()

    const ref = useRef<HTMLTextAreaElement>(null)

    useEffect(() => {
        const minH = '400px'
        const w = '600px'
        if (ref.current) {
            ref.current.style.maxWidth = w
            ref.current.style.minWidth = w
            ref.current.style.minHeight = minH
        }
    }, [ref])

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
                    <TextareaAutosize minRows={5} ref={ref} />
                    <IconButton sx={{ width: '50px', height: '50px' }}><Send /></IconButton>
                </Box>
            </Box>
        </Box>
    )
}

export default WriteComment