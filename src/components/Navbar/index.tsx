import React, { ReactElement } from "react";
import "./styles.css";

const Navbar = (): ReactElement => {
  return (
    <div className="navbar">
      <div className="left-container">
        <a href="https://github.com/ecadlabs/taquito">
          <img height="55" width="60" alt="George Cloney logo" src="george-cloney.png" />
        </a>
      </div>
      <div className="right-container">
        <a href="https://github.com/ecadlabs/bjm">
          <img alt="Github logo" height="55" width="100" src="github.jpg" />
        </a>
      </div>
    </div>
  );
};
export default Navbar;
