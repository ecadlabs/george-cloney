import React, { ReactElement } from "react";
import "./styles.css";

const Navbar = (): ReactElement => {
  return (
    <div className="navbar">
      <div className="left-container">
        <img height="55" width="60" alt="George Cloney logo" src="george-cloney.png" />
      </div>
      <div className="right-container">
        <a target="_blank" rel="noopener noreferrer" href="https://github.com/ecadlabs/george-cloney">
          <img alt="Github logo" height="55" width="100" src="github.jpg" />
        </a>
      </div>
    </div>
  );
};
export default Navbar;
