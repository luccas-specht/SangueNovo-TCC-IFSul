import React, { useState, useEffect, useCallback } from "react";

import MobileStepper from "@material-ui/core/MobileStepper";

import { IoIosArrowForward, IoIosArrowBack } from "react-icons/all";

import * as SC from "./stepper.style";

interface Props {
  steps: number;
  onRender(index: number): void;
}

export const Stepper = ({ steps, onRender }: Props) => {
  const [activeStep, setActiveStep] = useState<number>(0);

  const handleNext = useCallback(() => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  }, []);

  const handleBack = useCallback(() => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  }, []);

  useEffect(() => {
    onRender(activeStep);
  }, [activeStep, onRender]);

  return (
    <SC.Container>
      <MobileStepper
        variant="dots"
        position="static"
        steps={steps}
        activeStep={activeStep}
        backButton={
          <SC.StyledButton onClick={handleBack} disabled={activeStep === 0}>
            <IoIosArrowBack />
            Voltar
          </SC.StyledButton>
        }
        nextButton={
          <SC.StyledButton
            onClick={handleNext}
            disabled={activeStep === steps - 1}
          >
            Próximo
            <IoIosArrowForward />
          </SC.StyledButton>
        }
      />
    </SC.Container>
  );
};
