import {Box } from '@mui/material';

import RegisterForm from "../features/auth/register/RegisterForm"

const Register = () => {

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <RegisterForm/>
        </Box>
    )
}

export default Register