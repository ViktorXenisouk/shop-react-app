import React from 'react';
import { Step,Stepper,StepButton } from '@mui/material';
import {ShoppingBasketOutlined,FolderSharedOutlined,Business,AddCard} from "@mui/icons-material"

import MyLabel from '../../../components/labels/MyLabel';

type Props = {
    activeStep: number,
    completed: Set<number>,
    setActiveStep: (value: number) => void
}

const steps : {icon:React.ReactNode,title:string}[] = [
{icon:<FolderSharedOutlined/>, title:'personal info'}, 
{icon:<ShoppingBasketOutlined/>, title:'confirmed items'}, 
{icon:<Business/>, title:'set place to recive'}, 
{icon:<AddCard/>, title:'set payment method'}, 
]

const BuyProcessStepper : React.FC<Props> = ({ activeStep, completed, setActiveStep }) => {

    const isCompletedStep = (step: number) => {
        return completed.has(step);
    }

    return (
        <Stepper nonLinear activeStep={activeStep}>
            {steps.map((item, index) => {
                const stepProps: { completed?: boolean } = {};

                const completed = isCompletedStep(index)
                if (completed) {
                    stepProps.completed = true;
                }

                const activeStepProps = (activeStep === index || completed) ? {
                    color:'primary.main'
                } : {}

                console.log(stepProps)
                return (
                    <Step {...stepProps}>
                        <StepButton sx={{position:'relative'}} onClick={() => setActiveStep(index)}>{<MyLabel other={activeStepProps} {...item} end/>}</StepButton>
                    </Step>
                );
            })}
        </Stepper>
    )

}

export default BuyProcessStepper