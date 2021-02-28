import React, { useCallback, SetStateAction } from "react";

import MobileStepper from "@material-ui/core/MobileStepper";

import { IoIosArrowForward, IoIosArrowBack } from "react-icons/all";

import * as SC from "./stepper.style";

interface Props {
  steps: number;
  activeStep: number;
  setActiveStep: (value: SetStateAction<number>) => void;
}

export const Stepper = ({ steps, activeStep, setActiveStep }: Props) => {
  const handleBack = useCallback(
    () => setActiveStep((prevActiveStep) => prevActiveStep - 1),
    [setActiveStep]
  );

  const handleNext = useCallback(
    () => setActiveStep((prevActiveStep) => prevActiveStep + 1),
    [setActiveStep]
  );

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
