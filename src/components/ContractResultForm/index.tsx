import React, { ReactElement } from "react";
import { ContractResultFormProps } from "./types";

const ContractResultForm = (props: ContractResultFormProps): ReactElement | null => {
  const { currentStep, txnAddress } = props;
  if (currentStep !== 4) return null;
  return (
    <>
      <div id="dialog">
        <h2>Originate Contract</h2>
      </div>
    </>
  );
};

export default ContractResultForm;
