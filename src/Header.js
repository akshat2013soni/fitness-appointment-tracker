import React from "react";
import { Link } from "react-router-dom";
import Logo from "./assets/ft.png";
const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <img src={Logo} alt="Fitness Tracker" />
      </div>
      <nav className="nav">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/calendar">Calendar</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
