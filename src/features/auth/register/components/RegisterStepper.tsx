import { Stepper, Step, StepLabel, Typography, StepButton } from "@mui/material"
import React from "react"

const steps = ['your data', 'create password', 'more info', 'confirm email']

type Props = {
    activeStep: number,
    step: number,
    setActiveStep: (index: number) => void
}

const RegisterStepper: React.FC<Props> = ({ activeStep, step, setActiveStep }) => {
    const isStepOptional = (step: number) => {
        return false
    }

    const isCompletedStep = (s: number) => {
        return activeStep > s;
    }

    return (
        <Stepper nonLinear activeStep={activeStep}>
            {steps.map((label, index) => {
                const stepProps: { unselectable: 'on' | 'off', completed?: boolean } = { unselectable: 'on' };
               
                if (isCompletedStep(index)) {
                    stepProps.completed = true;
                    stepProps.unselectable = 'off'
                }

                return (
                    <Step>
                        <StepLabel key={label} {...stepProps}>
                            {label}
                        </StepLabel>
                    </Step>
                );
            })}
        </Stepper>
    )

}


export default RegisterStepper