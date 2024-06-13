// import React from 'react';
import "./header.scss";
import logo from '../img/logo.png';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();
  return (
      <div className="header-container">
        <div className="header-left">
          <img src={logo} alt="Logo" />
        </div>
        <div className="header-right">
          <button>Portfolio</button>
          <button>About</button>
          <button>Contact</button>
          <button onClick={() => navigate("/login")}>Sign in</button>
        </div>
      </div>
  );
}
