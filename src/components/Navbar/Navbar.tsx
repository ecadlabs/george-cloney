import React from "react";
import "./styles.css";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="left-container">
        <img height="45" width="150" alt="Built With Taquito logo" src="/taquito.png" />
      </div>
      <div className="right-container">
        <a href="https://github.com/ecadlabs/taquito">
          <img alt="Github logo" height="55" width="100" src="/github.jpg" />
        </a>
      </div>
    </div>
  );
};
export default Navbar;
