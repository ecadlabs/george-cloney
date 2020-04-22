import React, { ReactElement, useState, useEffect, useRef } from "react";
import { ConfettiProps } from "./types";
import "./styles.css";

const Confetti = (props: ConfettiProps): ReactElement | null => {
  const { setConfettiShown } = props;
  const [show, setShow] = useState<boolean>(true);

  const showRef = useRef(show);
  showRef.current = show;

  useEffect(() => {
    setTimeout(() => {
      setShow(!showRef);
      setConfettiShown(true);
    }, 2850);
  }, [setConfettiShown]);

  if (!show) return null;
  return (
    <div className="confetti-container">
      <div className="confetti"></div>
      <div className="confetti"></div>
      <div className="confetti"></div>
      <div className="confetti"></div>
      <div className="confetti"></div>
      <div className="confetti"></div>
      <div className="confetti"></div>
      <div className="confetti"></div>
      <div className="confetti"></div>
      <div className="confetti"></div>
      <div className="confetti"></div>
      <div className="confetti"></div>
      <div className="confetti"></div>
      <div className="confetti"></div>
      <div className="confetti"></div>
      <div className="confetti"></div>
      <div className="confetti"></div>
      <div className="confetti"></div>
      <div className="confetti"></div>
      <div className="confetti"></div>
      <div className="confetti"></div>
    </div>
  );
};

export default Confetti;
