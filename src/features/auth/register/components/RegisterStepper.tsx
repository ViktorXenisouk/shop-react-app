import { Stepper,Step,StepLabel,Typography } from "@mui/material"

const steps = ['your data','create password','more info','confirm email']

type Props1 = {
    activeStep: number,
}

const RegisterStepper = ({ activeStep }: Props1) => {
    const isStepOptional = (step: number) => {
        return step === 0
    }

    const isCompletedStep = (step: number) => {
        return activeStep > step;
    }

    return (
        <Stepper nonLinear activeStep={activeStep}>
            {steps.map((label, index) => {
                const stepProps: { completed?: boolean } = {};
                const labelProps: {
                    optional?: React.ReactNode;
                } = {};
                if (isStepOptional(index)) {
                    labelProps.optional = (
                        <Typography variant="caption">Optional</Typography>
                    );
                }
                if (isCompletedStep(index)) {
                    stepProps.completed = true;
                }
                return (
                    <Step key={label} {...stepProps}>
                        <StepLabel {...labelProps}>{label}</StepLabel>
                    </Step>
                );
            })}
        </Stepper>
    )

}


export default RegisterStepper