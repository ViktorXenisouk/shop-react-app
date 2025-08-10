import { Link } from "react-router-dom"
import { useAuthUserStore } from "../../store/useAuth"
import { useLocalStorage } from "../../store/useLocalStorage"
import { Box, Typography, Button, Grid, TextField, Paper, Stack, Divider } from "@mui/material"
import HeaderText from "../../UI/HeaderText"
import Image from "../../UI/Image"

const Me = () => {
    const store = useAuthUserStore()
    const localStorage = useLocalStorage()

    const user = store.user

    return (
        <Box>
            <HeaderText>Me Page</HeaderText>
            <Box sx={{ mx: '40px', my: '5px' }}>
                <Grid container spacing={2}>
                    <Grid size={{ xs: 12, md: 'auto' }}>
                        <Box sx={{ width: { xs: '100%', md: '100%' }, height: { xs: '150px', md: '100%', display: 'flex', justifyContent: 'center' } }}>
                            <Image imgURL="http://res.cloudinary.com/djdxksokm/image/upload/v1750512940/cld-sample-4.jpg" width='250px' height='100% !important' />
                        </Box>
                    </Grid>
                    <Grid size={{ xs: 12, md: 'grow' }}>
                        <Box sx={{ width: '100%', height: '100%' }}>
                            <Paper sx={{ py: '20px', px: '20px', display: 'flex', justifyContent: 'space-between', flexDirection: 'column' }}>
                                <Stack spacing={2}>
                                    <Typography>username: {user.username}</Typography>
                                    <Typography>email: {user.email}</Typography>
                                    <Typography>tel: {user.email ? '+ 203 403 431' : ''}</Typography>
                                </Stack>
                                <Divider sx={{ my: '15px' }} />
                                <Box sx={{ display: 'flex', justifyContent: 'start',gap:4, alignItems: 'center' }}>
                                    {
                                        store.token ?
                                            <>
                                                <Button
                                                    variant='contained'
                                                    onClick={() => store.logout()}>
                                                    Log out
                                                </Button>
                                                <Button
                                                    variant='contained'
                                                >
                                                    Edit Me
                                                </Button>
                                                <Button
                                                    variant='contained'
                                                    onClick={() => localStorage.setShowAlert(!localStorage.showAlert)}>
                                                    {localStorage.showAlert ? 'show alert' : 'dont show alert'}
                                                </Button>
                                            </>
                                            :
                                            <>
                                                <Button
                                                    variant='contained'
                                                    component={Link} to='/login'
                                                    onClick={() => store.logout()}>
                                                    Log In
                                                </Button>
                                                <Button
                                                    variant='contained'
                                                    component={Link} to='/register'
                                                >
                                                    Create Acount
                                                </Button>
                                            </>
                                    }
                                </Box>
                            </Paper>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}

export default Me