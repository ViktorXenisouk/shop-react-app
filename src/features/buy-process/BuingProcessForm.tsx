import { Box, Stack, Button, IconButton } from "@mui/material"
import React, { useState } from "react"
import BuyProcessStepper from "./components/BuyProcessStepper"
import { PersonalInfo, ConfirmBakset, ConfirmAdress } from './components/index';
import { Body } from "./types";
import { ArrowBack, ArrowForward } from "@mui/icons-material"

const stepsCount = 4

const BuingProcessForm = () => {
    const [activeStep, setActiveStep] = useState(0)
    const [completed, setCompleted] = useState(new Set<number>())

    const [body, setBody] = useState<Body>({ username: '', adress: { street: '', city: '', postalCode: '', country: '' }, tel: '', email: '', card: '', randomInfo: '' })

    const changeBody = (parts: Partial<Body>) => {
        setBody((prev) => {
            return { ...prev, ...parts }
        })
    }
    const setCompletedPP = (index: number, value: boolean) => {
        if (value === true) {
            setCompleted((prev) => {
                prev.add(index)
                return prev
            })
            handleNext()
        }
        else {
            setCompleted((prev) => {
                prev.delete(index)
                return prev
            })
        }
    }

    const pages = [PersonalInfo, ConfirmBakset, ConfirmAdress, ConfirmAdress,]

    const finishHandle = () => {

    }

    const handleNext = () => {
        let i = 0
        setActiveStep((prev) => {
            i = prev + 1
            return i
        })
        if (i === 3) {
            finishHandle()
        }
    }

    const handlePrevious = () => {
        let i = 0
        setActiveStep((prev) => {
            i = prev - 1
            return i
        })
    }

    const handleComplete = () => {
        setCompleted((prev) => prev.add(activeStep))
        handleNext()
    }

    const allStepsCompleted = () => {
        return completed.size === stepsCount
    }

    const page = activeStep < pages.length ? React.createElement(pages[activeStep], { index: activeStep, body: body, setBody: changeBody, setCompleted: setCompletedPP, isCompleted: completed.has(activeStep) }) : null

    return (
        <Box sx={{ width: '100%', overflowX: 'hidden', mt: '16px' }}>
                <BuyProcessStepper activeStep={activeStep} completed={completed} setActiveStep={setActiveStep} />
            <Stack spacing={3} sx={{ width: '100%', overflowX: 'hidden', pt: '20px', mt: '30px' }}>
                {page}
            </Stack>
            <Box>
                <IconButton onClick={handlePrevious} disabled={activeStep <= 0}><ArrowBack /></IconButton>
                <IconButton onClick={handleNext} disabled={activeStep > stepsCount - 1}><ArrowForward /></IconButton>

                <Button onClick={handleComplete}>Complete</Button>
                {allStepsCompleted() && <Button>Finish</Button>}
            </Box>
        </Box>
    )
}

export default BuingProcessForm