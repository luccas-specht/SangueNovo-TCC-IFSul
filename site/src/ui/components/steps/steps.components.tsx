import React from 'react';

import MobileStepper from "@material-ui/core/MobileStepper";

import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/all';

import * as SC from './steps.style';

interface Props {
  steps: number;
  components: JSX.Element[]
}

export const Steps = ({ steps, components }:Props) => {
  const [activeStep, setActiveStep] = React.useState(1);

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  return (
      <SC.Container>
        <MobileStepper
         variant="dots"
         position="static"
         steps={steps}
         activeStep={activeStep}
         nextButton={
           <SC.ButtonStyle onClick={handleNext} disabled={activeStep === 1}>
             Proximo
             <IoIosArrowForward />
           </SC.ButtonStyle>
         }
         backButton={
           <SC.ButtonStyle onClick={handleBack} disabled={activeStep === 0}>
             <IoIosArrowBack />
             voltar
           </SC.ButtonStyle>
         }
         />
      </SC.Container>
  );
};