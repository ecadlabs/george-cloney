import React, { ReactElement } from "react";
import georgeCloneyImg from "../../assets/george-cloney.png";
import githubLogo from "../../assets/github.jpg";
import "./styles.css";

const Navbar = (): ReactElement => {
  return (
    <div className="navbar">
      <div className="left-container">
        <img height="55" width="60" alt="George Cloney logo" src={georgeCloneyImg} />
      </div>
      <div className="right-container">
        <a target="_blank" rel="noopener noreferrer" href="https://github.com/ecadlabs/george-cloney">
          <img alt="Github logo" height="55" width="100" src={githubLogo} />
        </a>
      </div>
    </div>
  );
};
export default Navbar;
