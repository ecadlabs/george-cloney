import React, { ReactElement, useState, useEffect, useRef } from "react";
import "./styles.css";

const Confetti = (): ReactElement | null => {
  const [show, setShow] = useState<boolean>(true);

  const showRef = useRef(show);
  showRef.current = show;

  useEffect(() => {
    setTimeout(() => {
      console.log("turning off");
      setShow(!showRef);
    }, 2850);
  });

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
