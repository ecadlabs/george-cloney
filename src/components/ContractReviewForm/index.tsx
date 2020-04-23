import React, { ReactElement } from "react";
import { split as SplitEditor } from "react-ace";
import "ace-builds/webpack-resolver";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-monokai";
import { ContractReviewFormProps } from "./types";
import useWindowDimensions from "../../hooks/useWindowDimensions";

import "./styles.css";

const ContractReviewForm = (props: ContractReviewFormProps): ReactElement | null => {
  const { code, storage, currentStep, setCurrentStep } = props;
  const { width } = useWindowDimensions();

  const initialCodeValue = code.length > 0 ? "// Contract Code \n" + JSON.stringify(code, null, 2) : "// Contract Code";
  const initialStorageValue = storage
    ? "// Initial Storage Code \n" + JSON.stringify(storage, null, 2)
    : "// Initial Storage Code ";

  if (currentStep !== 2) return null;

  return (
    <div className="editor-container" style={{ display: "flex", justifyContent: "center" }}>
      <span onClick={() => setCurrentStep(1)} className="left"></span>
      <div id="contract-code-editor">
        {/* This is because of a types issue on Ace SplitEditor 
            // @ts-ignore */}
        <SplitEditor
          width={width >= 800 ? "700px" : width >= 600 ? "500px" : "350px"}
          height="300px"
          mode="json"
          theme="monokai"
          tabSize={1}
          splits={2}
          style={{ borderRadius: "5px", margin: "0 auto" }}
          orientation={width >= 800 ? "beside" : "below"}
          value={[initialCodeValue, initialStorageValue]}
          name="contract-code-editor"
          editorProps={{ $blockScrolling: true }}
        />
      </div>
      {code.length > 0 ? (
        <span onClick={() => setCurrentStep(3)} className="right-next-step"></span>
      ) : (
        <span className="right"></span>
      )}
    </div>
  );
};

export default ContractReviewForm;
