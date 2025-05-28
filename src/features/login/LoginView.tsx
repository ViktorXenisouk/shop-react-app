import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

const LoginView = () => {

    return (
        <Box
            component="form"
            sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}
            noValidate
            autoComplete="off"
        >

            <TextField
                required
                label="email"
                type="email"
            />
            <TextField
                label="Password"
                type="password"
                autoComplete="current-password"
            />
        </Box>
    )

}

export default LoginView