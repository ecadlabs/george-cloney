import { Dispatch, SetStateAction } from "react";

export interface StepButtonGroupProps {
  currentStep: number;
  setCurrentStep: Dispatch<SetStateAction<number>>;
}
