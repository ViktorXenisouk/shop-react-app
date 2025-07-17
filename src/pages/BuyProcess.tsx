import { Box, Stack, Button } from "@mui/material"
import { useState } from "react"
import React from "react"
import BuyProcessStepper from "../features/buyProcess/BuyProcessStepper"
import PersonalInfo from '../features/buyProcess/pages/PersonalInfo';
import ConfirmBakset from "../features/buyProcess/pages/ConfirmBasket";
import ConfirmAdress from "../features/buyProcess/pages/ConfirmAdress";
import { Body } from "../features/buyProcess/types";

const stepsCount = 4

const BuingProcess = () => {
    const [activeStep, setActiveStep] = useState(0)
    const [completed, setCompleted] = useState(new Set<number>())

    const [body, setBody] = useState<Body>({ username: '', adress:{street:'',city:'',postalCode:'',country:''}, tel: '', email: '', card: '', randomInfo: '' })

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
        <Box sx={{width:'100%', overflowX:'hidden'}}>
                        <BuyProcessStepper activeStep={activeStep} completed={completed} setActiveStep={setActiveStep} />
            <Stack spacing={3} sx={{width:'100%',overflowX:'hidden',pt:'20px'}}>
                {page}
            </Stack>
            <Box>
                <Button onClick={handlePrevious} disabled={activeStep <= 0}>Prev</Button>
                <Button onClick={handleNext} disabled={activeStep > stepsCount - 1}>Next</Button>

                <Button onClick={handleComplete}>Complete</Button>
                {allStepsCompleted() && <Button>Finish</Button>}
            </Box>
        </Box>
    )
}

export default BuingProcess