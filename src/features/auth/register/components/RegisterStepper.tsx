import { Stepper, Step, StepLabel } from "@mui/material"
import React from "react"

const steps = ['your data', 'create password', 'more info', 'confirm email']

type Props = {
    activeStep: number,
}

const RegisterStepper: React.FC<Props> = ({ activeStep }) => {
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