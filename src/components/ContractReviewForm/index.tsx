import React, { ReactElement } from "react";
import { split as SplitEditor } from "react-ace";
import { Parser, emitMicheline } from "@taquito/michel-codec";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-monokai";
import { ContractReviewFormProps } from "./types";
import useWindowDimensions from "../../hooks/useWindowDimensions";

import "./styles.css";

const ContractReviewForm = (props: ContractReviewFormProps): ReactElement | null => {
  const { code, storage, currentStep, setCurrentStep } = props;
  const { width } = useWindowDimensions();

  if (currentStep !== 2) return null;

  const parser = new Parser();

  const initialCodeValue =
    code.length > 0
      ? "/* Contract Code */ \n" + emitMicheline(parser.parseJSON(code), { indent: "    ", newline: "\n" })
      : "/* Contract Code */";
  const initialStorageValue = storage
    ? "/* Initial Storage Code */ \n" +
      emitMicheline(parser.parseJSON(storage as Object), { indent: "    ", newline: "\n" })
    : //
      "/* Initial Storage Code */";
  const editorWidth = width >= 800 ? `${width - 200}px` : width >= 600 ? "500px" : "350px";

  return (
    <div className="editor-container" style={{ display: "flex", justifyContent: "center" }}>
      <span onClick={() => setCurrentStep(1)} className="left"></span>
      <div id="contract-code-editor">
        {/* This is because of a types issue on Ace SplitEditor 
            // @ts-ignore */}
        <SplitEditor
          width={editorWidth}
          height="300px"
          mode="json"
          theme="monokai"
          tabSize={1}
          splits={2}
          style={{ borderRadius: "5px", margin: "0 auto" }}
          orientation={width >= 800 ? "beside" : "below"}
          value={code && storage ? [initialCodeValue, initialStorageValue] : ["", ""]}
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
