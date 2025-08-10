import { useState } from "react"
import React from "react";
import { Box, Stack,Paper } from '@mui/material';
import { type Body } from "./types";
import RegisterStepper from './components/RegisterStepper';
import { FirstPage, SecondPage, ThirdPage, FourthPage } from "./components/pages"
import HeaderText from "../../../UI/HeaderText";

const pages = [FirstPage, SecondPage, ThirdPage, FourthPage]

const Register = () => {
    const [activeStep, setActiveStep] = useState(0)
    const [step,setStep] = useState(0)
    const [body, setBody] = useState<Body>({ username: '', email: '', password: '', tel: '' })

    const setAActiveStep = (index: number) => {
setActiveStep(index)
    }

    const next = () => {
        setActiveStep((prev) => {
            const newV = prev + 1

            if(newV > step){
                setStep(newV)
            }

            return newV
        })
    }

    const bodyChange = (updates: Partial<Body>) => {
        setBody((prev) => {
            return { ...prev, ...updates }
        })
    }

    const page = React.createElement(pages[activeStep], { index: activeStep, body: body, setBody: bodyChange, next: next })
    return (
        <Paper sx={{ width: '600px', display: 'flex', justifyContent: 'center', flexDirection: 'column',p:'12px' }}>
            <HeaderText>Register Form</HeaderText>
            <RegisterStepper setActiveStep={setAActiveStep} step={step} activeStep={activeStep} />
            <Stack sx={{p:'50px'}} spacing={2}>
                {page}
            </Stack>
        </Paper>
    )
}

export default Register