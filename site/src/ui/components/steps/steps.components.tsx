import React, { useState } from 'react';

import MobileStepper from "@material-ui/core/MobileStepper";

import Button from "@material-ui/core/Button";

import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/all';

import * as SC from './steps.style';

interface Props {
  steps: number;
  onRender(index: number): void;
}

export const Steps = ({ steps, onRender }:Props) => {
  const [activeStep, setActiveStep] = useState<number>(0);
  console.log('active', activeStep)
  
  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
    onRender(activeStep);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
    onRender(activeStep);
  };
  
  return (
      <SC.Container>
        <MobileStepper
         variant="dots"
         position="static"
         steps={steps}
         activeStep={activeStep}
         nextButton={
           <Button onClick={handleNext} disabled={activeStep === 2}>
             Próximo
             <IoIosArrowForward />
           </Button>
         }
         backButton={
           <Button onClick={handleBack} disabled={activeStep === 1}>
             <IoIosArrowBack />
             Voltar
           </Button>
         }
         />
      </SC.Container>
  );
};