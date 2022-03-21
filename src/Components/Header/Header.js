import React from "react";
import "../Header/Header.css";
import Logo from "../../Images/logo.png";

const Header = () => {
  return (
    <div className="headerContainer">
      <div>
        <img src={Logo} alt="Oxford School Logo" />
      </div>
      <div>Oxford COVID-19 Government Response Tracker</div>
    </div>
  );
};

export default Header;
