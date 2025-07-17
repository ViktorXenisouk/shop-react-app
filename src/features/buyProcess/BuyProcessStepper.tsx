import { Step,Stepper,Typography,StepButton } from '@mui/material';

type Props = {
    activeStep: number,
    completed: Set<number>,
    setActiveStep: (value: number) => void
}

const steps = ['log into your account', 'confirmed items', 'set place to recive', 'set payment method']

const BuyProcessStepper = ({ activeStep, completed, setActiveStep }: Props) => {
    const isStepOptional = (step: number) => {
        return step === 0
    }

    const isCompletedStep = (step: number) => {
        return completed.has(step);
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
                        <StepButton onClick={() => setActiveStep(index)} {...labelProps}>{label}</StepButton>
                    </Step>
                );
            })}
        </Stepper>
    )

}

export default BuyProcessStepper