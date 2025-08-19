import React from "react";
import { Typography, Paper } from "@mui/material";
import RobotWithMessage from "../../assets/interactive-svg/RobotWithMessage"
import NoFoundErrorPage from "../../pages/NoFoundErrorPage"
import { type ErrorMessage } from "../../types/fetch";

const getMessageByStatusStatusCode = (status: number) => {
    let index = 0

    if (status >= 300 && status < 400) {
        index = 0
    }
    if (status >= 400 && status < 500) {
        index = 1
    }
    if (status >= 500) {
        index = 2
    }

    return [
        'Some error due to Redirections',
        'It is a Client Error, plese check if your Input is Correct',
        'Server Error, We are very sorry and we are working about it']
    [index]
}

const ErrorDisplay : React.FC<ErrorMessage> = ({ status, message }) => {

    if (status === 404) {
        return <NoFoundErrorPage />
    }


    const text = getMessageByStatusStatusCode(status ?? 500)

    return (
        <Paper
            variant="outlined"
            sx={{
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                alignItems: 'center',
                pt: '10px',
                width: '600px',
                mx: 'auto',
                mt: '30px',
                p: '30px'
            }}
        >
            <Typography variant="h2">
                Error Page : {status}
            </Typography>

            <RobotWithMessage message={ status ? status.toString() : ''} />

            <Typography variant="h3">
                {text}
            </Typography>

            <Typography
                variant="h3"
                sx={{ mt: '50px' }}
            >
                message: {message}
            </Typography>
        </Paper>
    )
}

export default ErrorDisplay