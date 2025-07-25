import { useState } from "react"
import React from "react";
import { Box, Stack,Paper } from '@mui/material';
import { type Body } from "./types";
import RegisterStepper from './components/RegisterStepper';
import { FirstPage, SecondPage, ThirdPage, FourthPage } from "./components/Pages"

const pages = [FirstPage, SecondPage, ThirdPage, FourthPage]

const Register = () => {
    const [activeStep, setActiveStep] = useState(0)
    const [body, setBody] = useState<Body>({ username: '', email: '', password: '', tel: '' })

    const next = () => {
        setActiveStep((prev) => prev + 1)
    }

    const bodyChange = (updates: Partial<Body>) => {
        setBody((prev) => {
            return { ...prev, ...updates }
        })
    }

    const page = React.createElement(pages[activeStep], { index: activeStep, body: body, setBody: bodyChange, next: next })
    return (
        <Paper sx={{ width: '600px', display: 'flex', justifyContent: 'center', flexDirection: 'column',p:'12px' }}>
            <RegisterStepper activeStep={activeStep} />
            <Stack spacing={2}>
                {page}
            </Stack>
        </Paper>
    )
}

export default Register